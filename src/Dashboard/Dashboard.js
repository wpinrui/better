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
import { useDatabaseFetch, useUpdateStreak } from "./DashboardHooks";

function Dashboard() {
    const [fetchComplete, data] = useDatabaseFetch();
    useUnauthenticatedRedirect();
    useUpdateStreak();
    if (fetchComplete) {
        return (
            <div>
                {Logo}
                <div className="container-fluid dashboard">
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
            <div className="container-fluid dashboard">
                <div className="row justify-content-center">
                    {GetAllCards({ loading: true })}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
