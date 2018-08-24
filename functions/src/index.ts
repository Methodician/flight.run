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
    console.log(req);
    const body = req.body;
    console.log(body);
    const snapshot = await admin.database().ref('/test-blog-thing').push(body);
    return;
})
