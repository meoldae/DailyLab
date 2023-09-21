import CustomKeyword from "../item/CustomKeyword";
import { HobbyType } from "@/type/HobbyType";

interface props {
    myHobbyList : HobbyType[],
    insertStatus : boolean,
    handleHobby : (activeStatus: boolean, name: string) => void,
    handleInsert : () => void,
}

const CustomHobbyList = (data: props) => {

    function updateHobby(activeStatus: boolean, name: string) {
        data.handleHobby(true, name);
    }
    
    return (
        <div>
            {data.myHobbyList.map((item, index) => {
                return (
                    <CustomKeyword key={index} idx={item.hobbyId} name={item.hobbyName} XStatus={true} activeStatus={false} clickEvent={updateHobby} />   
                )
            }) }
            {!data.insertStatus ?
            <button type="button" onClick={data.handleInsert} className="rounded-[10px] px-[14px] py-[6px] bg-reverse-primary text-[13px] font-bold text-primary">추가</button>
            : null}
        </div>
    )
}

export default CustomHobbyList;