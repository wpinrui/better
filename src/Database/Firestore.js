import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { DB_USERS } from "./FirestoreNavigation";

async function getFirestoreData(documentName, uid) {
    const docRef = doc(db, documentName, uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        throw new Error(
            `getFirestoreData: document ${documentName} not found for uid ${uid}`
        );
    }
}

function FirestoreData(documentName) {
    const [user] = useAuthState(auth);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState("");
    useEffect(() => {
        if (user) {
            getFirestoreData(documentName, user.uid)
                .then((data) => setData(data))
                .then((resolve) => setLoading(false));
        }
    }, [user, documentName]);
    return [loading, data];
}

export function Name() {
    const [loading, data] = FirestoreData(DB_USERS);
    return [loading, data.name];
}
