import Todo from "@/components/todo/Todo";
import Report from "@/components/report/Report";
import Taste from "@/components/taste/Taste";
import { differDate } from "@/utils/date/DateFormatter";

interface props {
    selectedDate : string
}

const ScheduleView = (props : props) => {
    const mode = differDate(new Date(props.selectedDate), new Date()) > 0 ? "future" : "prev";
    return (
        <>  
            <Todo mode={mode} date={props.selectedDate} />
            {mode == "prev" ? 
            <div className="mt-[20px]">
                <Report date={props.selectedDate}/>
                <Taste date={props.selectedDate}/>
            </div>
             : null}
        </>
    )
}

export default ScheduleView;