import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAZmtAuFeFMADjOzZ2YFE1Tzj2iyOZVyLI",
  authDomain: "mern-whatsapp-clone-9e3da.firebaseapp.com",
  projectId: "mern-whatsapp-clone-9e3da",
  storageBucket: "mern-whatsapp-clone-9e3da.appspot.com",
  messagingSenderId: "901620607245",
  appId: "1:901620607245:web:51b7ec09ee3c6c4f0aa844",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
