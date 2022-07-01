import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js';
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-messaging.js";

// const { initializeApp } = require('firebase/app');
// const { getMessaging, getToken } = require('firebase/messaging');



function requestPermission(messaging) {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');

            // Get registration token. Initially this makes a network call, once retrieved
            // subsequent calls to getToken will return from cache.

            getToken(messaging, { vapidKey: "BGB94jpiDM9tEz3S5aWsYGhg9g5cpQuIA_Rj-Og3BMLG8QsDphafb4ls6kT9pbSU7oSgE8_nJxmdsfhWaguq-zQ" })
                .then((currentToken) => {
                    if (currentToken) {
                        console.log('token=');
                        console.log(currentToken);
                        fcmToken.innerHTML = currentToken;
                        // Send the token to your server and update the UI if necessary
                        // ...
                    } else {
                        // Show permission request UI
                        console.log('No registration token available. Request permission to generate one.');
                        // ...
                    }
                }).catch((err) => {
                    console.log('An error occurred while retrieving token. ', err);
                    // ...
                });

            onMessage(messaging, (payload) => {
                console.log("Message received. ", JSON.stringify(payload));
                notificationElement.innerHTML +=
                    '<li><br/>title:' +
                    payload.data.title +
                    '<br/>body:' +
                    payload.data.body
                    '</li>';
            });
        }
    });
}

function init() {
    // TODO: Replace the following with your app's Firebase project configuration
    const firebaseConfig = {
        apiKey: "AIzaSyBr20mGHj3Up1fv_5C5mFsrmW5NBIi5un4",
        authDomain: "testfirebase-8d845.firebaseapp.com",
        projectId: "testfirebase-8d845",
        storageBucket: "testfirebase-8d845.appspot.com",
        messagingSenderId: "779277755494",
        appId: "1:779277755494:web:e6b713ac506ebf2a47f9a7"
    };
    console.log(firebaseConfig);

    const app = initializeApp(firebaseConfig);

    // Initialize Firebase Cloud Messaging and get a reference to the service
    const messaging = getMessaging(app);

    requestPermission(messaging);
}

init();