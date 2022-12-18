import { CustomAlert } from "../Frontend/Alert";
import { AuthForm, BackPrompt, Logo, useEmailBox, useReset } from "./Auth";

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
