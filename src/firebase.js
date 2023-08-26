// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import {
GoogleAuthProvider, getAuth,signInWithPopup,signInWithEmailAndPassword,createUserWithEmailAndPassword,sendPasswordResetEmail,signOut,} from "firebase/auth";

import {
getFirestore,
query,
getDocs,
collection,
where,
addDoc,
} from "firebase/firestore";

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
export const auth = getAuth(app);
export const db = getFirestore(app);
export const logout = () => {
  signOut(auth);
};

export default app;

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
      const { user } = await signInWithPopup(auth, googleProvider);
      const userQuery = query(collection(db, "users"), where("uid", "==", user.uid));
      const userQuerySnapshot = await getDocs(userQuery);

      console.log("USER LOGGED IN:",user);
      
      if (userQuerySnapshot.docs.length === 0) {
          await addDoc(collection(db, "users"), {
              uid: user.uid,
              name: user.displayName,
              authProvider: "google",
              email: user.email,
          });
      }
  } catch (error) {
      console.error(error);
      alert(error.message);
  }
};

const analytics = getAnalytics(app);