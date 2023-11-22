MsgElem = document.getElementById('msg');
TokenElem = document.getElementById('token');
NotisElem = document.getElementById('notis');
ErrElem = document.getElementById('err');

var config = {
  apiKey: "AIzaSyCejESvHkCUxR-NJctrOhZN3d6mdWHqcs4",
  authDomain: "tugas-pwa-kelompok.firebaseapp.com",
  projectId: "tugas-pwa-kelompok",
  storageBucket: "tugas-pwa-kelompok.appspot.com",
  messagingSenderId: "169597499445",
  appId: "1:169597499445:web:ccd4190953a989062a997c"
};

firebase.initializeApp(config);
const messaging = firebase.messaging();
messaging
  .requestPermission()
  .then(() => {
    MsgElem.innerHTML = 'Notification permission granted.';
    console.log('Notification permission granted.');

    // get the token in the form of promise
    return messaging.getToken();
  })
  .then(token => {
    TokenElem.innerHTML = `<textarea cols="30" rows="10">Token is : ${token}</textarea>`;
    // Menyimpan token ke variabel atau memprosesnya sesuai kebutuhan
    console.log('Token:', token);
  })
  .catch(err => {
    ErrElem.innerHTML = ErrElem.innerHTML + '; ' + err;
    console.log('Unable to get permission to notify.', err);
  });

messaging.onMessage(function(payload) {
  console.log('Message received. ', payload);
  NotisElem.innerHTML = NotisElem.innerHTML + JSON.stringify(payload);

  // Extract notification data
  const { title, body, icon } = payload.notification;
  
  // Show notification or handle the data as needed
  alert('PROMO DISKON BESAR-BESARAN:\nTitle: ' + title + '\nBody: ' + body);

  // Show notification
  navigator.serviceWorker.ready.then(registration => {
    registration.showNotification(title, {
      body: body,
      icon: icon,
      sound: 'default',
      tag: 'notification-sample'
    });
  });
});