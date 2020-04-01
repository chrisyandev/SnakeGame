// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write: if
//           request.time < timestamp.date(2020, 5, 1);
//     }
//   }
// }


 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyDf3sskTnLBowdxipepIzzd7jozfIv0YxA",
    authDomain: "snake-d38c4.firebaseapp.com",
    databaseURL: "https://snake-d38c4.firebaseio.com",
    projectId: "snake-d38c4",
    storageBucket: "snake-d38c4.appspot.com",
    messagingSenderId: "631543576662",
    appId: "1:631543576662:web:7925dff3bd55017beb63f7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore();



