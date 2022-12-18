import React from "react";
import {
    useEmailBox,
    AuthForm,
    RegisterPrompt,
    Logo,
    usePasswordBox,
    useLogin,
    ResetPrompt,
} from "./Auth.js";

import { useAuthenticatedRedirect } from "../Redirect/Redirect.js";
import { CustomAlert } from "../Frontend/Alert.js";

function Login() {
    useAuthenticatedRedirect();
    const [email, setEmail, EmailBox] = useEmailBox();
    const [password, setPassword, PasswordBox] = usePasswordBox();
    const [error, setError, button] = useLogin(email, password);
    return (
        <div>
            {error &&
                CustomAlert({ alertType: "alert-warning", message: error })}
            {AuthForm([Logo, EmailBox, PasswordBox, button])}
            {ResetPrompt}
            {RegisterPrompt}
        </div>
    );
}

export default Login;
