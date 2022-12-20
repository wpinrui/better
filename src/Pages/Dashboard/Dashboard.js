import React from "react";
import { useUnauthenticatedRedirect } from "../../Redirect/Redirect";
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
            <div className="container-fluid dashboard">
                <div className="row justify-content-center">
                    {GetAllCards({ loading: true })}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
