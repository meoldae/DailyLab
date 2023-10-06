import { useEffect } from "react";
import { getStatus } from "@/api/User";
import UseInterval from "@/utils/useInterval/UseInterval";
import { useNavigate } from "react-router-dom";
import { useProgress } from "@/atom/ProgressAtom";

interface StatusType {
    date: string;
    status: string;
}

const Progress = () => {

    const { progress, setProgress, stopProgress } = useProgress();

    const navigator = useNavigate();

    const nowStatus = async () => {
        await getStatus(({data}) => {
            const nowState = data.data as StatusType;
            if(nowState.status != "wait") setProgress((prevProgress) => ({...prevProgress, status : nowState.status}));
        }, (error) => {
            console.log(error)
        });
    }

    useEffect(() => {
        nowStatus();
    }, [progress.percent]);

    UseInterval(() => {
        setProgress((prevProgress) => ({...prevProgress, percent : prevProgress.percent + 2}));
    }, progress.isRunning ? 1500 : null);

    useEffect(() => {
        if(progress.status == "complete" || (progress.status == "wait" && progress.percent > 95)) stopProgress();
    }, [progress.percent]);

    return (
        <div className="text-left absolute w-[calc(100%-90px)] box-border top-[18px] left-[35px] bg_contents_con overflow-hidden">
            {progress.status != "wait" ? <button type="button" className="w-full bg-green text-[13px] font-semibold text-primary p-[3px]" onClick={() => navigator('/')}>보고서로 이동</button>
            : <div className="p-[8px]"><div className="rounded-[3px] overflow-hidden w-full bg-secondary text-0"><div style={{width: (progress.percent + "%")}} className={`w-0 inline-block bg-reverse-primary py-[5px] transition-all`}></div></div></div>}
        </div>
    )
}

export default Progress;