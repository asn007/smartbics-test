import React from 'react';
import PropTypes from 'prop-types';
import style from './Button.css';

export default function Button({
  children,
  success,
  danger,
  className,
  ...rest
}) {
  return (
    <button
      className={`${style.btn} ${success ? style.success : ''} ${danger ? style.danger : ''} ${className}`}
      {...rest}
    >
      <div>{children}</div>
    </button>
  );
}

Button.propTypes = {
  success: PropTypes.bool,
  danger: PropTypes.bool,
  className: PropTypes.string
};

Button.defaultProps = {
  success: false,
  danger: false,
  className: ''
};
