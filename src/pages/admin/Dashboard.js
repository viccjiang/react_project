import { Outlet, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { useEffect, useReducer } from "react";
import Message from "../../components/Message";
import {
  MessageContext,
  messageReducer,
  initState,
} from "../../store/messageStore";

function Dashboard() {
  const navigate = useNavigate();

  const reducer = useReducer(messageReducer, initState);

  // 登出功能，清除 cookie 裡面的 token
  const logout = () => {
    // 清除 cookie 裡面存的 token
    document.cookie = "reactAccessToken=";
    // 導向到 /login
    navigate("/login");
  };

  // 取得 cookie 中的 reactAccessToken
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("reactAccessToken="))
    ?.split("=")[1];

  // 每次發出請求都會把 token 放在 header 裡面
  axios.defaults.headers.common["Authorization"] = token;

  useEffect(() => {
    if (!token) {
      // 如果沒有 token 導向到 /login
      return navigate("/login");
    }

    (async () => {
      try {
        // 檢查 token 是否有效
        await axios.post("/v2/api/user/check");
      } catch (error) {
        // 如果沒有錯誤訊息 success 為 false 時，導向到 /login
        if (!error.response.data.success) {
          navigate("/login");
        }
      }
    })();
  }, [navigate, token]);

  return (
    <MessageContext.Provider value={reducer}>
      <Message />
      {/* 表頭 */}
      <nav
        className="navbar navbar-expand-lg bg-primary"
        style={{ "--bs-bg-opacity": ".8" }}
      >
        <div className="container-fluid">
          <p className="text-white mb-0"> FIT her. 後台管理系統</p>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-sm btn-light"
                  onClick={logout}
                >
                  登出
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* 側邊欄 */}
      <div className="d-flex" style={{ minHeight: "calc(100vh - 56px)" }}>
        <div className="bg-light" style={{ width: "200px" }}>
          <ul className="list-group list-group-flush">
            <NavLink
              className="list-group-item list-group-item-action py-3"
              to="/admin/products"
            >
              <i className="bi bi-cup-fill me-2" />
              產品列表
            </NavLink>
            <NavLink
              className="list-group-item list-group-item-action py-3"
              to="/admin/coupons"
            >
              <i className="bi bi-ticket-perforated-fill me-2" />
              優惠卷列表
            </NavLink>
            <NavLink
              className="list-group-item list-group-item-action py-3"
              to="/admin/orders"
            >
              <i className="bi bi-receipt me-2" />
              訂單列表
            </NavLink>
          </ul>
        </div>

        {/* 巢狀路由，有 token 才會渲染子路由*/}
        <div className="w-100">{token && <Outlet />}</div>
      </div>
    </MessageContext.Provider>
  );
}

export default Dashboard;
