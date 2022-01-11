import {initializeApp} from 'firebase/app';
import {getDatabase, onValue, ref, set} from 'firebase/database';
import {useState, useEffect} from "react";

const firebaseConfig = {
    apiKey: "AIzaSyBYVzHS126wWzpqVLQIDqG4CRdRCCmT3t8",
    authDomain: "dy-test-23333.firebaseapp.com",
    databaseURL: "https://dy-test-23333-default-rtdb.firebaseio.com",
    projectId: "dy-test-23333",
    storageBucket: "dy-test-23333.appspot.com",
    messagingSenderId: "468249380137",
    appId: "1:468249380137:web:2204b94ea26ac8d45d2338",
    measurementId: "G-1QJJ9MWM5R"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const dbRef = ref(database, path);
        const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
        if (devMode) { console.log(`loading ${path}`); }
        return onValue(dbRef, (snapshot) => {
            const val = snapshot.val();
            if (devMode) { console.log(val); }
            setData(transform ? transform(val) : val);
            setLoading(false);
            setError(null);
        }, (error) => {
            setData(null);
            setLoading(false);
            setError(error);
        });
    }, [path, transform]);

    return [data, loading, error];
};