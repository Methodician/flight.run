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
const Butter = require("buttercms");
admin.initializeApp();
const timeStamp = admin.database.ServerValue.TIMESTAMP;
const butter = Butter('2c11ed1f264363ff0e0b87e0e7f30058a444fac8');
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
exports.handleBlogWebhook = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    const hookType = req.body.webhook.event;
    const slug = req.body.data.id;
    if (hookType === "post.published" || hookType === "post.update") {
        addPostSlug(slug);
        yield addPostData(slug);
    }
    else if (hookType === "post.delete") {
        deletePostSlug(slug);
        deletePostData(slug);
    }
    res.end();
}));
exports.handlePageWebhook = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    const hookType = req.body.webhook.event;
    console.log(hookType);
    const slug = req.body.data.id;
    const pageType = req.body.data.page_type;
    if (hookType === "page.update") {
        addPageSlug(slug, pageType);
        addPageData(slug, pageType);
    }
    else if (hookType === "page.delete") {
        deletePageSlug(slug, pageType);
        deletePageData(slug, pageType);
    }
    res.end();
}));
const addPostSlug = function (slug) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield admin.database().ref(`/blog-slugs/${slug}`).set(timeStamp);
    });
};
const addPostData = function (slug) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield getPostBySlug(slug);
        // return await admin.database().ref(`/blog-data/${slug}`).set('data');
        return yield admin.database().ref(`/blog-data/${slug}`).set(result.data);
    });
};
const deletePostSlug = function (slug) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield admin.database().ref(`/blog-slugs/${slug}`).remove();
    });
};
const deletePostData = function (slug) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield admin.database().ref(`/blog-data/${slug}`).remove();
    });
};
const addPageSlug = function (slug, type) {
    return __awaiter(this, void 0, void 0, function* () {
        if (type === 'client_case_study') {
            return yield admin.database().ref(`/case-study-slugs/${slug}`).set(timeStamp);
        }
    });
};
const addPageData = function (slug, type) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield getPageBySlug(slug);
        const data = result.data;
        if (type === 'client_case_study') {
            return yield admin.database().ref(`/case-study-data/${slug}`).set(data);
        }
    });
};
const deletePageSlug = function (slug, type) {
    return __awaiter(this, void 0, void 0, function* () {
        if (type === 'client_case_study') {
            return yield admin.database().ref(`/case-study-slugs/${slug}`).remove();
        }
    });
};
const deletePageData = function (slug, type) {
    return __awaiter(this, void 0, void 0, function* () {
        if (type === 'client_case_study') {
            return yield admin.database().ref(`/case-study-data/${slug}`).remove();
        }
    });
};
const getPostBySlug = function (slug) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const post = yield butter.post.retrieve(slug);
            return post.data;
        }
        catch (error) {
            console.log(error);
        }
    });
};
const getPageBySlug = function (slug) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(slug);
        try {
            const page = yield butter.page.retrieve('*', slug);
            console.log(page);
            return page.data;
        }
        catch (error) {
            console.log(error);
        }
    });
};
//# sourceMappingURL=index.js.map