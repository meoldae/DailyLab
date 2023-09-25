interface CalendarItemProps {
    selectDate? : string
}

const CustomCalendarItem = (props : CalendarItemProps) => {
    return (
        <div>
            {props.selectDate != null && props.selectDate != "" ? Number(props.selectDate.split('-')[2]) : null}
        </div>
    )
}

export default CustomCalendarItem;