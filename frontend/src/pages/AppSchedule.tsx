import Header from '@/components/inc/Header';
import Footer from '@/components/inc/Footer';
import Schedule from '@/components/schedule/Schedule';
import { motion } from 'framer-motion';


export default function AppSchedule() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Header />
                <div className="contents_wrap">
                    <Schedule />
                </div>
            <Footer />
        </motion.div>
    )
}