import React from 'react';
import PropTypes from 'prop-types';
import style from './InputField.css';

export default function InputField({ className, ...rest }) {
  return <input className={style.input + ' ' + className} {...rest} />;
}

InputField.propTypes = {
  className: PropTypes.string
};

InputField.defaultProps = {
  className: ''
};
