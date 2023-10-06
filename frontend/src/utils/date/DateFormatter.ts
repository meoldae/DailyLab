import { addHours } from "date-fns";

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

function toStringByFormattingIncludeTime(selectDate: Date) {
    const newDate = addHours(selectDate, 9);
    return newDate.toISOString().slice(0, 16).replace("T", " ");
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

function differDate(compare1Date: Date, compare2Date: Date){
    const diff = compare1Date.getTime() - compare2Date.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}


export {leftPad, toStringByFormatting, toStringByFormattingIncludeTime, getMonthFirstDate, getMonthLastDate, fromStringtoDate, differDate};