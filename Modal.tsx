
import React, { Fragment } from 'react';
import { CloseIcon } from './icons/CloseIcon';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="bg-white rounded-lg shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
         <div className="absolute top-0 right-0 pt-4 pr-4">
          <button
            type="button"
            className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={onClose}
          >
            <span className="sr-only">Close</span>
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
