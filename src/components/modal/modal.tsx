import React, {useEffect} from 'react';
import {IoMdCloseCircleOutline} from 'react-icons/io';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
    mt?: string;
}

const Modal: React.FC<ModalProps> = ({isOpen, onClose, children, mt}) => {

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };

        if (isOpen) window.addEventListener('keydown', handleKeyDown);
        else window.removeEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    return (
        <div
            className={`fixed inset-0 w-full flex items-center justify-center bg-slate-900 bg-opacity-70 z-50 py-10 sm:mx-0 
        transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'} ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        >
            <div
                className={`bg-white z-50 relative rounded-lg shadow-lg w-[90%] max-w-5xl transform transition-transform duration-300 ${mt}
        ${isOpen ? 'scale-100' : 'scale-95'}`}
                style={{maxHeight: '90vh', overflowY: 'auto',}}
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className='float-right pt-3 pr-3'>
                    <IoMdCloseCircleOutline size={30} className=' text-black'/>
                </button>
                <div className='p-6'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;