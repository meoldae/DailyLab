interface props {
    idx : number,
    name : string,
    XStatus : boolean,
    activeStatus : boolean,
    clickEvent : (activeStatus: boolean, idx: number) => void,
}

const CustomKeyword = (data: props) => {
    return (
        <div onClick={() => data.clickEvent(data.activeStatus, data.idx)} className={ (data.activeStatus ? "bg-reverse-primary text-primary" : "bg-secondary") + ` rounded-[10px] px-[10px] py-[6px] text-[13px] inline-flex justify-between items-center mr-[11px] mb-[7px] transition cursor-pointer action:bg-reverse-primary action:text-primary`}>
            <span>{data.name}</span> {data.XStatus ? <span className="inline-block ml-[10px]">X</span> : null}
        </div>
    )
    
}

export default CustomKeyword;