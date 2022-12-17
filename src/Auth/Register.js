import React, { useEffect, useState } from "react";
import {
    emailBox,
    passwordBox,
    confirmPasswordBox,
    registerButton,
    authForm,
    logo,
    loginPrompt,
} from "./Auth.js";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const [isNotMatching, setIsNotMatching] = useState(false);
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
                confirmPasswordBox(passwordConfirm, setPasswordConfirm),
                registerButton({
                    email: email,
                    password: password,
                    passwordConfirm: passwordConfirm,
                    loading: loading,
                    isNotMatching: isNotMatching,
                }),
            ])}
            {loginPrompt}
        </div>
    );
}

export default Register;
