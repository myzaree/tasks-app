import React, { ReactElement } from 'react';

import './Modal.less';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactElement;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
}: ModalProps) => (
  <div className={open ? 'modal' : 'modal hide'}>
    <div className="modal__window">
      <span className="modal__close" onClick={onClose}>
        x
      </span>
      {children}
    </div>
    <div className="modal__backdrop" onClick={onClose} />
  </div>
);
