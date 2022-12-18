export const CustomAlert = (state, type) => {
    return (
        <div className={`alert ${type}`} role="alert">
            {state}
        </div>
    );
};
