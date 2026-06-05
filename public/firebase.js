// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Your web app's Firebase configuration resolved dynamically or with solid static fallback
let firebaseConfig = {
  apiKey: "AIzaSyCO6THcYmnTXL3g_wu6rFnTxKm1f-P3_x8",
  authDomain: "new-web-76da8.firebaseapp.com",
  projectId: "new-web-76da8",
  storageBucket: "new-web-76da8.firebasestorage.app",
  messagingSenderId: "926382617996",
  appId: "1:926382617996:web:f2b978024751aac9b792a9",
  measurementId: "G-L8XS75W5Z2"
};

// Initialize Firebase with fallback defaults first
const app = initializeApp(firebaseConfig);
const analytics = firebaseConfig.measurementId ? getAnalytics(app) : null;
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Attempt to fetch fresh environment values asynchronously without top-level await blockages
fetch("/api/firebase-config")
  .then(response => {
    if (response.ok && response.headers.get("content-type")?.includes("application/json")) {
      return response.json();
    }
  })
  .then(dynamicConfig => {
    if (dynamicConfig) {
      Object.assign(firebaseConfig, dynamicConfig);
    }
  })
  .catch(err => {
    console.warn("[Firebase] Could not fetch response config, running on embedded config:", err);
  });

/**
 * Sign in with Google using a popup window
 */
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    
    // The signed-in user info.
    const user = result.user;
    
    console.log("Successfully signed in!", user);
    
    return { user, token };
  } catch (error) {
    console.error("Error signing in with Google:", error.code, error.message);
    throw error;
  }
};

/**
 * Sign out the current user
 */
export const logOut = async () => {
  try {
    await signOut(auth);
    console.log("Successfully signed out!");
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

export { app, auth, db, analytics, RecaptchaVerifier, signInWithPhoneNumber };
