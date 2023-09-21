import { useEffect, useState } from 'react';
import CustomHobbyList from './CustomHobbyList';
import CustomHobbyInsert from './CustomHobbyInsert';
import { HobbyType } from '@/type/HobbyType';
import { GetSelectedHobbyList, GetHobbyList, InsertHobby, DeleteHobby } from '@/api/Info';

const CustomHobby = () => {

    const [insertMode, setInsertMode] = useState(false);
    function handleInsertMode() {setInsertMode((prev) => !prev);}
    
    const [myHobbyList, setMyHobbyList] = useState<HobbyType[]>([]);
    const getMyHobbyList = async () => {
        await GetSelectedHobbyList(({data}) => {
            setMyHobbyList(() => data.data as HobbyType[]);
        }, (error) => console.log(error));
    }

    const [totalHobbyList, setTotalHobbyList] = useState<HobbyType[]>([]);

    useEffect(() => {
        void getMyHobbyList();
        GetHobbyList(({data}) => {setTotalHobbyList(() => data.data as HobbyType[]);}, (error) => console.log(error));
    },[]);

    const handelInsertHobby = async (name: string) => {
        await InsertHobby({hobbyName : name}, ({data}) => {
            if(data.code == "4000") void getMyHobbyList();
        }, (error) => {console.log(error)});
    }

    const handelDeleteHobby = async (name: string) => {
        await DeleteHobby({hobbyName : name}, ({data}) => {
            if(data.code == "4004") void getMyHobbyList();
        }, (error) => {console.log(error)});
    }

    function handleHobby(activeStatus: boolean, name: string){
        if(activeStatus) handelDeleteHobby(name);
        else handelInsertHobby(name);
    }

    return (
        <div>
            <div className="-mt-[30px] relative bg_contents_con p-[20px]">
                <div className="text-[15px] mb-[10px] font-semibold">관심사가 궁금해요</div>
                <CustomHobbyList handleInsert={handleInsertMode} insertStatus={insertMode} myHobbyList={myHobbyList} handleHobby={handleHobby}/>
            </div>
            {insertMode ? <CustomHobbyInsert handleInsert={handleInsertMode} myHobbyList={myHobbyList} totalHobbyList={totalHobbyList} handleHobby={handleHobby}/> : null }
        </div>
        
    )
}

export default CustomHobby;