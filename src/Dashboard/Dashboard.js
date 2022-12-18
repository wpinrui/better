import React from "react";
import { Logo } from "../Frontend/Logo";
import { useUnauthenticatedRedirect } from "../Redirect/Redirect";
import { Card } from "./Cards/Card";
import { getAllCards } from "./Cards/CardPopulator";
import "./Dashboard.css";

function Dashboard() {
    useUnauthenticatedRedirect();
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
