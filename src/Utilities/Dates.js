const millisecondsInOneDay = 86400000;

export function today() {
    return new Date().toLocaleDateString();
}

export function isToday(datestring) {
    return (
        new Date(new Date().toLocaleDateString()) - new Date(datestring) === 0
    );
}

export function isYesterday(datestring) {
    return (
        new Date(new Date().toLocaleDateString()) - new Date(datestring) ===
        millisecondsInOneDay
    );
}
