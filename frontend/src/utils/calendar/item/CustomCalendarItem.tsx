interface CalendarItemProps {
    selectDate : string
}

const CustomCalendarItem = (props : CalendarItemProps) => {
    return (
        <div>
            {props.selectDate}
            
        </div>
    )
}

export default CustomCalendarItem;