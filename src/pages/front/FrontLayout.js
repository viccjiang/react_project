import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
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
              © 2020 LOGO All Rights Reserved. | 僅個人學習，無任何商業用途
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
