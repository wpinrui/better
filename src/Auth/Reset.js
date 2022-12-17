import React, { useEffect, useState } from "react";
import { emailBox, resetButton, backPrompt, authForm, logo } from "./Auth.js";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Reset() {
    const [email, setEmail] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) {
            return;
        }
        if (user) {
            navigate("/dashboard");
        }
    }, [user, loading, navigate]);

    return (
        <div>
            {authForm([
                logo,
                emailBox(email, setEmail),
                resetButton({
                    email: email,
                    loading: loading,
                }),
            ])}
            {backPrompt}
        </div>
    );
}

export default Reset;
