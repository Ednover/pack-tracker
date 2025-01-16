import { createPortal } from "react-dom";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="w-full max-w-[400px] bg-white rounded-xl flex flex-col justify-center text-center text-black px-4 py-1 pb-4">
        <button
          onClick={onClose}
          className="cursor-pointer text-end text-2xl"
        >
          x
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
