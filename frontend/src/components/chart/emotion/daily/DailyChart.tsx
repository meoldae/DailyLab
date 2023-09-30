import React, { useState, useEffect } from 'react';
import { getPeriodData, getAggregateData } from "@/api/Emotion";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import TotalEmotion from "./TotalEmotion";
import { EmotionType, EmotionResultType, EmotionPeriodType, EmotionAggregateType, TransformedDataType } from '@/type/EmotionType';
import { getEmotionList } from '@/api/Emotion';


const DailyChart = ({ state, period, startDate, endDate, onMostFrequentEmotion }:
    { state: string, period: string, startDate: string, endDate: string, onMostFrequentEmotion?: (emotion: string) => void }) => {
    const [emotionResultList, setEmotionResultList] = useState<EmotionPeriodType[]>([]);
    const [emotionList, setEmotionList] = useState<EmotionType[]>([]);
    const [transformedData, setTransformedData] = useState<TransformedDataType>([]);
    const [emotionAggregateList, setEmotionAggregateList] = useState<EmotionAggregateType[]>([]);

    const transformData = (dataList: (EmotionPeriodType | EmotionAggregateType)[], emotionList: EmotionType[], period: string) => {
        const transformedData = emotionList.map(emotion => ({
            name: emotion.emotionId.toString(),
            data: period === 'week' ? new Array(7).fill(0) : new Array(5).fill(0),
        }));

        dataList.forEach(dayData => {
            const date = new Date(dayData.date);
            const dayOfWeek = (date.getDay() + 6) % 7;
            const weekOfMonth = Math.floor(date.getDate() / 7);

            if ('emotions' in dayData && Array.isArray(dayData.emotions)) { 
                dayData.emotions.forEach(emotion => {
                    const emotionIndex = transformedData.findIndex(
                        data => data.name === emotion.emotionId.toString()
                    );

                    if (emotionIndex !== -1) {
                        if (period === 'week') {
                            transformedData[emotionIndex].data[dayOfWeek] += emotion.count;
                        } else if (period === 'month') {
                            transformedData[emotionIndex].data[weekOfMonth] += emotion.count;
                        }
                    }
                });
            } else if ('emotions' in dayData) {  
                const emotions = Object.entries(dayData.emotions).map(([key, value], index) => ({
                    emotionId: index + 1, 
                    type: key,
                    count: value as number
                }));

                console.log(state);
                emotions.forEach(emotion => {
                    const emotionIndex = transformedData.findIndex(
                        data => data.name === emotion.emotionId.toString()
                    );
                    
                    if (emotionIndex !== -1) {
                        if (period === 'week') {
                            transformedData[emotionIndex].data[dayOfWeek] += emotion.count;
                        } else if (period === 'month') {
                            transformedData[emotionIndex].data[weekOfMonth] += emotion.count;
                        }
                    }
                });
            }
        });

        return transformedData;
    };

    const getData = async () => {
        console.log(state)
        if (state === 'personal') {
            await getPeriodData(startDate, endDate, ({ data }) => {
                setEmotionResultList(() => data.data as EmotionPeriodType[]);
            }, (error) => { console.log(error) });
        } else {
            await getAggregateData(state, startDate, endDate, ({ data }) => {
                setEmotionAggregateList(() => data.data as EmotionAggregateType[]);
            }, (error) => { console.log(error) });
        }
    };

    const getEmotionData = async () => {
        await getEmotionList(({ data }) => {
            setEmotionList(() => data.data as EmotionType[]);
        }, (error) => { console.log(error) });
    }

    useEffect(() => {
        void getEmotionData();
        void getData();
    }, [startDate, endDate, state]);

    useEffect(() => {
        if ((state === 'personal' && emotionResultList.length > 0) || (emotionAggregateList.length > 0) && emotionList.length > 0) {
        setTransformedData(transformData(state === 'personal' ? emotionResultList : emotionAggregateList, emotionList, period));
        }
    }, [state, emotionResultList, emotionList, emotionAggregateList, period]);

    useEffect(() => {
        if (transformedData.length > 0 && emotionList.length > 0) {
            let emotionFrequency: { [key: string]: number } = {};

            // Accumulate the counts of each emotion from transformedData
            transformedData.forEach(data => {
                data.data.forEach((count, index) => {
                    const emotionId = data.name;
                    emotionFrequency[emotionId] = (emotionFrequency[emotionId] || 0) + count;
                });
            });

            let mostFrequentEmotionId: string | null = null;
            let maxFrequency = 0;

            for (const emotionId in emotionFrequency) {
                if (emotionFrequency[emotionId] > maxFrequency) {
                    maxFrequency = emotionFrequency[emotionId];
                    mostFrequentEmotionId = emotionId;
                }
            }

            if (onMostFrequentEmotion && mostFrequentEmotionId !== null) {
                const mostFrequentEmotion = emotionList.find(emotion => emotion.emotionId.toString() === mostFrequentEmotionId);
                if (mostFrequentEmotion) {
                    onMostFrequentEmotion(mostFrequentEmotion.name);
                }
            }
        }
    }, [transformedData, emotionList, onMostFrequentEmotion]);

    return (
        <div>
            {/* <LineChart emotionResultList={emotionResultList} /> */}
            <BarChart transformedData={transformedData} emotionList={emotionList} period={period} />
            <TotalEmotion transformedData={transformedData} emotionList={emotionList} />
        </div>
    )
}

export default DailyChart;
