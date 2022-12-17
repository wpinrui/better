import {
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
} from "../firebase";

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

const authButton = (action, label, className) => (
    <button className={className} onClick={action}>
        {label}
    </button>
);

export const emailBox = (state, setter) =>
    authBox(state, setter, "authBox", "Email Address");

export const passwordBox = (state, setter) =>
    authBox(state, setter, "authBox", "Password", "password");

export const confirmPasswordBox = (state, setter) =>
    authBox(state, setter, "authBox", "Re-enter password", "password");

export const loginButton = (inputObj) =>
    authButton(
        () => {
            if (!inputObj.loading) {
                logInWithEmailAndPassword(inputObj.email, inputObj.password);
            }
        },
        "Login",
        "login_btn"
    );

export const registerButton = (inputObj) =>
    authButton(
        () => {
            if (inputObj.password !== inputObj.passwordConfirm) {
                inputObj.isNotMatching = true;
                console.log("isNotMatching");
            } else if (!inputObj.loading) {
                inputObj.isNotMatching = false;
                console.log("isMatching");
                registerWithEmailAndPassword(inputObj.email, inputObj.password);
            }
        },
        "Register",
        "register_btn"
    );
