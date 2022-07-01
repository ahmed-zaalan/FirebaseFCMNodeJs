importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyBr20mGHj3Up1fv_5C5mFsrmW5NBIi5un4",
  authDomain: "testfirebase-8d845.firebaseapp.com",
  projectId: "testfirebase-8d845",
  storageBucket: "testfirebase-8d845.appspot.com",
  messagingSenderId: "779277755494",
  appId: "1:779277755494:web:e6b713ac506ebf2a47f9a7"
};
 firebase.initializeApp(firebaseConfig);

 let messaging = firebase.messaging();

 messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  var iconVar = './logo-white.png';
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: iconVar
  };

  const promiseChain = clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  })
    .then((windowClients) => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
    })
    .then(() => {
      return self.registration.showNotification(notificationTitle,
        notificationOptions);
    });
  return promiseChain;
});

// messaging.setBackgroundMessageHandler(function (payload) {
//   console.log(payload);
//   return
//   var iconVar = 'logo-white.png';
//   const notificationTitle = payload.data.title;
//   const notificationOptions = {
//     body: payload.data.body,
//     icon: iconVar
//   };

//   const promiseChain = clients.matchAll({
//     type: 'window',
//     includeUncontrolled: true
//   })
//     .then((windowClients) => {
//       for (let i = 0; i < windowClients.length; i++) {
//         const windowClient = windowClients[i];
//         windowClient.postMessage(payload);
//       }
//     })
//     .then(() => {
//       return self.registration.showNotification(notificationTitle,
//         notificationOptions);
//     });
//   return promiseChain;
// });