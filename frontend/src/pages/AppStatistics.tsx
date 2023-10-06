import Header from '@/components/inc/Header';
import Footer from '@/components/inc/Footer';
import Statistic from '@/components/statistic/Statistic';
import { motion } from 'framer-motion';

export default function AppStatistics() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Header />
            <Statistic />
            <Footer />
        </motion.div>
    )
}