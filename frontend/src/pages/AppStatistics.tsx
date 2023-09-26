import Header from '@/components/inc/Header';
import Statistic from '@/components/statistic/Statistic';
import Footer from '@/components/inc/Footer';

export default function AppStatistics() {
    return (
        <>
            <Header />
            <div className="contents_wrap">
                <Statistic />
            </div>
            <Footer />
        </>
    )
}