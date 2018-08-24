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
    console.log(req);
    const body = req.body;
    console.log(body);
    const snapshot = yield admin.database().ref('/test-blog-thing').push(body);
    return;
}));
//# sourceMappingURL=index.js.map