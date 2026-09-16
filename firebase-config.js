// Firebase configuration for Sameer Kabaadi Wala

const firebaseConfig = {
  apiKey: "AIzaSyAy8-3lkxFeXtGIrB5SCZK7pcl5XvVtUUg",
  authDomain: "sameer-kabaadi-wala.firebaseapp.com",
  projectId: "sameer-kabaadi-wala",
  storageBucket: "sameer-kabaadi-wala.firebasestorage.app",
  messagingSenderId: "318005029936",
  appId: "1:318005029936:web:3a0cf9528b5ce98349d1f5"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const auth = firebase.auth();