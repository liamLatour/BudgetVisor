import { initializeApp } from "firebase/app"
import { firebaseConfig } from "./firebase_config"
import { getAuth } from "firebase/auth";
import { collection, doc, getFirestore } from "firebase/firestore/lite";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let db = getFirestore(app);
const userDoc = (userId: string) => doc(db, "users", userId);

const expensesCollection = collection(db, "expenses");

export {
  auth,
  userDoc,
  expensesCollection
}