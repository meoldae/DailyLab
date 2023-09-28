export type EmotionType = {
    emotionId : number,
    color : string,
    name : string,
    type : string,
}

export type EmotionResultType = {
    emotionId : number,
    date: string,
    timeStamp : string,
    type : string,
}

export type EmotionPeriodType = {
    date: string;
    emotions: EmotionCountType[];
}
    
export type EmotionCountType = {
    emotionId: number,
    type: string,
    count: number;
}