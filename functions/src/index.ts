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
    const timeStamp = "this will be a timestamp";
    const snapshot = await admin.database().ref(`/blog-slugs/${slug}`).set(admin.database.ServerValue.TIMESTAMP);
    res.end();
});

export const addPageSlug = functions.https.onRequest(async (req, res) => {
    const slug = req.body.data.id;
    const type = req.body.data.page_type;
    const timeStamp = "this will be a timestamp";
    if(type === 'client_case_study'){
      const snapshot = await admin.database().ref(`/case-study-slugs/${slug}`).set(admin.database.ServerValue.TIMESTAMP);
    }
    res.end();
});

export const deleteBlogSlug = functions.https.onRequest(async (req, res) => {
    const slug = req.body.data.id;
    const snapshot = await admin.database().ref(`/blog-slugs/${slug}`).remove();
    res.end();
});

export const deletePageSlug = functions.https.onRequest(async (req, res) => {
  const slug = req.body.data.id;
  const type = req.body.data.page_type;
  if(type === 'client_case_study'){
    const snapshot = await admin.database().ref(`/case-study-slugs/${slug}`).remove();
  }

    res.end();
});

export const addBlogData = functions.https.onRequest(async (req, res) => {

  const slug = req.body.data.id;

  const snapshot = await admin.database().ref(`/blog-data/${slug}`).set('data');
  res.end();
});

export const addPageData = functions.https.onRequest(async (req, res) => {
    const slug = req.body.data.id;
    const type = req.body.data.page_type;
    //need to get data here
    if(type === 'client_case_study'){
      const snapshot = await admin.database().ref(`/case-study-data/${slug}`).set('data');
    }
    res.end();
});

export const deleteBlogData = functions.https.onRequest(async (req, res) => {
    const slug = req.body.data.id;
    const snapshot = await admin.database().ref(`/blog-data/${slug}`).remove();
    res.end();
});

export const deletePageData = functions.https.onRequest(async (req, res) => {
  const slug = req.body.data.id;
  const type = req.body.data.page_type;
  if(type === 'client_case_study'){
    const snapshot = await admin.database().ref(`/case-study-data/${slug}`).remove();
  }

    res.end();
});
