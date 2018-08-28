"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
// const butter = Butter('2c11ed1f264363ff0e0b87e0e7f30058a444fac8');
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});
exports.addMessage = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    const original = req.query.text;
    const snapshot = yield admin.database().ref('/messages').push({ original: original });
    return res.redirect(303, snapshot.ref.toString());
    // return admin.database().ref('/messages').push({original: original}).then((snapshot) => {
    //     // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    //     return res.redirect(303, snapshot.ref.toString());
    //   });
}));
exports.addBlogSlug = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    const slug = req.body.data.id;
    const timeStamp = "this will be a timestamp";
    const snapshot = yield admin.database().ref(`/blog-slugs/${slug}`).set(admin.database.ServerValue.TIMESTAMP);
    res.end();
}));
exports.addPageSlug = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    const slug = req.body.data.id;
    const type = req.body.data.page_type;
    const timeStamp = "this will be a timestamp";
    if (type === 'client_case_study') {
        const snapshot = yield admin.database().ref(`/case-study-slugs/${slug}`).set(admin.database.ServerValue.TIMESTAMP);
    }
    res.end();
}));
exports.deleteBlogSlug = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    const slug = req.body.data.id;
    const snapshot = yield admin.database().ref(`/blog-slugs/${slug}`).remove();
    res.end();
}));
exports.deletePageSlug = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    const slug = req.body.data.id;
    const type = req.body.data.page_type;
    if (type === 'client_case_study') {
        const snapshot = yield admin.database().ref(`/case-study-slugs/${slug}`).remove();
    }
    res.end();
}));
exports.addBlogData = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    const slug = req.body.data.id;
    // const result = await butter.post.retrieve(slug);
    // console.log(result);
    // console.log(result.data);
    const snapshot = yield admin.database().ref(`/blog-data/${slug}`).set('data');
    res.end();
}));
exports.addPageData = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    const slug = req.body.data.id;
    const type = req.body.data.page_type;
    //need to get data here
    if (type === 'client_case_study') {
        const snapshot = yield admin.database().ref(`/case-study-data/${slug}`).set('data');
    }
    res.end();
}));
exports.deleteBlogData = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    const slug = req.body.data.id;
    const snapshot = yield admin.database().ref(`/blog-data/${slug}`).remove();
    res.end();
}));
exports.deletePageData = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    const slug = req.body.data.id;
    const type = req.body.data.page_type;
    if (type === 'client_case_study') {
        const snapshot = yield admin.database().ref(`/case-study-data/${slug}`).remove();
    }
    res.end();
}));
//# sourceMappingURL=index.js.map