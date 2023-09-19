import Header from '@/components/inc/Header';
import Footer from '@/components/inc/Footer';
import MainCurrent from "./Current";
// import MainResult from "./Result";

const Main = () => {

    return (
        <>
            <Header />
            {/* <MainResult /> */}
            <MainCurrent/>
            <Footer />
        </>
    )
}

export default Main;