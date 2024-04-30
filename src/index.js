import React from 'react';
import ReactDOM from 'react-dom/client';

// 客製化 bootstrap 變數
import './stylesheets/all.scss';

import App from './App';
import reportWebVitals from './reportWebVitals';

// gh-pages 專案上線時 HashRouter  
import { HashRouter } from 'react-router-dom';

import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* hash router 須包在App 外層 */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);

reportWebVitals()