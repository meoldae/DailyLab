import { useState, useEffect } from "react";
import { getTodoStatistics } from "@/api/Todo";
import CategoryChart from "./CategoryChart";

const Todo = ({state, period, startDate, endDate}: {state:string, period:string, startDate:string, endDate:string}) => {
    
    interface todoResultprop {
        count : number[];
        percent : number;
        mostCategory : string;
    }
    const [chartInfo, setChartInfo] = useState<number[]>([]);
    const [mostCategory, setMostCategory] = useState<string>();
    const [percent, setPercent] = useState<number>()

    useEffect(() =>{
        getTodoStatistics(state, startDate, endDate, ({data}) => {
            const temp = data.data as todoResultprop;

            setChartInfo(temp.count);
            setMostCategory(temp.mostCategory);
            setPercent(temp.percent);

        }, (error) => console.log(error));
    }, [state, period]);
    

    return (
        <div className="mt-[20px]">
            <div className="text-center font-semibold text-2xl mb-4">
                이번 {period === 'month' ? '달은' : '주는'} <p className="inline-block font-black">{mostCategory}</p>에 관한 일이 많았어요
            </div>
            <CategoryChart chartInfo={chartInfo}/>
            <div className="text-center font-light text-2xl">
                총 이행률은 <p className="font-semibold inline-block"> {percent} </p>%예요!
            </div>
        </div>
    )
}

export default Todo;