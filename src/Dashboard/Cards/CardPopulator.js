import React from "react";
import CardSignOut from "./CardSignOut";

const CARD_MAKERS = [CardSignOut];

export function getAllCards() {
    return CARD_MAKERS.map((maker, index) =>
        React.cloneElement(maker(), { key: index })
    );
}
