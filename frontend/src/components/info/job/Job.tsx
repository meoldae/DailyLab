import { useState, useEffect } from 'react';
import { GetSelectedJob, UpdateJob } from "@/api/Info";

const Job = () => {
    const [myJob, setMyJob] = useState("");

    const jobList = ["직장인", "학생", "무직"];

    useEffect(() => {
        GetSelectedJob(({data}) => {
            let result = data.data as string;
            result = result.substring(1, result.length - 1);
            setMyJob(() => result);
        }, (error) => console.log(error));
    }, []);

    const handleMyJob = (e: React.ChangeEvent<HTMLInputElement>) => {
        UpdateJob(e.target.value, ({data}) => {
            if(data.code == "200") setMyJob(() => e.target.value);
        }, (error) => console.log(error));
    }

    return (
        <div className="mb-[45px]">
            <div className="flex items-center flex-wrap child-[div]:mr-[10px] child-[div]:mb-[15px] -mb-[15px]">
                {jobList.map((item, index) => {
                    return (
                        <div key={index}>
                            <input className="opacity-0 peer/job" type="radio" id={"job" + String(index)} value={item} name="job" checked={item == myJob} onChange={handleMyJob}/>
                            <label className="pl-[30px] relative peer-checked/job:after:opacity-100 peer-checked/job:font-semibold peer-checked/job:text-green peer-checked/job:before:border-green text-[13px] pt-[3px] pb-[2px]
                        before:content-[''] before:border-[2px] before:border-gray before:rounded-full before:w-[20px] before:h-[20px] before:inline-block before:absolute before:top-0 before:left-0
                        after:content-[''] after:opacity-0 after:bg-green after:rounded-full after:absolute after:top-[4px] after:left-[4px] after:w-[12px] after:h-[12px] after:inline-block" htmlFor={"job" + String(index)}>{item}</label>
                        </div>
                        
                    )
                })}
            </div>
        </div>
    )
}

export default Job;