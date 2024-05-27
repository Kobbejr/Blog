import { auth } from "./firebaseConfig"; // Import Firebase auth instance from the configuration file.
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth"; // Import Firebase auth functions for user creation and sign-in.

// Function to create a new user with email and password
export const createUser = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password); // Uses Firebase to create a user
};

// Function to sign in a user with email and password
export const signInUser = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password); // Uses Firebase to sign in a user
};

// Function to sign out the currently signed-in user
export const signOutUser = async () => {
  return auth.signOut(); // Uses Firebase to sign out the user
};
