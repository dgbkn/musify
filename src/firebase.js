// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDncxoJytdaHhwC2mx17cEcNv1-P79mB_w",
  authDomain: "spotifie-aabdc.firebaseapp.com",
  projectId: "spotifie-aabdc",
  storageBucket: "spotifie-aabdc.appspot.com",
  messagingSenderId: "598164474496",
  appId: "1:598164474496:web:e8ac37b0af1d3fb9467465",
  measurementId: "G-J3JDTQM6CJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);