import { CustomAlert } from "../../Frontend/Alert";
import { AuthForm, BackPrompt, useEmailBox, useReset } from "./Auth";
import { Logo } from "../../Frontend/Logo.js";

function Reset() {
    const [email, setEmail, EmailBox] = useEmailBox();
    const [error, setError, button] = useReset(email);
    return (
        <div>
            {error &&
                CustomAlert({ alertType: "alert-warning", message: error })}
            {AuthForm([EmailBox, button])}
            {BackPrompt}
        </div>
    );
}

export default Reset;
