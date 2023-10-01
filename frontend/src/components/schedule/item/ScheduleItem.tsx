interface props {
    dateText : string
    clickEvent : (selectDate: string) => void
    clickStatus : boolean
    activeStatus : boolean
    colorCode : string
}

type colorType = Record<string, string>;

const ScheduleItem = (props : props) => {
    const colorList: colorType = {
        "#ffa640" : "bg-[#ffa640]",
        "#ff3251e1" : "bg-[#ff3251e1]",
        "#ffe70e" : "bg-[#ffe70e]",
        "#63c23d" : "bg-[#63c23d]",
        "#2cb0ee" : "bg-[#2cb0ee]"
    }
    return (
        <div className="relative text-center child-[span]:text-[13px] child-[span]:inline-block child-[span]:w-[29px] h-[29px] child-[span]:p-[5px] child-[span]:rounded-[50%]">
            {props.clickStatus ? <span className={
                `${props.activeStatus ? "text-primary bg-reverse-primary"
                : props.colorCode != null ? colorList[props.colorCode] + " text-primary" : "border border-gray"}
                cursor-pointer`} onClick={() => props.clickEvent(props.dateText)}>{Number(props.dateText.split("-")[2])}</span>
            : <span>{Number(props.dateText.split("-")[2])}</span>
            }
        </div> 
        
    )
}

export default ScheduleItem;