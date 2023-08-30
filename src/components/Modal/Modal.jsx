import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ModalElem } from './Modal.styled';

export const Modal = ({ onClose, image }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackClose = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const { img, tags } = image;
  return (
    <ModalElem onClick={handleBackClose}>
      <div className="modal">
        <img src={img} alt={tags} />
      </div>
    </ModalElem>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  image: PropTypes.object.isRequired,
};
