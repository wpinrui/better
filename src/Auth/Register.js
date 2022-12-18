import React from "react";
import { CustomAlert } from "../Frontend/Alert.js";
import {
    useEmailBox,
    AuthForm,
    Logo,
    usePasswordBox,
    usePasswordConfirmBox,
    useRegister,
    LoginPrompt,
} from "./Auth.js";

function Register() {
    const [email, setEmail, EmailBox] = useEmailBox();
    const [password, setPassword, PasswordBox] = usePasswordBox();
    const [passwordConfirm, setPasswordConfirm, PasswordConfirmBox] =
        usePasswordConfirmBox();
    const [error, setError, button] = useRegister(
        email,
        password,
        passwordConfirm
    );
    return (
        <div>
            {error && CustomAlert(error, "alert-warning")}
            {AuthForm([
                Logo,
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

// import React, { useEffect, useState } from "react";
// import {
//     EmailBox,
//     passwordBox,
//     confirmPasswordBox,
//     registerButton,
//     AuthForm,
//     Logo,
//     LoginPrompt,
// } from "./Auth.js";
// import { useNavigate } from "react-router-dom";
// import { auth } from "../firebase";
// import { useAuthState } from "react-firebase-hooks/auth";

// function Register() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [passwordConfirm, setPasswordConfirm] = useState("");
//     const [user, loading, error] = useAuthState(auth);
//     const [isNotMatching, setIsNotMatching] = useState(false);
//     const navigate = useNavigate();
//     useEffect(() => {
//         if (loading) {
//             return;
//         }
//         if (user) {
//             navigate("/dashboard");
//         }
//     }, [user, loading, navigate]);

//     return (
//         <div>
//             {AuthForm([
//                 Logo,
//                 EmailBox(email, setEmail),
//                 passwordBox(password, setPassword),
//                 confirmPasswordBox(passwordConfirm, setPasswordConfirm),
//                 registerButton({
//                     email: email,
//                     password: password,
//                     passwordConfirm: passwordConfirm,
//                     loading: loading,
//                     isNotMatching: isNotMatching,
//                 }),
//             ])}
//             {LoginPrompt}
//         </div>
//     );
// }

// export default Register;
