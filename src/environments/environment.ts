// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// export const environment = {
//   production: false,
//   firebaseConfig: {
//     apiKey: "AIzaSyCSnWoqf9-kFI5kJcFMj2dvB_1Kxft4U6s",
//     authDomain: "flight-7d05d.firebaseapp.com",
//     databaseURL: "https://flight-7d05d.firebaseio.com",
//     projectId: "flight-7d05d",
//     storageBucket: "flight-7d05d.appspot.com",
//     messagingSenderId: "893191075960"
//   }
// };





// DEV DB CREDENTIALS //
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyDQhHdvY5ZsypYF6PbyAtEZ403hVobQg4g",
    authDomain: "flight-dev-6436f.firebaseapp.com",
    databaseURL: "https://flight-dev-6436f.firebaseio.com",
    projectId: "flight-dev-6436f",
    storageBucket: "flight-dev-6436f.appspot.com",
    messagingSenderId: "308615889986"
  },
  emailSigninUrlPrefix: 'http://localhost:4200/blog/post/'
};
