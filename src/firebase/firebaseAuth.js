import { auth, db } from "./firebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// Admin Login Function
const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Check if user is in the "admins" collection
    const adminRef = doc(db, "admins", user.uid);
    const adminSnap = await getDoc(adminRef);

    if (!adminSnap.exists()) {
      await signOut(auth);
      return { error: "Access Denied: You are not an admin." };
    }

    return { user };
  } catch (error) {
    return { error: error.message };
  }
};

// Logout Function
const logout = async () => {
  await signOut(auth);
};

export { login, logout };
