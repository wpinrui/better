import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FirestoreData, updateFirestoreData } from "../Database/Firestore";
import { DB_DATA, DB_GOALS, DB_USERS } from "../Database/FirestoreNavigation";
import { auth } from "../firebase";
import { Logo } from "../Frontend/Logo";
import { useUnauthenticatedRedirect } from "../Redirect/Redirect";
import { isToday, isYesterday, today } from "../Utilities/Dates";
import { GetAllCards } from "./Cards/CardPopulator";
import "./Dashboard.css";

function useUpdateStreak() {
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

function useDatabaseFetch() {
    const [user] = useAuthState(auth);
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

function Dashboard() {
    const [fetchComplete, data] = useDatabaseFetch();
    useUnauthenticatedRedirect();
    useUpdateStreak();
    if (fetchComplete) {
        return (
            <div>
                {Logo}
                <div className="container-fluid px-md-5">
                    <div className="row justify-content-center">
                        {GetAllCards(data)}
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div>
            {Logo}
            <div className="container-fluid px-md-5">
                <div className="row justify-content-center">
                    {GetAllCards({ loading: true })}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
