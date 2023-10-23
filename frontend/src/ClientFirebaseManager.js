import { initializeApp } from "firebase/app";
import { User, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth"
import AdminService from "./services/AdminService.js";

export default class ClientFirebaseManager{
    static async startConnection(setUser){
        const firebaseConfig = {
            apiKey: "AIzaSyANcXIGPt2kQ7OZJVxUMX_E5laZimx_Z7A",
            authDomain: "jobscraper-eff25.firebaseapp.com",
            projectId: "jobscraper-eff25",
            storageBucket: "jobscraper-eff25.appspot.com",
            messagingSenderId: "1092649613556",
            appId: "1:1092649613556:web:2a9c77a8b34d5d9003c6a1",
            measurementId: "G-PP9MQV1V7H"
          };
          
          initializeApp(firebaseConfig);
          const auth = getAuth()

          onAuthStateChanged(auth, async user=>{
            if(user){
                const email = user.email
                const username = email.substring(0, email.indexOf("@"))
                const idToken = await user.getIdToken()
                const idTokenResult = await user.getIdTokenResult()
                setUser({
                    username,
                    idToken,
                    role: idTokenResult?.claims?.role
                })
            }else{
                setUser(undefined)
            }
          })
    }

    static async login(email, password){
        const auth = getAuth()
        const cred = await signInWithEmailAndPassword(auth, email, password);
    }

    static async signup(email, password){
        const auth = getAuth()
        const cred = await createUserWithEmailAndPassword(auth, email, password);
    }

    static async logout(){
        const auth = getAuth()
        await signOut(auth)
    }
}