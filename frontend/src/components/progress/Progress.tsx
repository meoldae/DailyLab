import { useState, useEffect } from "react";
import { getStatus } from "@/api/User";

interface StatusType {
    date: string;
    status: string;
}

const Progress = () => {
    const [status, setStatus] = useState('');

    const nowStatus = async () => {
        await getStatus(({data}) => {
            const nowState = data.data as StatusType;
            console.log('현재 상태 : ', nowState)
            setStatus(nowState.status);
        }, (error) => {
            console.log(error)
        });
    }

    useEffect(() => {
        const checkStatus = setInterval(() => {
            nowStatus();
        }, 2000);
        return () => clearInterval(checkStatus);
    }, []);

    return (
        <div className="fixed w-[calc(100% - 40px)] top-[20px] left-[40px]">
            프로그레스바
        </div>
    )
}

export default Progress;