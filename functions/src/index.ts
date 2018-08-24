import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

export const addMessage = functions.https.onRequest(async (req, res) => {
    const original = req.query.text;
    const snapshot = await admin.database().ref('/messages').push({ original: original });
    return res.redirect(303, snapshot.ref.toString());
    // return admin.database().ref('/messages').push({original: original}).then((snapshot) => {
    //     // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    //     return res.redirect(303, snapshot.ref.toString());
    //   });
});

export const addBlogSlug = functions.https.onRequest(async (req, res) => {
    const slug = req.body.data.id;
    const timeStamp = new Date();
    let json = {};
    json[slug] = timeStamp;
    const snapshot = await admin.database().ref('/blog-slugs').push(json);
    return;
});

export const addPageSlug = functions.https.onRequest(async (req, res) => {
    const slug = req.body.data.id;
    const type = req.body.data.page_type;
    const timeStamp = new Date();
    let json = {};
    json[slug] = timeStamp;
    if(type === 'client_case_study'){
      const snapshot = await admin.database().ref('/case-study-slugs').push(json);
    }

    return;
});

export const deleteBlogSlug = functions.https.onRequest(async (req, res) => {
    const slug = req.body.data.id;
    const snapshot = await admin.database().ref('/blog-slugs/' +slug).remove();
    return;
});

export const addPageSlug = functions.https.onRequest(async (req, res) => {
  const slug = req.body.data.id;
  const type = req.body.data.page_type;
  if(type === 'client_case_study'){
    const snapshot = await admin.database().ref('/case-study-slugs/' +slug).remove();
  }

    return;
});
