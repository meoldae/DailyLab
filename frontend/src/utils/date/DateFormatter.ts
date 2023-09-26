function leftPad(value: number) {
    if (value >= 10) return value;
    else return `0${value}`;
}

function toStringByFormatting(selectDate: Date, delimiter: string="-") {                                                             
    const year = selectDate.getFullYear();
    const month = leftPad(selectDate.getMonth() + 1);
    const day = leftPad(selectDate.getDate());
    return [year, month, day].join(delimiter);
}

function getMonthFirstDate(selectDate: Date){
    const initDateYear = selectDate.getFullYear();
    const initDateMonth = selectDate.getMonth();
    return new Date(initDateYear, initDateMonth, 1);
}

function getMonthLastDate(selectDate: Date){
    const initDateYear = selectDate.getFullYear();
    const initDateMonth = selectDate.getMonth();
    return new Date(initDateYear, initDateMonth + 1, 0);
}

function fromStringtoDate(stringDate: string) {
    return new Date(stringDate);
}

export {leftPad, toStringByFormatting, getMonthFirstDate, getMonthLastDate, fromStringtoDate};