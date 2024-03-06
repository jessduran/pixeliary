import CloseIcon from "@/icons/close-icon";

interface ModalProps {
  isVisible: boolean,
  onClose: Function,
  children: React.ReactNode
}

export default function Modal({ isVisible, onClose, children }: ModalProps) {
  if (!isVisible) return null;

  const handleClose = (e: any) => {
    if (e.target.id === 'wrapper') onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-10" id="wrapper" onClick={handleClose}>
      <div className="w-[600px] flex flex-col m-5">
        <div className="bg-white p-2 rounded relative">
          <button className="absolute text-black text-xl place-self-end right-0 top-0 m-5" onClick={() => onClose()}>
            <CloseIcon />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}
