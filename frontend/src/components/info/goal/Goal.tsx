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
        UpdateGoal(myGoal, ({data}) => console.log(data), (error) => console.log(error));
    }

    return (
        <div>
            <input type="text" value={myGoal || ''} onChange={(e) => setMyGoal(e.target.value)}/>
            <button type="button" onClick={handleGoal}>확인</button>
        </div>
    )
}
export default Goal;