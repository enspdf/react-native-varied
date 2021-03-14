import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB347fBGmtecKnlESBR13ijVZqQf2lSd8w",
  authDomain: "react-native-projects-7fa27.firebaseapp.com",
  projectId: "react-native-projects-7fa27",
  storageBucket: "react-native-projects-7fa27.appspot.com",
  messagingSenderId: "514431499023",
  appId: "1:514431499023:web:4eaaa0cc2ce28afe3cdc7a",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
