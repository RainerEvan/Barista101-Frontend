export const environment = {
  production: true,
  apiUrl:process.env.NG_APP_API_URL,
  firebase: {
    apiKey: process.env.NG_APP_APIKEY,
    authDomain: process.env.NG_APP_AUTHDOMAIN,
    projectId: process.env.NG_APP_PROJECTID,
    storageBucket: process.env.NG_APP_STORAGEBUCKET,
    messagingSenderId: process.env.NG_APP_MESSAGINGSENDERID,
    appId: process.env.NG_APP_APPID,
    measurementId: process.env.NG_APP_MEASUREMENTID
  }
};
