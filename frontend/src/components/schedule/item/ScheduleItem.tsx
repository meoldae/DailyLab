interface props {
    dateText : string
    clickEvent : (selectDate: string) => void
    clickStatus : boolean
    imgSrc? : string
}

const ScheduleItem = (props : props) => {

    return (
        <div className={`text-center`}>
            <span className={`text-[13px] ` + (props.clickStatus ? "cursor-pointer" : "")} onClick={() => props.clickEvent(props.dateText)}>{Number(props.dateText.split("-")[2])}</span>
        </div> 
        
    )
}

export default ScheduleItem;