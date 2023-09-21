import { useState } from 'react';
import CustomHobbyList from './CustomHobbyList';
import CustomHobbyInsert from './CustomHobbyInsert';

const CustomHobby = () => {
    const [insertMode, setInsertMode] = useState(false);

    function handleInsertMode() {
        setInsertMode((prev) => !prev);
    }

    return (
        <div>
            <div className="-mt-[30px] relative bg_contents_con p-[20px]">
                <div className="text-[15px] mb-[10px] font-semibold">관심사가 궁금해요</div>
                <CustomHobbyList insertStatus={insertMode} handleInsert={handleInsertMode}/>
            </div>
            {insertMode ? <CustomHobbyInsert handleInsert={handleInsertMode}/> : null }
        </div>
        
    )
}

export default CustomHobby;