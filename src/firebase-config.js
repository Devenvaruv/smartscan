import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD9pz34SIneSWX6X3wcn3NBTjOZGMnS3Sc",
    authDomain: "smartscanner-419506.firebaseapp.com",
    projectId: "smartscanner-419506",
    storageBucket: "smartscanner-419506.appspot.com",
    messagingSenderId: "640966837198",
    appId: "1:640966837198:web:dfe6872c17e095fb1e619f",
    measurementId: "G-QWP7EJFM9L"
  };

const app = initializeApp(firebaseConfig);
  
export const storage = getStorage(app);
