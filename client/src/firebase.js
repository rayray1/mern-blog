// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: "anon-blog-af467.firebaseapp.com",
	projectId: "anon-blog-af467",
	storageBucket: "anon-blog-af467.appspot.com",
	messagingSenderId: "192970520668",
	appId: "1:192970520668:web:6cff2c2b1a8c921b140e99"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
