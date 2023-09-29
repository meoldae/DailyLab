import { setStatusFinish } from "@/api/Status";
import { getStatus } from "@/api/User";
import { useEffect, useState } from "react";
import WaitingMatter from "./WaitingMatter";
import { SetProgressStatus } from "@/atom/ProgressAtom";

interface StatusType {
    date: string;
    status: string;
  }

const MainWaiting = ({getDate, curDate} : {getDate : string, curDate : string}) => {
    SetProgressStatus(true);
    // const [status, setStatus] = useState('');
    const [status, setStatus] = useState('complete');
    const [imgName, setImgName] = useState('./assets/img/character/cloe.png');
    const [clickCount, setClickCount] = useState(0);
    const imgNameList = [
        './assets/img/character/cloe.png',
        './assets/img/character/marco.png',
        './assets/img/character/diego.png',
        './assets/img/character/ian.png',
        './assets/img/character/coco.png',
        './assets/img/character/cloe_2.png',
        './assets/img/character/marco_2.png',
        './assets/img/character/diego_2.png',
        './assets/img/character/ian_2.png',
        './assets/img/character/coco_2.png',
    ];

    const nowStatus = async () => {
        await getStatus(({data}) => {
            const nowState = data.data as StatusType;
            console.log('현재 상태 : ', nowState)
            setStatus(nowState.status);
        }, (error) => {
            console.log(error)
        });
    }


    const handleFinish = async (date : string) => {
        await setStatusFinish(date, ({data}) => {
            window.location.reload();
        }, (error) => {console.log(error)})
    }

    const handleClick = () => {
        setClickCount(prevCount => prevCount + 1);
        setImgName(imgNameList[Math.floor(Math.random() * imgNameList.length)]);
    }

    const handleButton = () => {
        handleFinish(getDate);
    }
    
    useEffect(() => {
        // 2초마다 상태 확인, 상태 finished이면 새로고침
        const interval = setInterval(() => {
            nowStatus();
          }, 2000);

          return () => clearInterval(interval);
    },[])
    
    return (
        <div className="text-center">
            <div className="mt-[80px] font-semibold text-3xl">
            {status === 'wait' ? (
                "보고서를 작성중이에요! 조금만 기다려 주세요"):
                ("보고서가 완성되었어요!")}
            </div>
            <div onClick={handleClick}>
            {status === 'wait' ? (
                <img className="absolute left-[calc(50%-75px)] w-[150px] z-10" src="./assets/img/character/loading_diary.gif" alt="" />
                ):(
                <img className="absolute left-[calc(50%-75px)] w-[150px] z-10" src="./assets/img/character/loading_diary.gif" alt="" />
            )}
            </div>
            {status === 'complete' && (
                <div className="top-[calc(100%-200px)] left-[calc(50%-100px)] absolute z-10">
                    {/* <button onClick={() => {handleFinish(curDate)}}> */}
                    <button onClick={() => {handleButton()}}>
                        <div className='w-[200px] h-[50px] bg-text rounded-2xl flex items-center justify-center'>
                            <p className='text-primary text-2xl'>연구 결과 확인하기</p>
                        </div>
                    </button>
                </div>
            )}
            <div id="matterCanvasCon" className="absolute top-[50px] z-1">
                <WaitingMatter clickCount={clickCount} imgName={imgName} />
            </div>
        </div>
    )
}

export default MainWaiting;