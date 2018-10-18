import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as Butter from 'buttercms';

admin.initializeApp();
const timeStamp = admin.database.ServerValue.TIMESTAMP;
const butter = Butter('2c11ed1f264363ff0e0b87e0e7f30058a444fac8');

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const handleWebhook = functions.https.onRequest(async (req, res) => {
  const event = req.body.webhook.event;
  const eventSplit = event.split('.');
  const action = eventSplit[2];
  let type;
  if(eventSplit[1] === 'post'){
    type = 'blog';
  }else{
    type = req.body.data.page_type;
  }
  const slug = req.body.data.id;
  if(action === "published" || action === "update"){
    await addItem(slug, type);
  } else if (action === "delete"){
    await archiveItemData(slug, type);
  }
  compareDatabases();
  res.end();
});

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

const addItem = async function(slug, type) {
  await admin.database().ref(`/${type}/${type}-slugs/${slug}`).set(timeStamp);
  let result;
  if(type === 'blog'){
    result = await getPostBySlug(slug);
  }else{
    result = await getPageBySlug(slug);
  }
  await admin.database().ref(`/${type}/${type}-data/${slug}`).set(result.data);
  return;
}

const archiveItemData = async function(slug, type) {
  const result = await admin.database().ref(`/${type}/${type}-data/${slug}`).once('value');
  await admin.database().ref(`/${type}/${type}-data-archive/${slug}`).set(result.val());
  await admin.database().ref(`/${type}/${type}-slugs/${slug}`).remove();
  await admin.database().ref(`/${type}/${type}-data/${slug}`).remove();
  return;
}

const compareDatabases = async function(type){
  let itemsCMS =
  if(type === 'blog'){
    itemsCMS = await getPostsCMS();
  }else{
    itemsCMS = await getPagesCMS(type);
  }
  const itemsFirebase = await getItemsFirebase(type);
  const itemsFirebaseKeys = Object.keys(itemsFirebase);
  const itemsCMSSlugs=[];
  itemsCMS.forEach((item) => {
    const slug = item.slug;
    itemsCMSSlugs.push(slug);
    const object = itemsFirebase[slug];
    if(!object){
      addItem(slug, type);
    }
  });
  itemsFirebaseKeys.forEach((slug) => {
    if(itemsCMSSlugs.indexOf(slug) === -1){
      archiveItemData(slug, type);
    }
  });
}

const getPostsCMS = async function() {
  const posts = await butter.post.list();
  return posts.data.data;
}

const getPagesCMS = async function(type) {
  const pages = await butter.page.list(type);
  return pages.data.data;
}

const getItemsFirebase = async function(type) {
  const cases = await admin.database().ref(`${type}/${type}-data`).once('value');
  return cases.val();
}
