import React from "react";
import { Card } from "./Card.js";

const cardContent = (
    <div className="d-grid gap-2">
        <ol>
            <li>
                <a href="https://www.flaticon.com/free-icons/hexagon">
                    Hexagon icons
                </a>{" "}
                created by Freepik - Flaticon
            </li>
            <li>
                Pure CSS loading spinner from{" "}
                <a href="https://loading.io/css/">loading.io/css</a>
            </li>
        </ol>
    </div>
);

export default function CardAttribution() {
    return Card({
        title: "Credits",
        content: cardContent,
    });
}
