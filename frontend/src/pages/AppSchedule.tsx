import Header from '@/components/inc/Header';
import Footer from '@/components/inc/Footer';
import Schedule from '@/components/schedule/Schedule';


export default function AppSchedule() {
    return (
        <>
            <Header />
                <div className="contents_wrap">
                    <Schedule />
                </div>
            <Footer />
        </>
    )
}