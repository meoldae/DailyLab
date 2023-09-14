import Header from '@/components/inc/Header';
import Footer from '@/components/inc/Footer';
import CustomCalendar from '@/utils/calendar/CustomCalendar';

export default function AppSchedule() {
    return (
        <>
            <Header />
                <div className='h-screen'>
                    스케줄 페이지
                    <CustomCalendar initDate="2023-09-14"/>
                </div>
            <Footer />
        </>
    )
}