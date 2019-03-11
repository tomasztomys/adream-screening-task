import './modal.scss';

import React from 'react';
import ReactModal from 'react-modal';
import classnames from 'classnames';

ReactModal.setAppElement('body');

const Modal = ({
  isOpen,
  onAfterOpen,
  onRequestClose,
  style,
  className,
  overlayClassname,
  children
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onAfterOpen={onAfterOpen}
      onRequestClose={onRequestClose}
      style={style}
      className={className}
      overlayClassName={classnames('modal-overlay', overlayClassname)}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
