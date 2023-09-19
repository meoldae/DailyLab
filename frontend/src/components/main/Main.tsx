import Header from '@/components/inc/Header';
import Footer from '@/components/inc/Footer';
import MainCurrent from "./Current";
// import MainResult from "./Result";
// import { toStringByFormatting } from '@/utils/date/DateFormatter';

const Main = () => {
    // const curDate = toStringByFormatting(new Date());
    
    return (
        <>
            <Header />
            <MainCurrent/>
            {/* <MainResult curDate={curDate} /> */}
            <Footer />
        </>
    )
}

export default Main;