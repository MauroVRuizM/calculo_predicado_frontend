import firebase from "firebase/app"
import 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyBdoaZVRaxXFP69ak6oE3pTnskr4TuZzSU",
    authDomain: "prolsimu.firebaseapp.com",
    projectId: "prolsimu",
    storageBucket: "prolsimu.appspot.com",
    messagingSenderId: "622033514873",
    appId: "1:622033514873:web:c58180e28359727ebc7fa8",
    measurementId: "G-TMW6TFGHDB"
}

//Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export {
    db,
    firebase
}