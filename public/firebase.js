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

// FALLBACK_CONFIG is only used when the server is unreachable (e.g., local dev with no .env)
const FALLBACK_CONFIG = {
  apiKey: "AIzaSyCO6THcYmnTXL3g_wu6rFnTxKm1f-P3_x8",
  authDomain: "new-web-76da8.firebaseapp.com",
  projectId: "new-web-76da8",
  storageBucket: "new-web-76da8.firebasestorage.app",
  messagingSenderId: "926382617996",
  appId: "1:926382617996:web:f2b978024751aac9b792a9",
  measurementId: "G-L8XS75W5Z2"
};

let _appPromise = null;

async function getFirebaseApp() {
  if (_appPromise) return _appPromise;
  _appPromise = fetch("/api/firebase-config")
    .then(r => r.ok && r.headers.get("content-type")?.includes("application/json") ? r.json() : null)
    .catch(() => null)
    .then(dynamicConfig => {
      const config = dynamicConfig && dynamicConfig.apiKey ? dynamicConfig : FALLBACK_CONFIG;
      return initializeApp(config);
    });
  return _appPromise;
}

export const app = await getFirebaseApp();
export const analytics = app.options.measurementId ? getAnalytics(app) : null;
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

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

export { RecaptchaVerifier, signInWithPhoneNumber };
