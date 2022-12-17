import React, { useEffect, useState } from "react";
import {
    emailBox,
    passwordBox,
    loginButton,
    authForm,
    registerPrompt,
    logo,
} from "./Auth.js";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import "./Auth.css";

const resetPrompt = (
    <div className="auth-link">
        <Link to="/reset">
            <p className="inner-prompt">Forgot password</p>
        </Link>
    </div>
);

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
                passwordBox(password, setPassword),
                loginButton({
                    email: email,
                    password: password,
                    loading: loading,
                }),
                resetPrompt,
            ])}
            {registerPrompt}
        </div>
    );
}

export default Login;
