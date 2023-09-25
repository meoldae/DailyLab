interface props {
    dateText : number
    clickEvent : (selectDate: string) => void
    clickStatus : boolean
    imgSrc? : string
}

const ScheduleItem = (props : props) => {

    return (
        <div className={`text-center`}>
            <span className={`text-[13px] ` + (props.clickStatus ? "cursor-pointer" : "")}>{props.dateText}</span>
        </div> 
        
    )
}

export default ScheduleItem;