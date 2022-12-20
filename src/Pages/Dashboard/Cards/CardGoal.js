import React, { useState } from "react";
import { Card } from "./Card.js";

const GoalsIntro = (goalArray) =>
    goalArray.length === 0 ? (
        <div>
            <p>{`Better can help you track your goals. Why not add some goals now?`}</p>
            <div className="d-grid gap-2">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {}} // TODO
                >
                    Add goals
                </button>
            </div>
        </div>
    ) : (
        <div>
            <p>{`You've added ${goalArray.length} goals. Edit them (or add new goals) at any time.`}</p>
            <div className="d-grid gap-2">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {}} // TODO
                >
                    Edit goals
                </button>
            </div>
        </div>
    );

const GoalList = (goalArray) =>
    goalArray.length > 0 ? (
        <div className="container-fluid">
            {goalArray.map((goal, index) => {
                return (
                    <p>
                        <i class="fa-solid fa-circle-check goal-icon fa-lg"></i>
                        <span key={index}>{goal.shortDescription}</span>
                    </p>
                );
            })}
        </div>
    ) : (
        <></>
    );

const useGoalBox = (description) => {
    const [goal, setGoal] = useState(description);
    const box = (
        <div className="form-group">
            <input
                type="text"
                className="form-control"
                placeholder={"What's your goal? E.g. Fitness"}
                value={goal ? goal : ""}
                onChange={(field) => setGoal(field.target.value)}
            />
        </div>
    );
    return [goal, setGoal, box];
};

const GoalSegment = (description) => {
    const [goal, setGoal, box] = useGoalBox(description);
    return box;
};

const GoalForm = (goalArray) => {
    const numGoals = goalArray.length;
    const segments = goalArray.map((goal, index) =>
        React.cloneElement(GoalSegment(goal.shortDescription), {
            key: index,
        })
    );
    segments.push(
        React.cloneElement(GoalSegment(""), {
            key: numGoals,
        })
    );
    return segments;
};

export default function CardGoal(props) {
    if (props.loading) {
        return Card(props);
    }
    const goalArray = props.goalData.goalArray;
    return Card({
        title: `Goals`,
        content: <div>{GoalsIntro(goalArray)}</div>,
    });
}
