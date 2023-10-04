import toast, { Toaster } from 'react-hot-toast';

export const successMsg = (msg: string) => toast(msg);

export const CustomToast = () => {
    return (
        <Toaster toastOptions={{className : "text-[13px] bg-reverse-primary text-primary rounded-[10px] font-semibold", duration: 1000}}/>
    )
}