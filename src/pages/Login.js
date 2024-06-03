import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
// import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  // 定義資料欄位
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [loginState, setLoginState] = useState({});

  // 綁定在事件上 ，處理 input 變動
  const handleChange = (e) => {
    // 解構賦值 e.target.name 取得 input 的 name 屬性值，e.target.value 取得 input 的 value 值
    const { name, value } = e.target;

    // 更新 data 的值
    setData({
      ...data, // 原始值
      [name]: value, // 新的值，中括號語法動態設定屬性，中括號是要取變數的值
    });
  };

  // 提交表單 api 請求
  const submit = async (e) => {
    // 用 try catch 包住，避免錯誤發生時，整個應用程式崩潰
    try {
      // 登入，post 請求，夾帶表單資料 data
      const res = await axios.post(`/v2/admin/signin`, data);

      // 取得 token
      const { token, expired } = res.data;

      // 將 token 儲存在 cookie  (toekn 跟 到期日)
      document.cookie = `reactAccessToken=${token}; expires=${new Date(
        expired
      )};`;

      // 登入成功，導向到 /admin/products
      if (res.data.success) {
        navigate("/admin/products");
      }
    } catch (error) {
      // catch error 把錯誤訊息捕捉
      setLoginState(error.response.data);
    }
  };

  return (
    <div
      className="bg-img"
      style={{ minHeight: "100vh", "--bs-bg-opacity": ".1" }}
    >
      <div className="bg-light ">
        <nav className="navbar container d-flex justify-content-between px-2 px-md-0">
          <NavLink to="/">
            <p className="m-0 fs-1 logo text-black">FIT her.</p>
          </NavLink>
          <NavLink
            to="/"
            className=" btn btn-outline-primary  fw-bolder  border border-primary py-2 px-3 rounded-start-pill rounded-end-pill"
          >
            返回前台
          </NavLink>
        </nav>
      </div>

      <div className="full-height container py-5 d-flex justify-content-center align-items-center ">
        <div className="row w-100 w-md-50 ">
          <div className="col p-0">
            <div className="d-flex justify-content-center align-items-center">
              <p className="display-4 fw-bolder text-light">管理者</p>
              <p className="display-4 fw-lighter text-light">登入</p>
            </div>

            {/* 錯誤訊息 */}
            <div
              className={`alert alert-danger ${
                loginState.message ? "d-block" : "d-none"
              }`}
              role="alert"
            >
              {loginState.message}
            </div>

            <div className="">
              <label htmlFor="email" className="form-label w-100">
                <p className="text-light m-0">Email</p>
                <input
                  id="email"
                  className="form-control rounded-start-pill rounded-end-pill"
                  name="username"
                  type="email"
                  placeholder="請輸入管理員信箱"
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="">
              <label htmlFor="password" className="form-label w-100">
                <p className="text-light m-0">密碼</p>
                <input
                  type="password"
                  className="form-control rounded-start-pill rounded-end-pill"
                  name="password"
                  id="password"
                  placeholder="請輸入密碼"
                  onChange={handleChange}
                />
              </label>
            </div>
            <button
              type="button"
              className="mt-4 btn btn-primary w-100 rounded-start-pill rounded-end-pill"
              onClick={submit}
            >
              <p className="fw-600 m-0">登入</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
