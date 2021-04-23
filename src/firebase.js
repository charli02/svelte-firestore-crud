 import firebase from 'firebase/app'
 import 'firebase/firestore';

 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyCcdFiX9l8qTvGXIdQY6kFeGEl5igpOTqY",
    authDomain: "svelte-crud-7a572.firebaseapp.com",
    databaseURL: "https://svelte-crud-7a572-default-rtdb.firebaseio.com",
    projectId: "svelte-crud-7a572",
    storageBucket: "svelte-crud-7a572.appspot.com",
    messagingSenderId: "958859607329",
    appId: "1:958859607329:web:36203c6e184fdbaa411260"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export const db = firebase.firestore()