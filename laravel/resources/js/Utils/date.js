export const format = (date, format) => {
    var z = {
        M: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        m: date.getMinutes(),
        s: date.getSeconds(),
    };
    format = format.replace(/(M+|d+|h+|m+|s+)/g, function (v) {
        return ((v.length > 1 ? "0" : "") + z[v.slice(-1)]).slice(-2);
    });

    return format.replace(/(y+)/g, function (v) {
        return date.getFullYear().toString().slice(-v.length);
    });
};

const validationDate = (debut, fin) => {
    return true
}

/*

        // "2022-11-04T19:46:40.274Z"
        // Sat Nov 05 2022 22:50:45 GMT+0300 (heure normale d’Afrique de l’Est)
        // YYYY-MM-DD HH:MM:SS
        console.log('onHandleDateTimeChange', value, value.toISOString(), value.toString(), format(value, 'yyyy-MM-dd hh:mm:ss'))
        
var now = new Date();
var dateString = moment(now).format('YYYY-MM-DD');

var dateStringWithTime = moment(now).format('YYYY-MM-DD HH:mm:ss');

*/
