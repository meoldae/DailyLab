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

export type EmotionCounts = {
    movedCount: number;
    angerCount: number;
    absurdCount: number;
    joyCount: number;
    happyCount: number;
    proudCount: number;
    excitedCount: number;
    thankfulCount: number;
    comfortCount: number;
    stuffyCount: number;
    depressionCount: number;
    sadCount: number;
    panicCount: number;
    annoyCount: number;
    tiredCount: number;
}

export type EmotionAggregateType = {
    date: string;
    emotions: EmotionCounts;
}

export type TransformedDataType = {
    name: string,
    data: number[]
}[];