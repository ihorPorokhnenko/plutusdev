import firebase from 'firebase'
import "firebase/storage"

var firebaseConfig = {
  apiKey: "AIzaSyBtlGto-bMMmfGiUPoLQhmozMwLjzCXVOM",
  authDomain: "plutus-9b7f0.firebaseapp.com",
  databaseURL: "https://plutus-9b7f0-default-rtdb.firebaseio.com",
  projectId: "plutus-9b7f0",
  storageBucket: "plutus-9b7f0.appspot.com",
  messagingSenderId: "1064206888864",
  appId: "1:1064206888864:web:b2627c3a9ffc6bf4a47ec5",
  measurementId: "G-PESMWJR0BT"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  const auth = firebase.auth();

  export const storage  = firebase.storage();

  export {auth};

  export {database};
