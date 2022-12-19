import React from "react";
import CardGreeting from "./CardGreeting";
import CardSignOut from "./CardSignOut";

const CARD_MAKERS = [CardGreeting, CardSignOut];

export function getAllCards() {
    return CARD_MAKERS.map((maker, index) =>
        React.cloneElement(maker(), { key: index })
    );
}
