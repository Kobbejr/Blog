import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; // Lägg till import för Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyAMreFuWYWJLLeA8ONfzaVqtKFGLlpJRC4",
  authDomain: "blog-90a3a.firebaseapp.com",
  projectId: "blog-90a3a",
  storageBucket: "blog-90a3a.appspot.com",
  messagingSenderId: "996843129323",
  appId: "1:996843129323:web:765fb86d616650e289b1ae",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app); // Lägg till initialisering för Firebase Storage

export { app, auth, storage };
