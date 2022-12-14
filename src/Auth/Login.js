import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";

function authBox(state, setter, className, placeholder, type = "text") {
    return (
        <input
            type={type}
            className={className}
            value={state}
            onChange={(field) => setter(field.target.value)}
            placeholder={placeholder}
        />
    );
}

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
        <div className="login">
            <div className="login_container">
                {authBox(email, setEmail, "authBox", "Email Address")}
                {authBox(
                    password,
                    setPassword,
                    "authBox",
                    "Password",
                    "password"
                )}
                <button
                    className="login_btn"
                    onClick={() => logInWithEmailAndPassword(email, password)}
                >
                    Login
                </button>
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
