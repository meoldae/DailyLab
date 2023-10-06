import CustomKeyword from "../item/CustomKeyword";
import { HobbyTreeType, HobbyType } from "@/type/HobbyType";
import XIcon from "public/assets/img/icon/x.png";

interface props {
    myHobbyList : HobbyType[]
    totalHobbyList : HobbyType[]
    handleHobby : (activeStatus: boolean, idx: number) => void
    handleInsert : () => void
}

const CustomHobbyInsert = (data: props) => {
    const result:HobbyTreeType[] = []; 
    data.totalHobbyList.map((item) => {
        let idx = result.findIndex(e => e.category === item.category);
        if(idx == - 1){
            result.push({category : item.category, list : []});
            idx = result.length - 1;
        }
        if(data.myHobbyList.findIndex(e => e.hobbyId === item.hobbyId) > -1) item.activeStatus = true;
        else item.activeStatus = false;
        result[idx].list.push(item);
    });

    return (
        <div className="mt-[18px] relative bg_contents_con p-[20px]">
            <div className="text-[20px] mb-[10px] font-semibold">관심사 선택하기</div>
            <div className="child-[div:not(:last-child)]:mb-[30px] mb-[30px]">
                {result.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className="text-[20px] font-semibold mb-[15px]">#{item.category}</div>
                            <div className="-mb-[7px]">
                                {item.list.map((listItem, itemIndex) => {
                                    return (
                                        <CustomKeyword key={itemIndex} idx={listItem.hobbyId} name={listItem.hobbyName} XStatus={false} activeStatus={listItem.activeStatus!} clickEvent={data.handleHobby} />   
                                    )
                                })}
                            </div>
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