import Header from '@/components/inc/Header';
import Footer from '@/components/inc/Footer';
import Emotion from '@/components/emotion/Emotion';

export default function AppInfo() {
    return (
        <>
            <Header />
            <div className="contents_wrap">
                <Emotion/>
            </div>
            <Footer />
        </>
    )
}