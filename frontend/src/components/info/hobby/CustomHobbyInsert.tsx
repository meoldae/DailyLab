import CustomKeyword from "../item/CustomKeyword";
import { GetHobbyList } from "@/api/Info";
import { useEffect, useState } from "react";
import { HobbyTreeType, HobbyType } from "@/type/HobbyType";
import XIcon from "public/assets/img/icon/x.png";

interface props {
    handleInsert : () => void
}

const CustomHobbyInsert = (data: props) => {
    const [hobbyList, setHobbyList] = useState<HobbyTreeType[]>([]);

    const getList = async () => {
        await GetHobbyList(({data}) => {
            const dataList = data.data as HobbyType[];
            const result:HobbyTreeType[] = []; 
            dataList.map((item) => {
                let idx = result.findIndex(e => e.category === item.category);
                if(idx == - 1){
                    result.push({category : item.category, list : []});
                    idx = result.length - 1;
                }
                result[idx].list.push(item);
            });

            setHobbyList(() => result);

        }, (error) => {console.log(error)});
    }

    useEffect(() => {
        void getList();
    }, []);

    function handleHobby(idx: number) {
        console.log(idx);
    }

    return (
        <div className="mt-[18px] relative bg_contents_con p-[20px]">
            <div className="text-[20px] mb-[10px] font-semibold">관심사 선택하기</div>
            <div className="">
                {hobbyList.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className="text-[20px]">#{item.category}</div>
                            {item.list.map((listItem, itemIndex) => {
                                return (
                                    <CustomKeyword key={itemIndex} idx={listItem.hobbyId} name={listItem.hobbyName} buttonClickStatus={true} XStatus={false} activeStatus={true} clickEvent={handleHobby} />   
                                )
                            })}
                        </div>
                    )
                })}
            </div>
            <div className="text-center">
                <button type="button" onClick={data.handleInsert} className="text-[15px] text-gray font-semibold inline-flex items-center">닫기 <img className="w-[20px] ml-[5px]" src={XIcon} alt="x 아이콘" /></button>
            </div>
        </div>
    )
}

export default CustomHobbyInsert;