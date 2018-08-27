import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// import * as Butter from 'buttercms';

admin.initializeApp();
const timeStamp = admin.database.ServerValue.TIMESTAMP;
// butter = Butter('2c11ed1f264363ff0e0b87e0e7f30058a444fac8');



// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

// export const helloWorld = functions.https.onRequest((request, response) => {
//     response.send("Hello from Firebase!");
// });
//
// export const addMessage = functions.https.onRequest(async (req, res) => {
//     const original = req.query.text;
//     const snapshot = await admin.database().ref('/messages').push({ original: original });
//     return res.redirect(303, snapshot.ref.toString());
//     // return admin.database().ref('/messages').push({original: original}).then((snapshot) => {
//     //     // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
//     //     return res.redirect(303, snapshot.ref.toString());
//     //   });
// });

export const handleBlogWebhook = functions.https.onRequest(async (req, res) => {
  const hookType = req.body.webhook.event;
  const slug = req.body.data.id;
  if(hookType === "post.published"){
    addPostSlug(slug);
    addPostData(slug);
  } else if (hookType === "post.delete"){
    deletePostSlug(slug);
    deletePostData(slug);
  }
  res.end();
});

export const handlePageWebhook = functions.https.onRequest(async (req, res) => {
  const hookType = req.body.webhook.event;
  console.log(hookType);
  const slug = req.body.data.id;
  const pageType = req.body.data.page_type;
  if(hookType === "page.update"){
    addPageSlug(slug, pageType);
    addPageData(slug, pageType);
  } else if (hookType === "page.delete"){
    deletePageSlug(slug, pageType);
    deletePageData(slug, pageType);
  }
  res.end();
});

const addPostSlug= async function(slug) {
  return await admin.database().ref(`/blog-slugs/${slug}`).set(timeStamp);
}

const addPostData = async function(slug) {
  return await admin.database().ref(`/blog-data/${slug}`).set('data');
}

const deletePostSlug = async function(slug) {
  return await admin.database().ref(`/blog-slugs/${slug}`).remove();
}

const deletePostData = async function(slug) {
  return await admin.database().ref(`/blog-data/${slug}`).remove();
}

const addPageSlug = async function(slug, type) {
  if(type === 'client_case_study'){
    return await admin.database().ref(`/case-study-slugs/${slug}`).set(timeStamp);
  }
}

const addPageData = async function(slug, type) {
  if(type === 'client_case_study'){
    return await admin.database().ref(`/case-study-data/${slug}`).set('data');
  }
}

const deletePageSlug = async function(slug, type) {
  if(type === 'client_case_study'){
    return await admin.database().ref(`/case-study-slugs/${slug}`).remove();
  }
}

const deletePageData = async function(slug, type) {
  if(type === 'client_case_study'){
    return await admin.database().ref(`/case-study-data/${slug}`).remove();
  }
}
