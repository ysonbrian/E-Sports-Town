import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Modal from 'react-modal';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

Modal.setAppElement('#root');
