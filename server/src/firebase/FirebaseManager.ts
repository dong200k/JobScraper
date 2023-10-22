import { initializeApp, applicationDefault, } from 'firebase-admin/app';
import { Firestore, getFirestore, } from 'firebase-admin/firestore';

export default class FirebaseManager{
    static singleton = new FirebaseManager()
    private db?: Firestore;

    initializeApp(){
        // console.log(applicationDefault())
        initializeApp({
            credential: applicationDefault(),
            // databaseURL: 'https://jobscrapereff25.firebaseio.com',
            // projectId: "jobscrapereff25"
        });

        // this.db = getFirestore();
    }

    // getFireStore(){
    //     return this.db
    // }

    static getManager(){
        return this.singleton
    }
}