import React from 'react';
import '../css/FormModal.css';

const FormModal = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>{title}</h3>
          <button onClick={onClose} className="close-btn">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default FormModal;