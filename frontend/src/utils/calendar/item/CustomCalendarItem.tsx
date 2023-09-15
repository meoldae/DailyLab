interface CalendarItemProps {
    selectDate : string
}

const CustomCalendarItem = (props : CalendarItemProps) => {
    return (
        <div>
            {Number(props.selectDate.split('-')[2])}
        </div>
    )
}

export default CustomCalendarItem;