import React, { CSSProperties } from 'react';

import './Button.less';

interface ButtonProps {
  title: string;
  onClick?: () => void;
  isSubmit?: boolean;
  style?: CSSProperties;
  primary?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  isSubmit,
  style,
  primary,
}) => (
  <button
    className={primary ? 'button primary-button' : 'button'}
    type={isSubmit ? 'submit' : 'button'}
    onClick={onClick}
    style={style}
  >
    {title}
  </button>
);
