import Header from '@/components/inc/Header';
import Footer from '@/components/inc/Footer';
import Info from '@/components/info/Info';
import { motion } from 'framer-motion';

export default function AppInfo() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Header />
            <div className="contents_wrap">
                <Info/>
            </div>
            <Footer />
        </motion.div>
    )
}