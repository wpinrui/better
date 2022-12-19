import React from "react";
import "./Loading.css";

export function Loading() {
    return (
        <div className="loading-outer">
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}
