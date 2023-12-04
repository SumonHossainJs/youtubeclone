import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyANP3d22NUer0dgiK50Dt-H-pCm5oGEEDs",
  authDomain: "videosharingapp-8213d.firebaseapp.com",
  projectId: "videosharingapp-8213d",
  storageBucket: "videosharingapp-8213d.appspot.com",
  messagingSenderId: "489492950287",
  appId: "1:489492950287:web:19ea4e226bc6e3105d627a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;