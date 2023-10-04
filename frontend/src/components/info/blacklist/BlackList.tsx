import { useState, useEffect } from 'react';
import { GetSelectedBlackList, DeleteBlackList } from "@/api/Info";
import CustomKeyword from "../item/CustomKeyword";
import { successMsg } from '@/utils/customToast/CustomToast';

type blackListData = {
    categoryId : number;
    small: string;
}

const BlackList = () => {
    const [myBlackList, setMyBlackList] = useState<blackListData[]>([]);

    useEffect(() => {
        GetSelectedBlackList(({data}) => {
            setMyBlackList(() => data.data as blackListData[]);
        }, (error) => console.log(error));
    }, [])

    function handleBlackList(activeStatus: boolean, idx: number){
        DeleteBlackList(idx, ({data}) => {
            console.log(data);
            const result = myBlackList.filter(black => black.categoryId != idx);
            setMyBlackList(() => result);
            successMsg("블랙리스트를 삭제했어요");
        }, (error) => console.log(error));
    }

    return (
        <div className="relative bg_contents_con p-[20px]">
            <div className="text-[15px] mb-[10px] font-semibold">이 키워드들은 제외할게요</div>
            {myBlackList.map((item, index) => {
                return (
                    <CustomKeyword key={index} idx={item.categoryId} name={item.small} XStatus={true} activeStatus={false} clickEvent={handleBlackList} />   
                )
            })}
        </div>
    )
}

export default BlackList;