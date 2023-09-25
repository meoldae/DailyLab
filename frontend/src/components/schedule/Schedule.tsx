import CustomCalendar from '@/utils/calendar/CustomCalendar';
import { toStringByFormatting } from '@/utils/date/DateFormatter';

const Schedule = () => {
    const initDate = toStringByFormatting(new Date());

    return (
        <>
            <CustomCalendar initDate={initDate} showOverDate={false} />

        </>
    )
}

export default Schedule;