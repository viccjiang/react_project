import React from "react";
import ReactDOM from "react-dom/client";

// 客製化 bootstrap 變數
import "./stylesheets/all.scss";
// bootstrap icon
import "bootstrap-icons/font/bootstrap-icons.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "swiper/css";

// gh-pages 專案上線時 HashRouter
import { HashRouter } from "react-router-dom";

// axios 預設設定，發請求時不用再寫完整的 url
import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* hash router 須包在App 外層 */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);

reportWebVitals();
