import { useEffect, useState } from 'react';
import CustomHobbyList from './CustomHobbyList';
import CustomHobbyInsert from './CustomHobbyInsert';
import { HobbyType } from '@/type/HobbyType';
import { GetSelectedHobbyList, GetHobbyList, InsertHobby, DeleteHobby } from '@/api/Info';

const CustomHobby = () => {

    const [insertMode, setInsertMode] = useState(false);
    function handleInsertMode() {setInsertMode((prev) => !prev);}
    
    const [myHobbyList, setMyHobbyList] = useState<HobbyType[]>([]);
    const [totalHobbyList, setTotalHobbyList] = useState<HobbyType[]>([]);

    useEffect(() => {
        GetSelectedHobbyList(({data}) => {setMyHobbyList(() => data.data as HobbyType[]);}, (error) => console.log(error));
        GetHobbyList(({data}) => {setTotalHobbyList(() => data.data as HobbyType[]);}, (error) => console.log(error));
    },[]);

    const handelInsertHobby = async (idx: number) => {
        await InsertHobby(idx, ({data}) => {
            if(data.code == "4000"){
                const result = JSON.parse(JSON.stringify(myHobbyList));
                const newData = totalHobbyList.find(item => item.hobbyId === idx);
                result.push(newData);
                setMyHobbyList(() => result);
            }
        }, (error) => {console.log(error)});
    }

    const handelDeleteHobby = async (idx: number) => {
        await DeleteHobby(idx, ({data}) => {
            if(data.code == "4004"){
                const result = myHobbyList.filter(hobby => hobby.hobbyId != idx);
                setMyHobbyList(() => result);
            }
        }, (error) => {console.log(error)});
    }

    function handleHobby(activeStatus: boolean, idx: number){
        if(activeStatus) handelDeleteHobby(idx);
        else handelInsertHobby(idx);
    }

    return (
        <div>
            <div className="relative bg_contents_con p-[20px]">
                <div className="text-[15px] mb-[10px] font-semibold">관심사가 궁금해요</div>
                <CustomHobbyList handleInsert={handleInsertMode} insertStatus={insertMode} myHobbyList={myHobbyList} handleHobby={handleHobby}/>
            </div>
            {insertMode ? <CustomHobbyInsert handleInsert={handleInsertMode} myHobbyList={myHobbyList} totalHobbyList={totalHobbyList} handleHobby={handleHobby}/> : null }
        </div>
        
    )
}

export default CustomHobby;