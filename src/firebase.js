// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database";

function StartFirebase() {

    const firebaseConfig = {
    apiKey: "AIzaSyBwGiWqJJMD9NhnLIoxUGtlqAY7AOOFiCA",
    authDomain: "algaedetector-ac5e1.firebaseapp.com",
    databaseURL: "https://algaedetector-ac5e1-default-rtdb.firebaseio.com",
    projectId: "algaedetector-ac5e1",
    storageBucket: "algaedetector-ac5e1.appspot.com",
    messagingSenderId: "756371156543",
    appId: "1:756371156543:web:b5a21d538c6bac3a04928a",
    measurementId: "G-2HRTLYCLWP"
    };

    const app = initializeApp(firebaseConfig);
    return getDatabase(app);

}

export default StartFirebase;
