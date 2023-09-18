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

export {leftPad, toStringByFormatting};