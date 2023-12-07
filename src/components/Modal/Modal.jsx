import { useEffect } from 'react';
import { ModalWindow, Overlay } from './Modal.styled';

export const Modal = ({ closeModal, modalData }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };
  // componentDidMount() {
  //   window.addEventListener('keydown', this.handleKeyDown);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.handleKeyDown);
  // }

  return (
    <Overlay onClick={handleBackdropClick}>
      <ModalWindow>
        <img src={modalData.img} alt={modalData.tags} />
      </ModalWindow>
    </Overlay>
  );
};
