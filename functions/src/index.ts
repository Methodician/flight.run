import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as Butter from 'buttercms';

admin.initializeApp();
const timeStamp = admin.database.ServerValue.TIMESTAMP;
const butter = Butter('2c11ed1f264363ff0e0b87e0e7f30058a444fac8');

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const handleBlogWebhook = functions.https.onRequest(async (req, res) => {
  const hookType = req.body.webhook.event;
  const slug = req.body.data.id;
  if(hookType === "post.published" || hookType === "post.update"){
    await addPost(slug);
  } else if (hookType === "post.delete"){
    await archivePostData(slug);
  }
  comparePosts();
  res.end();
});

export const handlePageWebhook = functions.https.onRequest(async (req, res) => {
  const hookType = req.body.webhook.event;
  const slug = req.body.data.id;
  const pageType = req.body.data.page_type;
  if(hookType === "page.update"){
    addPage(slug, pageType);
  } else if (hookType === "page.delete"){
    archivePageData(slug, pageType);
  }
  compareCases();
  res.end();
});

const addPost= async function(slug) {
  await admin.database().ref(`/blog/blog-slugs/${slug}`).set(timeStamp);
  const result = await getPostBySlug(slug);
  await admin.database().ref(`/blog/blog-data/${slug}`).set(result.data);
  return;
}

const archivePostData = async function(slug) {
  const result = await admin.database().ref(`/blog/blog-data/${slug}`).once('value');
  await admin.database().ref(`/blog/blog-data-archive/${slug}`).set(result.val());
  await admin.database().ref(`/blog/blog-slugs/${slug}`).remove();
  await admin.database().ref(`/blog/blog-data/${slug}`).remove();
  return;
}

const getPostBySlug = async function(slug) {
  try {
    const post = await butter.post.retrieve(slug);
    return post.data;
  } catch (error) {
    console.log(error);
  }
}

const getPostsCMS = async function() {
  const posts = await butter.post.list();
  return posts.data.data;
}

const getPostsFirebase = async function() {
  const posts = await admin.database().ref(`blog/blog-data`).once('value');
  return posts.val();
}

const comparePosts = async function(){
  const postsCMS = await getPostsCMS();
  const postsFirebase = await getPostsFirebase();
  const postsFirebaseKeys = Object.keys(postsFirebase);
  const postsCMSSlugs=[];
  postsCMS.forEach((item) => {
    const slug = item.slug;
    postsCMSSlugs.push(slug);
    const object = postsFirebase[slug];
    if(!object){
      addPost(slug);
    }
  });
  postsFirebaseKeys.forEach((slug) => {
    if(postsCMSSlugs.indexOf(slug) === -1){
      archivePostData(slug);
    }
  });
  return;
}

const addPage = async function(slug, type) {
  await admin.database().ref(`/${type}/${type}-slugs/${slug}`).set(timeStamp);
  const result = await getPageBySlug(slug);
  await admin.database().ref(`/${type}/${type}-data/${slug}`).set(result.data);
  return;
}

const archivePageData = async function(slug, type) {
  const result = await admin.database().ref(`/${type}/${type}-data/${slug}`).once('value');
  await admin.database().ref(`/${type}/${type}-data-archive/${slug}`).set(result.val());
  await admin.database().ref(`/${type}/${type}-slugs/${slug}`).remove();
  await admin.database().ref(`/${type}/${type}-data/${slug}`).remove();
  return;
}

const compareCases = async function(){
  const casesCMS = await getCasesCMS();
  const casesFirebase = await getCasesFirebase();
  const casesFirebaseKeys = Object.keys(casesFirebase);
  const casesCMSSlugs=[];
  casesCMS.forEach((item) => {
    const slug = item.slug;
    casesCMSSlugs.push(slug);
    const object = casesFirebase[slug];
    if(!object){
      addPage(slug, 'client_case_study');
    }
  });
  casesFirebaseKeys.forEach((slug) => {
    if(casesCMSSlugs.indexOf(slug) === -1){
      archivePageData(slug, 'client_case_study');
    }
  });
}

const getPageBySlug = async function(slug) {
  try {
    const page = await butter.page.retrieve('*', slug);
    return page.data;
  } catch (error) {
    console.log(error);
  }
}

const getCasesCMS = async function() {
  const cases = await butter.page.list('client_case_study');
  return cases.data.data;
}

const getCasesFirebase = async function() {
  const cases = await admin.database().ref(`client_case_study/client_case_study-data`).once('value');
  return cases.val();
}
