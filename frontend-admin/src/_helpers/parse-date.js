export function parseDateTime(date) {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var d = new Date(date)
    return d.toLocaleDateString('EN-us', options);
}

export function parseYear(date) {
    var options = {year: 'numeric' };
    var d = new Date(date)
    return d.toLocaleDateString('EN-us', options);
}
