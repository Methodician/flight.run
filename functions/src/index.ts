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
    addPostSlug(slug);
    await addPostData(slug);
  } else if (hookType === "post.delete"){
    deletePostSlug(slug);
    deletePostData(slug);
  }
  res.end();
});

export const handlePageWebhook = functions.https.onRequest(async (req, res) => {
  const hookType = req.body.webhook.event;
  const slug = req.body.data.id;
  const pageType = req.body.data.page_type;
  if(hookType === "page.update"){
    addPageSlug(slug, pageType);
    await addPageData(slug, pageType);
  } else if (hookType === "page.delete"){
    deletePageSlug(slug, pageType);
    deletePageData(slug, pageType);
  }
  res.end();
});

const addPostSlug= async function(slug) {
  return await admin.database().ref(`/blog/blog-slugs/${slug}`).set(timeStamp);
}

const addPostData = async function(slug) {
  const result = await getPostBySlug(slug);
  return await admin.database().ref(`/blog/blog-data/${slug}`).set(result.data);
}

const deletePostSlug = async function(slug) {
  return await admin.database().ref(`/blog/blog-slugs/${slug}`).remove();
}

const deletePostData = async function(slug) {
  return await admin.database().ref(`/blog/blog-data/${slug}`).remove();
}

const addPageSlug = async function(slug, type) {
  return await admin.database().ref(`/${type}/${type}-slugs/${slug}`).set(timeStamp);
}

const addPageData = async function(slug, type) {
  const result = await getPageBySlug(slug);
  return await admin.database().ref(`/${type}/${type}-data/${slug}`).set(result.data);
}

const deletePageSlug = async function(slug, type) {
  return await admin.database().ref(`/${type}/${type}-slugs/${slug}`).remove();
}

const deletePageData = async function(slug, type) {
  return await admin.database().ref(`/${type}/${type}-data/${slug}`).remove();
}

const getPostBySlug = async function(slug) {
  try {
    const post = await butter.post.retrieve(slug);
    return post.data;
  } catch (error) {
    console.log(error);
  }
}

const getPageBySlug = async function(slug) {
  try {
    const page = await butter.page.retrieve('*', slug);
    return page.data;
  } catch (error) {
    console.log(error);
  }
}
