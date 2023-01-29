// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl:'http://localhost:8080/api',
  firebase: {
    apiKey: "AIzaSyAiUPvxIBsajeVZy31uGXJJQ82iTsc2xus",
    authDomain: "barista101-c9d1e.firebaseapp.com",
    projectId: "barista101-c9d1e",
    storageBucket: "barista101-c9d1e.appspot.com",
    messagingSenderId: "422499097295",
    appId: "1:422499097295:web:b7e75d90449822770cb5ba",
    measurementId: "G-WHKJL5TE8D"
  }
  // apiUrl:'https://ce1c-2001-448a-2042-5d6d-cd24-412f-54c8-3fc9.ap.ngrok.io/api',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
