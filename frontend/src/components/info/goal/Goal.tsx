import { useState, useEffect } from 'react';
import { GetGoal, UpdateGoal } from "@/api/Info";

const Goal = () => {
    const [myGoal, setMyGoal] = useState("");

    useEffect(() =>{
        GetGoal(({data}) => {
            let result = data.data as string;
            result = result.substring(1, result.length - 1);
            setMyGoal(() => result);
        }, (error) => console.log(error));
    }, []);

    function handleGoal() {
        UpdateGoal(myGoal, ({data}) => {}, (error) => console.log(error));
    }

    return (
        <div className="relative flex items-center child-[*]:rounded-[10px]">
            <input
            className="bg-secondary mr-[20px] py-[6px] px-[12px] text-[15px] font-normal max-w-[calc(100%-71px)]"
            type="text" value={myGoal || ''} onChange={(e) => setMyGoal(e.target.value)}
            onKeyDown={(e) => {if(e.key === 'Enter') handleGoal();}}/>
            <button type="button" className="bg-gray py-[6px] px-[14px] text-[13px] text-white font-bold break-keep" onClick={handleGoal}>확인</button>
        </div>
    )
}
export default Goal;