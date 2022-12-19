import React from "react";
import { getName, UserData } from "../../Database/Firestore";
import { logout } from "../../firebase";
import { Loading } from "../../Frontend/Loading";
import { Card } from "./Card.js";

export default function CardGreeting(props) {
    if (props.loading) {
        return Card(props);
    }
    const userData = props.userData;
    const streakGreeting = (
        <p>
            {`You've logged in ${userData.loginStreak} days in a row. Keep it
            going!`}
        </p>
    );
    const streakEncouragemnt = (
        <p>{`You don't have a login streak yet. Try to login tomorrow, and get a streak started 😊`}</p>
    );
    const cardContent = (
        <div className="d-grid gap-2">
            {`Welcome back!`}
            {userData.loginStreak > 1 ? streakGreeting : streakEncouragemnt}
        </div>
    );
    return Card({
        title: `Hello, ${userData.name}!`,
        content: cardContent,
    });
}
