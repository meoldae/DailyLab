import { useState, useEffect } from "react";
import { getStatus } from "@/api/User";
import UseInterval from "@/utils/useInterval/UseInterval";
import { useNavigate } from "react-router-dom";

interface StatusType {
    date: string;
    status: string;
}

const Progress = () => {
    const navigator = useNavigate();
    const [status, setStatus] = useState("complete");
    const [isRunning, setIsRunning] = useState(true);
    const [percent, setPercent] = useState(0);

    const nowStatus = async () => {
        await getStatus(({data}) => {
            const nowState = data.data as StatusType;
            setStatus(nowState.status);
        }, (error) => {
            console.log(error)
        });
    }

    useEffect(() => {
        nowStatus();
    }, [percent]);

    UseInterval(() => setPercent((prev) => prev + 2), isRunning ? 1000 : null);

    useEffect(() => {
        if(status == "finish" || (status == "complete" && percent > 95) ) setIsRunning(() => false);
    }, [percent]);

    return (
        <div className="fixed w-[calc(100%-100px)] box-border top-[15px] left-[50px] bg_contents_con p-[7px]">
            {status == 'finish' ? <button type="button" onClick={() => navigator('/')}>이동</button>
            : <div className="rounded-[3px] overflow-hidden w-full bg-secondary text-0"><div style={{width: (percent + "%")}} className={`w-0 inline-block bg-reverse-primary py-[3px] transition-all`}></div></div>}
        </div>
    )
}

export default Progress;