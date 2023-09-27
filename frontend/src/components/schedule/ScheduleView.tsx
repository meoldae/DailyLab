import Todo from "@/components/todo/Todo";

interface props {
    selectedDate : string
}

const ScheduleView = (props : props) => {
    const mode = (new Date(props.selectedDate)).getDate() - (new Date()).getDate() > 0 ? "future" : "prev";

    return (
        <>  
            {mode == "future" ? <Todo mode={mode} date={props.selectedDate} /> : null}
            
        </>
    )
}

export default ScheduleView;