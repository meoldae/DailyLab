import CustomKeyword from "../item/CustomKeyword";
import { HobbyType } from "@/type/HobbyType";

interface props {
    myHobbyList : HobbyType[],
    insertStatus : boolean,
    handleHobby : (activeStatus: boolean, idx: number) => void,
    handleInsert : () => void,
}

const CustomHobbyList = (data: props) => {
    
    return (
        <div>
            {data.myHobbyList.map((item, index) => {
                return (
                    <CustomKeyword key={index} idx={item.hobbyId} name={item.hobbyName} XStatus={true} activeStatus={false} clickEvent={data.handleHobby} />   
                )
            }) }
            {!data.insertStatus ?
            <button type="button" onClick={data.handleInsert} className="rounded-[10px] px-[14px] py-[6px] bg-reverse-primary text-[13px] font-bold text-primary">추가</button>
            : null}
        </div>
    )
}

export default CustomHobbyList;