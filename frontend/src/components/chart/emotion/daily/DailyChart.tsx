import React, { useState, useEffect } from 'react';
import { getPeriodData } from "@/api/Emotion";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import TotalEmotion from "./TotalEmotion";
import { EmotionType, EmotionResultType, EmotionPeriodType } from '@/type/EmotionType';
import { getEmotionList } from '@/api/Emotion';

type TransformedDataType = { name: string; data: number[] }[];

const DailyChart = ({ state, period, startDate, endDate, onMostFrequentEmotion }:
    { state: string, period: string, startDate: string, endDate: string, onMostFrequentEmotion?: (emotion: string) => void }) => {
    const [emotionResultList, setEmotionResultList] = useState<EmotionPeriodType[]>([]);
    const [emotionList, setEmotionList] = useState<EmotionType[]>([]);
    const [transformedData, setTransformedData] = useState<TransformedDataType>([]);

    const transformData = (emotionResultList: EmotionPeriodType[], emotionList: EmotionType[], period: string) => {
        const transformedData = emotionList.map(emotion => ({
            name: emotion.emotionId.toString(),
            data: period === 'week' ? new Array(7).fill(0) : new Array(5).fill(0),
        }));

        emotionResultList.forEach(dayData => {
            const date = new Date(dayData.date);
            const dayOfWeek = (date.getDay() + 6) % 7;
            const weekOfMonth = Math.floor(date.getDate() / 7);
            
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
        });

        return transformedData;
    };

    const getData = async () => {
        await getPeriodData(startDate, endDate, ({ data }) => {
            setEmotionResultList(() => data.data as EmotionPeriodType[]);
        }, (error) => { console.log(error) });
    };

    const getEmotionData = async () => {
        await getEmotionList(({ data }) => {
            setEmotionList(() => data.data as EmotionType[]);
        }, (error) => { console.log(error) });
    }

    useEffect(() => {
        void getEmotionData();
        void getData();
    }, [startDate, endDate]);

    useEffect(() => {
        if (emotionResultList.length > 0 && emotionList.length > 0) {
            setTransformedData(transformData(emotionResultList, emotionList, period));
        }
    }, [emotionResultList, emotionList, period]);

    useEffect(() => {
        if (emotionResultList.length > 0 && emotionList.length > 0) {
            let emotionFrequency: { [key: number]: number } = {};

            emotionResultList.forEach(dayData => {
                dayData.emotions.forEach(emotion => {
                    emotionFrequency[emotion.emotionId] = (emotionFrequency[emotion.emotionId] || 0) + emotion.count;
                });
            });

            let mostFrequentEmotionId: number | null = null;
            let maxFrequency = 0;

            for (const emotionId in emotionFrequency) {
                if (emotionFrequency[emotionId] > maxFrequency) {
                    maxFrequency = emotionFrequency[emotionId];
                    mostFrequentEmotionId = parseInt(emotionId);
                }
            }
            
            if (onMostFrequentEmotion && mostFrequentEmotionId !== null) {
                const mostFrequentEmotion = emotionList.find(emotion => emotion.emotionId == mostFrequentEmotionId);
                if (mostFrequentEmotion) {
                    onMostFrequentEmotion(mostFrequentEmotion.name);
                }
            }
        }
    }, [emotionResultList, emotionList, onMostFrequentEmotion]);

    return (
        <div>
            {/* <LineChart emotionResultList={emotionResultList} /> */}
            <BarChart transformedData={transformedData} emotionList={emotionList} period={period} />
            <TotalEmotion emotionResultList={emotionResultList} emotionList={emotionList} />
        </div>
    )
}

export default DailyChart;
