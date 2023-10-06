import Header from '@/components/inc/Header';
import Footer from '@/components/inc/Footer';
import MyPage from '@/components/mypage/MyPage';

export default function AppMyPage() {
    return (
        <>
            <Header />
            <div className="contents_wrap">
                <MyPage/>
            </div>
            <Footer />
        </>
    )
}