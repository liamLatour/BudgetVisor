import { writable } from "svelte/store";
import type firebase from "firebase/auth"

const authStore = writable<{
  isLoggedIn: boolean;
  user?: firebase.User|null;
  firebaseControlled: boolean;
}>({
  isLoggedIn: false,
  firebaseControlled: false,
});

export default {
  subscribe: authStore.subscribe,
  set: authStore.set,
};