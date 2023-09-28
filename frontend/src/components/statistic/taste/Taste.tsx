import { useState, useEffect } from 'react';
import { getTasteStatistics } from "@/api/Taste";
import TasteChart from "./TasteChart";

const Taste = ({state, period, startDate, endDate}: {state:string, period:string, startDate:string, endDate:string}) => {
    
    interface tasteResultprop {
        sweet : number;
        sour : number;
        salty : number;
        spicy : number;
        bitter : number;
        mostTaste : string;
    }
    const [chartInfo, setChartInfo] = useState<number[]>([]);
    const [mostDetailTaste, setMostDetailTaste] = useState<string>();
    const [mostTaste, setMostTaste] = useState<String>();

    useEffect(() =>{
        getTasteStatistics(startDate, endDate, ({data}) => {
          const temp = data.data as tasteResultprop;
          const result:number[] = [
            temp.sweet,
            temp.sour,
            temp.salty,
            temp.spicy,
            temp.bitter,
          ];
          setMostDetailTaste(temp.mostTaste);
          setChartInfo(result);

          const maxTaste = Math.max(temp.sweet, temp.sour, temp.salty, temp.spicy, temp.bitter);
          let mostTaste = "";
      
          if (maxTaste === temp.sweet) {
            mostTaste = "단맛";
          } else if (maxTaste === temp.sour) {
            mostTaste = "신맛";
          } else if (maxTaste === temp.salty) {
            mostTaste = "짠맛";
          } else if (maxTaste === temp.spicy) {
            mostTaste = "매운맛";
          } else if (maxTaste === temp.bitter) {
            mostTaste = "쓴맛";
          }

          setMostTaste(mostTaste);
          
        }, (error) => console.log(error));
      }, []);

    return (
        <div>
            <div className="text-center font-semibold text-2xl mb-4">
                이번 {period === 'month' ? '달은' : '주는'} <p className="inline-block font-black">{mostTaste}</p>이 많이 검출되었어요
            </div>
            <TasteChart chartInfo={chartInfo}/>
            <img className="p-4 w-[120px] -mt-[170px] m-auto" src="./assets/img/taste/sweet/strawberryParfait.png" alt="" />
            <div className="text-center font-light text-2xl">
                그중에서도 많이 검출된 맛은<br/>
                <p className="font-semibold inline-block"> {mostDetailTaste} </p> 이에요!
            </div>
        </div>
    )
}

export default Taste;