import React from "react";
import ReactDOM from "react-dom/client";

// 使用 redux 管理狀態
import { store } from "./store";
import { Provider } from "react-redux";

// 客製化 bootstrap 變數
import "./stylesheets/all.scss";
// bootstrap icon
import "bootstrap-icons/font/bootstrap-icons.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

// swiper
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
      {/* redux store */}
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>
);

reportWebVitals();
