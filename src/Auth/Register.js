import React from "react";
import { CustomAlert } from "../Frontend/Alert.js";
import {
    useEmailBox,
    AuthForm,
    usePasswordBox,
    usePasswordConfirmBox,
    useRegister,
    LoginPrompt,
    useNameBox,
} from "./Auth.js";
import { Logo } from "../Frontend/Logo.js";

function Register() {
    const [name, setName, NameBox] = useNameBox();
    const [email, setEmail, EmailBox] = useEmailBox();
    const [password, setPassword, PasswordBox] = usePasswordBox();
    const [passwordConfirm, setPasswordConfirm, PasswordConfirmBox] =
        usePasswordConfirmBox();
    const [error, setError, button] = useRegister(
        name,
        email,
        password,
        passwordConfirm
    );
    return (
        <div>
            {error &&
                CustomAlert({ alertType: "alert-warning", message: error })}
            {AuthForm([
                Logo,
                NameBox,
                EmailBox,
                PasswordBox,
                PasswordConfirmBox,
                button,
            ])}
            {LoginPrompt}
        </div>
    );
}

export default Register;
