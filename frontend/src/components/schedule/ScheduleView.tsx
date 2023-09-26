interface props {
    selectedDate : string
}

const ScheduleView = (props : props) => {
    return (
        <>
            {props.selectedDate}
        </>
    )
}

export default ScheduleView;