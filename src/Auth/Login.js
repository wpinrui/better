import React, { useEffect, useState } from "react";
import { emailBox, passwordBox, loginButton } from "./Auth.js";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

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
        <div className="auth">
            <div className="auth_container">
                {emailBox(email, setEmail)}
                {passwordBox(password, setPassword)}
                {loginButton({
                    email: email,
                    password: password,
                    loading: loading,
                })}

                <div>
                    <Link to="/reset">Forgot Password</Link>
                </div>
                <div>
                    Don't have an account? <Link to="/register">Register</Link>{" "}
                    now.
                </div>
            </div>
        </div>
    );
}

export default Login;
