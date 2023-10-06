import Header from '@/components/inc/Header';
import Footer from '@/components/inc/Footer';
import Main from '@/components/main/Main';
import { motion } from 'framer-motion';

const AppMain = () => {

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Header/>
            <Main/>
            <Footer/>
        </motion.div>
    )
}

export default AppMain;