importScripts('https://www.gstatic.com/firebasejs/8.0.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.2/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyAiUPvxIBsajeVZy31uGXJJQ82iTsc2xus",
    authDomain: "barista101-c9d1e.firebaseapp.com",
    projectId: "barista101-c9d1e",
    storageBucket: "barista101-c9d1e.appspot.com",
    messagingSenderId: "422499097295",
    appId: "1:422499097295:web:b7e75d90449822770cb5ba",
    measurementId: "G-WHKJL5TE8D"
});

const messaging = firebase.messaging();