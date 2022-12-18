export const CustomAlert = (props) => {
    return (
        <div className={`alert ${props.alertType}`} role="alert">
            {props.message}
        </div>
    );
};
