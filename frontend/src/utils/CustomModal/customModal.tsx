import { modeAtom } from '@/atom/modeAtom';
import React from 'react';
import ReactModal from 'react-modal';
import { useRecoilValue } from 'recoil';

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;  // children prop 추가
}

const CustomModal: React.FC<ModalProps> = ({ isOpen, onRequestClose, children }) => {
  const mode = useRecoilValue(modeAtom).mode;
  
  const customModalStyles: ReactModal.Styles = {
    overlay: {
      backgroundColor: mode === 'dark' ? "rgba(255, 255, 255, 0.521)" : "rgba(0, 0, 0, 0.4)",
      width: "100%",
      height: "100vh",
      zIndex: "10",
      position: "fixed",
      top: "0",
      left: "0",
    },
    content: {
      width: "360px",
      height: "180px",
      zIndex: "150",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "10px",
      backgroundColor: mode === 'dark' ? "black" : "white",
      justifyContent: "center",
      overflow: "auto",
    },
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customModalStyles}
    >
      {children}
    </ReactModal>
  );
};

export default CustomModal;
