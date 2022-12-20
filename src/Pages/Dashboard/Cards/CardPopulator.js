import React from "react";
import CardAttribution from "./CardAttribution";
import CardGoal from "./CardGoal";
import CardGreeting from "./CardGreeting";
import CardSignOut from "./CardSignOut";

const CARD_MAKERS = [CardGreeting, CardGoal, CardSignOut, CardAttribution];

export function GetAllCards(props) {
    return CARD_MAKERS.map((maker, index) =>
        React.cloneElement(maker(props), { key: index })
    );
}
