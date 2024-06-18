import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import axios from "axios";

function FrontLayout() {
  const [cartData, setCartData] = useState([]); // 購物車資料

  // 取得購物車資料
  const getCart = async () => {
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart`
      );
      console.log("購物車: ", res.data.data);
      setCartData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      {/* header */}
      <Navbar cartData={cartData}></Navbar>
      {/* 巢狀 */}
      <Outlet context={{ getCart, cartData }}></Outlet>
      {/* link */}
      <div className="bg-black">
        <div className="footer-rounded pt-8 pt-md-6 rounded-bottom-40 bg-white"></div>
        <div className="container pt-1 pt-lg-4">
          <div className="border-bottom border-gray-2 fw-medium">
            <ul className="nav justify-content-center justify-content-lg-start pb-1 pb-lg-4">
              <li className="py-3">
                <Link
                  to={"/"}
                  className="fs-5 text-light d-inline-block  fs-md-7 ls-2 p-1 p-md-3 mx-1 mx-md-2 footer-hover-gradient-text"
                >
                  首頁
                </Link>
              </li>
              <li className="py-3">
                <Link
                  to={"/products"}
                  className="fs-5 text-light d-inline-block  fs-md-7 ls-2 p-1 p-md-3 mx-1 mx-md-2 footer-hover-gradient-text"
                >
                  購買課程
                </Link>
              </li>
              <li className="py-3">
                <Link
                  href="/coaches"
                  className="fs-5 text-light d-inline-block  fs-md-7 ls-2 p-1 p-md-3 mx-1 mx-md-2 footer-hover-gradient-text"
                >
                  課程教練
                </Link>
              </li>
              <li className="py-3">
                <Link
                  to={"/about"}
                  className="fs-5 text-light d-inline-block  fs-md-7 ls-2 p-1 p-md-3 mx-1 mx-md-2 footer-hover-gradient-text"
                >
                  關於我們
                </Link>
              </li>
            </ul>
          </div>
          <div className="d-flex flex-column flex-md-row align-items-center pt-4 pt-md-6 pb-1 pb-md-5">
            <ul className="fs-8 fs-lg-7 ls-md-2 text-gray-3 list-unstyled text-center text-md-start py-1">
              <li className="mb-2 text-light">
                <span className="me-2">地址</span>
                <span className="text-white">236台北市健身路999號</span>
              </li>
              <li>
                <span className="me-2 text-light">電話</span>
                <a
                  href="tel:02-1234567"
                  className="mb-0 text-light footer-hover-gradient-text"
                  title="立即撥打"
                >
                  02-1234567
                </a>
              </li>
            </ul>
            <ul className="list-unstyled d-flex ms-md-auto">
              <li className="mx-2">
                <a
                  href="https://www.facebook.com/"
                  className="d-inline-block rounded-circle bg-gray-2"
                >
                  <span className="icon-base icon-fb bg-white m-2"></span>
                </a>
              </li>
              <li className="mx-2">
                <a
                  href="https://www.youtube.com/"
                  className="d-inline-block rounded-circle bg-gray-2"
                >
                  <span className="icon-base icon-yt bg-white m-2"></span>
                </a>
              </li>
              <li className="mx-2">
                <Link
                  href="#"
                  className="d-inline-block rounded-circle bg-gray-2"
                >
                  <span className="icon-base icon-ig bg-white m-2"></span>
                </Link>
              </li>
              <li className="mx-2">
                <Link
                  href="#"
                  className="d-inline-block rounded-circle bg-gray-2"
                >
                  <span className="icon-base icon-message bg-white m-2"></span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* footer */}
      <div
        className="bg-primary"
        style={{
          backgroundImage: "linear-gradient(120deg, #712cf9 , #ff99cc 100%)",
        }}
      >
        <div className="container">
          <div className="d-flex align-items-center justify-content-between text-white py-4">
            <p className="mb-0">
              © 2024 FIT HER All Rights Reserved. | 僅個人學習，無任何商業用途
            </p>
            <NavLink className="logo navbar-brand fs-1" to="/">
              FIT her.
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default FrontLayout;
