import {
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
} from "../firebase";
import { Link } from "react-router-dom";

import "./Auth.css";

function authBox(state, setter, id, placeholder, type = "text") {
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

const authButton = (action, label, className) => (
    <button className={className} onClick={action}>
        {label}
    </button>
);

export const emailBox = (state, setter) =>
    authBox(state, setter, "auth_email", "Email Address", "email");

export const passwordBox = (state, setter) =>
    authBox(state, setter, "auth_password", "Password", "password");

export const confirmPasswordBox = (state, setter) =>
    authBox(
        state,
        setter,
        "auth_password_cfm",
        "Re-enter password",
        "password"
    );

export const loginButton = (inputObj) =>
    authButton(
        () => {
            if (!inputObj.loading) {
                logInWithEmailAndPassword(inputObj.email, inputObj.password);
            }
        },
        "Login",
        "btn btn-primary"
    );

export const registerButton = (inputObj) =>
    authButton(
        () => {
            if (inputObj.password !== inputObj.passwordConfirm) {
                inputObj.isNotMatching = true;
            } else if (!inputObj.loading) {
                inputObj.isNotMatching = false;
                registerWithEmailAndPassword(inputObj.email, inputObj.password);
            }
        },
        "Register",
        "btn btn-primary"
    );

export const resetButton = (inputObj) =>
    authButton(
        () => {
            if (!inputObj.loading) {
                sendPasswordReset(inputObj.email);
                inputObj.disabledSetter(true);
            }
        },
        "Send reset email",
        "btn btn-primary"
    );

export const logo = (
    <div className="logo">
        <img className="logo_image" src="/placeholder.png" alt="logo" />
        <span className="logo_text">better</span>
    </div>
);

export const authForm = (itemsArray) => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="auth_container col-sm-6">
                    <div>{itemsArray.map((element, _) => element)}</div>
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

export const registerPrompt = outerPrompt(
    "Don't have an account? Sign up ",
    "here",
    ".",
    "/register"
);

export const loginPrompt = outerPrompt(
    "Already have an account? Log in ",
    "here",
    ".",
    "/"
);

export const backPrompt = outerPrompt("", "Back to login", "", "/");
