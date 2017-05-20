import React from 'react';
import ReactDOM from 'react-dom';
import TreeProvider from './react/smart/TreeProvider';
import App from './react/smart/App';
import './app.css';

ReactDOM.render(
  <TreeProvider>
    <App />
  </TreeProvider>,
  document.querySelector('body').appendChild(document.createElement('div'))
);
