import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FirestoreData, updateFirestoreData } from "../../Database/Firestore";
import {
    DB_DATA,
    DB_GOALS,
    DB_USERS,
} from "../../Database/FirestoreNavigation";
import { auth } from "../../firebase";
import { isToday, isYesterday, today } from "../../Utilities/Dates";

export function useUpdateStreak() {
    const [user] = useAuthState(auth);
    const [loading, data] = FirestoreData(DB_USERS);
    useEffect(() => {
        if (user && !loading) {
            const lastLogin = new Date(data.lastLogin);
            if (isToday(lastLogin)) {
                return;
            } else if (isYesterday(lastLogin)) {
                updateFirestoreData(DB_USERS, user.uid, {
                    lastLogin: today(),
                    loginStreak: data.loginStreak + 1,
                    daysLoggedIn: data.daysLoggedIn + 1,
                });
            } else {
                data.loginStreak = 1;
                updateFirestoreData(DB_USERS, user.uid, {
                    lastLogin: today(),
                    loginStreak: 1,
                    daysLoggedIn: data.daysLoggedIn + 1,
                });
            }
        }
    }, [user, loading]);
}

export function useDatabaseFetch() {
    const [fetchComplete, setFetchComplete] = useState(false);
    const [userLoading, userData] = FirestoreData(DB_USERS);
    const [goalLoading, goalData] = FirestoreData(DB_GOALS);
    const [valueLoading, valueData] = FirestoreData(DB_DATA);
    useEffect(() => {
        if (!(userLoading || goalLoading || valueLoading)) {
            setFetchComplete(true);
        }
    }, [userLoading, goalLoading, valueLoading]);
    return [fetchComplete, { userData, goalData, valueData }];
}
