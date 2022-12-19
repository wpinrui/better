import React from "react";
import { getName, Name } from "../../Database/Firestore";
import { logout } from "../../firebase";
import { Loading } from "../../Frontend/Loading";
import { Card } from "./Card.js";

const cardContent = <div className="d-grid gap-2">Have a fabulous day!</div>;

export default function CardGreeting() {
    const [loading, name] = Name();
    if (loading) {
        return Card({
            title: "",
            content: Loading(),
        });
    }
    return Card({
        title: `Hello, ${name}!`,
        content: cardContent,
    });
}
