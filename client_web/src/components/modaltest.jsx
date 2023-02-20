import React, { useState } from 'react';
import Modal from "@mui/material/Modal";

const ModalComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const handleOpenModal = () => {
      setIsOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsOpen(false);
    };
  
    return (
      <div>
        <button onClick={handleOpenModal}>Open Modal</button>
        <Modal isOpen={isOpen} onRequestClose={handleCloseModal}>
          <h2>Modal Title</h2>
          <p>Modal Content</p>
          <button onClick={handleCloseModal}>Close Modal</button>
        </Modal>
      </div>
    );
  };
  
  export default ModalComponent;