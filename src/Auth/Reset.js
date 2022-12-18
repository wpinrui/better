import { CustomAlert } from "../Frontend/Alert";
import { AuthForm, BackPrompt, useEmailBox, useReset } from "./Auth";
import { Logo } from "../Frontend/Logo.js";

function Reset() {
    const [email, setEmail, EmailBox] = useEmailBox();
    const [error, setError, button] = useReset(email);
    return (
        <div>
            {error && CustomAlert(error, "alert-primary")}
            {AuthForm([Logo, EmailBox, button])}
            {BackPrompt}
        </div>
    );
}

export default Reset;
