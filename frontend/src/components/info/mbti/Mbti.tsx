import { useState, useEffect } from 'react';
import { GetSelectedMbti, UpdateMbti } from "@/api/Info";

type mbtiData = {
    typeA : number;
    typeB : number;
    typeC : number;
    typeD : number;
}

const Mbti = () => {

    const [myMbti, setMyMbti] = useState<mbtiData>();

    useEffect(() => {
        GetSelectedMbti(({data}) => {
            setMyMbti(() => data.data as mbtiData);
        }, (error) => {console.log(error)});
    }, []);

    function handleMbti(category: number, value: number) {
        const param = Object.assign({}, myMbti) as mbtiData;
        switch(category){
            case 1 : param.typeA = value; break;
            case 2 : param.typeB = value; break;
            case 3 : param.typeC = value; break;
            default : param.typeD = value; break;
        }
        UpdateMbti(param, ({data}) => {
            if(data.code == "200") setMyMbti(() => param);
        }, (error) => console.log(error));
    }



    return (
        <div className="px-[20px] mb-[30px]">
            <div className="w-[calc(100% + 20px)] overflow-hidden -ml-[20px] child-[div]:w-[50%] child-[div]:pl-[20px] child-[div]:float-left">
                <div className="mb-[12px]">
                    <div className="rounded-[10px] bg-secondary px-[15px] py-[5px] flex justify-between child-[span]:text-[15px]">
                        {myMbti?.typeA != 1 ? <span className="font-light" onClick={() => handleMbti(1, 1)}>내향</span> : <span className="text-green font-semibold">내향</span>}
                        {myMbti?.typeA != 2 ? <span className="font-light" onClick={() => handleMbti(1, 2)}>외향</span> : <span className="text-green font-semibold">외향</span>}
                    </div>
                </div>
                <div className="mb-[12px]">
                    <div className="rounded-[10px] bg-secondary px-[15px] py-[5px] flex justify-between child-[span]:text-[15px]">
                        {myMbti?.typeB != 1 ? <span className="font-light" onClick={() => handleMbti(2, 1)}>감각</span> : <span className="text-green font-semibold">감각</span>}
                        {myMbti?.typeB != 2 ? <span className="font-light" onClick={() => handleMbti(2, 2)}>직관</span> : <span className="text-green font-semibold">직관</span>}
                    </div>
                </div>
                <div>
                    <div className="rounded-[10px] bg-secondary px-[15px] py-[5px] flex justify-between child-[span]:text-[15px]">
                        {myMbti?.typeC != 1 ? <span className="font-light" onClick={() => handleMbti(3, 1)}>사고</span> : <span className="text-green font-semibold">사고</span>}
                        {myMbti?.typeC != 2 ? <span className="font-light" onClick={() => handleMbti(3, 2)}>감정</span> : <span className="text-green font-semibold">감정</span>}
                    </div>
                </div>
                <div>
                    <div className="rounded-[10px] bg-secondary px-[15px] py-[5px] flex justify-between child-[span]:text-[15px]">
                        {myMbti?.typeD != 1 ? <span className="font-light" onClick={() => handleMbti(4, 1)}>인식</span> : <span className="text-green font-semibold">인식</span>}
                        {myMbti?.typeD != 2 ? <span className="font-light" onClick={() => handleMbti(4, 2)}>판단</span> : <span className="text-green font-semibold">판단</span>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mbti;