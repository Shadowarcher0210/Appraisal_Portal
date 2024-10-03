// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Tailwind CSS is imported here
import App from './App';
import {BrowserRouter} from "react-router-dom"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);