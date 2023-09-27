import { useState, useEffect } from 'react';
import { GetSelectedReligion, UpdateReligion } from "@/api/Info";

const Religion = () => {
    const [myReligion, setMyReligion] = useState("");

    const religionList = ["무교", "기독교", "불교", "천주교", "이슬람교", "힌두교", "원불교"];

    useEffect(() => {
        GetSelectedReligion(({data}) => {
            let result = data.data as string;
            result = result.substring(1, result.length - 1);
            setMyReligion(() => result);
        }, (error) => console.log(error));
    }, []);

    const handleMyReligion = (e: React.ChangeEvent<HTMLInputElement>) => {
        UpdateReligion(e.target.value, ({data}) => {
            if(data.code == "200") setMyReligion(() => e.target.value);
        }, (error) => console.log(error));
    }

    return (
        <div className="mb-[45px]">
            <div className="flex items-center flex-wrap child-[div]:mr-[10px] child-[div]:mb-[15px] -mb-[15px]">
                {religionList.map((item, index) => {
                    return (
                        <div key={index}>
                            <input className="opacity-0 peer/religion" type="radio" id={"religion" + String(index)} value={item} name="religion" checked={item == myReligion} onChange={handleMyReligion}/>
                            <label className="pl-[30px] relative peer-checked/religion:after:opacity-100 peer-checked/religion:font-semibold peer-checked/religion:text-green peer-checked/religion:before:border-green text-[13px] pt-[3px] pb-[2px]
                        before:content-[''] before:border-[2px] before:border-gray before:rounded-full before:w-[20px] before:h-[20px] before:inline-block before:absolute before:top-0 before:left-0
                        after:content-[''] after:opacity-0 after:bg-green after:rounded-full after:absolute after:top-[4px] after:left-[4px] after:w-[12px] after:h-[12px] after:inline-block" htmlFor={"religion" + String(index)}>{item}</label>
                        </div>
                        
                    )
                })}
            </div>
        </div>
    )
}

export default Religion;