import moment from "moment";

const formatDate = (unformattedDate) => {
    return moment(unformattedDate, 'DD-MM-YYYY').format('L');
}

const formatDateForUI = (unformattedDate) => {
    return moment(unformattedDate).format("DD.MM.YYYY");
}

const FormatDate = (unformattedDate) => {
    return {
        forServices: formatDate(unformattedDate),
        forUI: formatDateForUI(unformattedDate) 
    }
}

export default FormatDate;