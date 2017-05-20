import React from 'react';
import PropTypes from 'prop-types';
import style from './InputGroup.css';

export default function InputGroup({ children, className }) {
  return (
    <div className={style.inputGroup + ' ' + className}>
      {React.Children.map(children, child => React.cloneElement(child))}
    </div>
  );
}

InputGroup.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

InputGroup.defaultProps = {
  className: ''
};
