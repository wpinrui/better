import React, { useEffect } from "react";
import { logout } from "../../firebase";
import { Card } from "./Card.js";

const cardContent = (
    <div className="d-grid gap-2">
        <button
            type="button"
            className="btn btn-primary"
            onClick={() => logout()}
        >
            Sign Out
        </button>
    </div>
);

export default function CardSignOut() {
    return Card({
        title: "Account",
        content: cardContent,
    });
}
