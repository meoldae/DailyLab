interface props {
    dateText : string
    clickEvent : (selectDate: string) => void
    clickStatus : boolean
    activeStatus : boolean
    colorCode : string
}

const ScheduleItem = (props : props) => {
    return (
        <div className="text-center child-[span]:text-[13px] child-[span]:inline-block child-[span]:w-[29px] h-[29px] child-[span]:p-[5px] child-[span]:rounded-[50%]">
            {props.clickStatus ? <span className={`cursor-pointer ${props.colorCode != null ? `bg-[` + props.colorCode + `]` : "bg-reverse-primary"} text-primary`} onClick={() => props.clickEvent(props.dateText)}>{Number(props.dateText.split("-")[2])}</span>
            : <span>{Number(props.dateText.split("-")[2])}</span>
            }
            {props.activeStatus ? <div>선택한 element</div> : null}
        </div> 
        
    )
}

export default ScheduleItem;