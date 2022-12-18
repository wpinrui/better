import {
    auth,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
} from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { enumerateComponentArray } from "../Utilities";
import {
    PATH_DASHBOARD,
    PATH_LOGIN,
    PATH_REGISTER,
    PATH_RESET,
} from "../Paths";

function AuthBox(state, setter, id, placeholder, type = "text") {
    return (
        <div className="form-group">
            <input
                type={type}
                className="form-control"
                id={id}
                placeholder={placeholder}
                value={state}
                onChange={(field) => setter(field.target.value)}
            />
        </div>
    );
}

const AuthButton = (enabled, action, label, className) => (
    <button className={className} onClick={action} disabled={!enabled}>
        {label}
    </button>
);

export const useEmailBox = () => {
    const [email, setEmail] = useState("");
    const emailBox = AuthBox(
        email,
        setEmail,
        "email",
        "Email Address",
        "email"
    );
    return [email, setEmail, emailBox];
};

export const usePasswordBox = () => {
    const [password, setPassword] = useState("");
    const passwordBox = AuthBox(
        password,
        setPassword,
        "password",
        "Password",
        "password"
    );
    return [password, setPassword, passwordBox];
};

export const usePasswordConfirmBox = () => {
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const passwordConfirmBox = AuthBox(
        passwordConfirm,
        setPasswordConfirm,
        "passwordConfirm",
        "Re-enter password",
        "password"
    );
    return [passwordConfirm, setPasswordConfirm, passwordConfirmBox];
};

export const useLogin = (email, password) => {
    const [user, loading, _] = useAuthState(auth);
    const [error, setError] = useState("");
    const button = AuthButton(
        !loading,
        () => {
            if (!loading) {
                logInWithEmailAndPassword(email, password).catch((e) =>
                    setError(e)
                );
            }
        },
        "Login",
        "btn btn-primary"
    );
    return [error, setError, button];
};

export const useRegister = (email, password, passwordConfirm) => {
    const [user, loading, _] = useAuthState(auth);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const button = AuthButton(
        !loading,
        () => {
            if (!loading && password === passwordConfirm) {
                setError("");
                registerWithEmailAndPassword(email, password).then(
                    (resolve) => {
                        navigate(PATH_DASHBOARD);
                    },
                    (e) => setError(e)
                );
            }
            if (password !== passwordConfirm) {
                setError("Passwords do not match.");
            }
        },
        "Register",
        "btn btn-primary"
    );
    return [error, setError, button];
};

export const useReset = (email) => {
    const [user, loading, _] = useAuthState(auth);
    const [error, setError] = useState("");
    const [sent, setSent] = useState(false);
    const button = AuthButton(
        !loading && !sent,
        () => {
            if (!loading) {
                sendPasswordReset(email).then(
                    (resolve) => {
                        setSent(true);
                        setError("Password reset email sent successfully.");
                    },
                    (e) => setError(e)
                );
            }
        },
        "Send reset email",
        "btn btn-primary"
    );
    return [error, setError, button];
};

export const Logo = (
    <div className="logo">
        <img className="logo_image" src="/placeholder.png" alt="logo" />
        <span className="logo_text">better</span>
    </div>
);

export const AuthForm = (itemsArray) => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="auth_container col-sm-6">
                    <div>
                        {itemsArray.map((element, index) =>
                            React.cloneElement(element, { key: index })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const outerPrompt = (prefix, link, suffix, location) => {
    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-sm-6 text-center">
                    {prefix}
                    <Link to={location}>{link}</Link>
                    {suffix}
                </div>
            </div>
        </div>
    );
};

export const ResetPrompt = outerPrompt("", "Forgot password", "", PATH_RESET);

export const RegisterPrompt = outerPrompt(
    "Don't have an account? Sign up ",
    "here",
    ".",
    PATH_REGISTER
);

export const LoginPrompt = outerPrompt(
    "Already have an account? Log in ",
    "here",
    ".",
    PATH_LOGIN
);

export const BackPrompt = outerPrompt("", "Back to login", "", "/");
