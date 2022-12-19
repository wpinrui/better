import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FirestoreData, updateFirestoreData } from "../Database/Firestore";
import { DB_USERS } from "../Database/FirestoreNavigation";
import { auth } from "../firebase";
import { Logo } from "../Frontend/Logo";
import { useUnauthenticatedRedirect } from "../Redirect/Redirect";
import { isToday, isYesterday, today } from "../Utilities/Dates";
import { getAllCards } from "./Cards/CardPopulator";
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

function Dashboard() {
    useUnauthenticatedRedirect();
    useUpdateStreak();
    return (
        <div>
            {Logo}
            <div className="container-fluid px-md-5">
                <div className="row justify-content-center">
                    {getAllCards()}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
