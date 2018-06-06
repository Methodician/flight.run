"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword
    }
});
exports.emailContactSubmission = functions.firestore
    .document('contacts/{pushId}')
    .onCreate(e => {
    const data = e.data();
    const contactInfo = `Contact Name: ${data.name}\r\n Contact Email: ${data.email}\r\n Contact Message: ${data.message}\r\n Contact Phone: ${data.phone}`;
    const mailOptions = {
        from: '"Jacob Johnston" <jacob@flight.run>',
        to: 'methodician@gmail.com',
        subject: 'New contact form request on flight.run!',
        text: contactInfo
    };
    return mailTransport.sendMail(mailOptions)
        .then(() => console.log('New contact form forwarded to info@flight.run'))
        .catch(err => console.error('There was an error sending the email:', err));
});
const admin = require('firebase-admin');
admin.initializeApp();
const { OAuth2Client } = require('google-auth-library');
const { google } = require('googleapis');
// TODO: Use firebase functions:config:set to configure your googleapi object:
// googleapi.client_id = Google API client ID,
// googleapi.client_secret = client secret, and
// googleapi.sheet_id = Google Sheet id (long string in middle of sheet URL)
const CONFIG_CLIENT_ID = functions.config().googleapi.client_id;
const CONFIG_CLIENT_SECRET = functions.config().googleapi.client_secret;
const CONFIG_SHEET_ID = functions.config().googleapi.sheet_id;
// TODO: Use firebase functions:config:set to configure your watchedpaths object:
// watchedpaths.data_path = Firebase path for data to be synced to Google Sheet
const CONFIG_DATA_PATH = functions.config().watchedpaths.data_path;
// The OAuth Callback Redirect.
const FUNCTIONS_REDIRECT = `https://${process.env.GCLOUD_PROJECT}.firebaseapp.com/oauthcallback`;
// setup for authGoogleAPI
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const functionsOauthClient = new OAuth2Client(CONFIG_CLIENT_ID, CONFIG_CLIENT_SECRET, FUNCTIONS_REDIRECT);
// OAuth token cached locally.
let oauthTokens = null;
// visit the URL for this Function to request tokens
exports.authgoogleapi = functions.https.onRequest((req, res) => {
    res.set('Cache-Control', 'private, max-age=0, s-maxage=0');
    res.redirect(functionsOauthClient.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
        prompt: 'consent',
    }));
});
// setup for OauthCallback
const DB_TOKEN_PATH = '/api_tokens';
// after you grant access, you will be redirected to the URL for this Function
// this Function stores the tokens to your Firebase database
exports.oauthcallback = functions.https.onRequest((req, res) => {
    res.set('Cache-Control', 'private, max-age=0, s-maxage=0');
    const code = req.query.code;
    functionsOauthClient.getToken(code, (err, tokens) => {
        // Now tokens contains an access_token and an optional refresh_token. Save them.
        if (err) {
            return res.status(400).send(err);
        }
        return admin.database().ref(DB_TOKEN_PATH).set(tokens)
            .then(() => {
            return res.status(200).send('App successfully configured with new Credentials. '
                + 'You can now close this page.');
        });
    });
});
// trigger function to write to Sheet when new data comes in on CONFIG_DATA_PATH
exports.appendrecordtospreadsheet = functions.database.ref(`${CONFIG_DATA_PATH}/{ITEM}`).onCreate((snap) => {
    const newRecord = snap.val();
    return appendPromise({
        spreadsheetId: CONFIG_SHEET_ID,
        range: 'A:C',
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        resource: {
            values: [[newRecord.firstColumn, newRecord.secondColumn, newRecord.thirdColumn]],
        },
    });
});
// accepts an append request, returns a Promise to append it, enriching it with auth
function appendPromise(requestWithoutAuth) {
    return new Promise((resolve, reject) => {
        return getAuthorizedClient().then((client) => {
            const sheets = google.sheets('v4');
            const request = requestWithoutAuth;
            request.auth = client;
            return sheets.spreadsheets.values.append(request, (err, response) => {
                if (err) {
                    console.log(`The API returned an error: ${err}`);
                    return reject(err);
                }
                return resolve(response.data);
            });
        });
    });
}
// checks if oauthTokens have been loaded into memory, and if not, retrieves them
function getAuthorizedClient() {
    if (oauthTokens) {
        return Promise.resolve(functionsOauthClient);
    }
    return admin.database().ref(DB_TOKEN_PATH).once('value').then((snapshot) => {
        oauthTokens = snapshot.val();
        functionsOauthClient.setCredentials(oauthTokens);
        return functionsOauthClient;
    });
}
// HTTPS function to write new data to CONFIG_DATA_PATH, for testing
exports.testsheetwrite = functions.https.onRequest((req, res) => {
    const random1 = Math.floor(Math.random() * 100);
    const random2 = Math.floor(Math.random() * 100);
    const random3 = Math.floor(Math.random() * 100);
    const ID = new Date().getUTCMilliseconds();
    return admin.database().ref(`${CONFIG_DATA_PATH}/${ID}`).set({
        firstColumn: random1,
        secondColumn: random2,
        thirdColumn: random3,
    }).then(() => res.status(200).send(`Wrote ${random1}, ${random2}, ${random3} to DB, trigger should now update Sheet.`));
});
//firebase deploy error fixes:
//npm install firebase-functions@latest firebase-admin@latest --save inside your functions folder
//# sourceMappingURL=index.js.map