import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDLPndvd--HPwV6QVa_aj8uU_G5VMWPoIA",
    authDomain: "my-app-e2960.firebaseapp.com",
    projectId: "my-app-e2960",
    storageBucket: "my-app-e2960.firebasestorage.app",
    messagingSenderId: "511544240006",
    appId: "1:511544240006:web:e6fdd7764540d0ea386e07",
    measurementId: "G-WWL1Q7NWK2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);