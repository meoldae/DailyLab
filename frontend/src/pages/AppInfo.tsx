import Header from '@/components/inc/Header';
import Footer from '@/components/inc/Footer';
import Info from '@/components/info/Info';

export default function AppInfo() {
    return (
        <>
            <Header />
            <div className="contents_wrap">
                <Info/>
            </div>
            <Footer />
        </>
    )
}