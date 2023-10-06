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
      imgSrc : string;
  }
  const [chartInfo, setChartInfo] = useState<number[]>([]);
  const [mostDetailTaste, setMostDetailTaste] = useState<string>();
  const [mostTaste, setMostTaste] = useState<String>();
  const [tasteImgSrc, setTasteImgSrc] = useState<String>();
  const [resultFlag, setResultFlag] = useState<boolean>();

  useEffect(() =>{
      
      getTasteStatistics(state, startDate, endDate, ({data}) => {
        const temp = data.data as tasteResultprop;
        const result:number[] = [
          temp.spicy,
          temp.sweet,
          temp.sour,
          temp.bitter,
          temp.salty,
        ];
        setMostDetailTaste(temp.mostTaste);
        setChartInfo(result);
        setTasteImgSrc(temp.imgSrc);
        const flag: boolean = result.every(value => value === 0);

        if (flag) {
          setResultFlag(true);
        } else {
          setResultFlag(false);
        }

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
    }, [state, period, startDate, endDate]);

    return (
      <div>
        {resultFlag ? (
            <div className="text-center font-semibold text-2xl mb-4">
              이번 {period === 'month' ? '달은' : '주는'} <p className="inline-block font-black"></p>아직 통계가 없어요
            </div>
          ) : (
            <div className="text-center font-semibold text-2xl mb-4">
              이번 {period === 'month' ? '달은' : '주는'} <p className="inline-block font-black">{mostTaste}</p>이 많이 검출되었어요
            </div>
          )
        }
        <TasteChart chartInfo={chartInfo}/>
        
        {resultFlag ? (
            <div>
              <img className="p-4 w-[120px] -mt-[170px] m-auto" src={ `./assets/img/taste/no_taste.png` } alt="" />
              <div className="text-center font-light text-2xl">
                아무런 맛도 나지 않아요...
              </div>  
            </div>
          ) : (
            <div>
              <img className="p-4 w-[120px] -mt-[170px] m-auto" src={ `./assets/img/taste/${tasteImgSrc}.png` } alt="" />
              <div className="text-center font-light text-2xl">
                그중에서도 많이 검출된 맛은<br/>
                <p className="font-semibold inline-block"> {mostDetailTaste} </p> 이에요!
              </div>
            </div>
          )
        }
      </div>
    )
}

export default Taste;