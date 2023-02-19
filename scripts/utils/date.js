export function dateISO8601 (dateString){
    let brDate = dateString;
    let objectDate = new Date (
        brDate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3")
    );
    let date_iso8601 = objectDate.toISOString();
    return date_iso8601;
}