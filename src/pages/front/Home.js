import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { useOutletContext, useParams } from "react-router-dom";

import Bmi from "../../components/Bmi";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css/pagination";

function Home() {
  const [products, setProducts] = useState([]);
  const { getCart } = useOutletContext(); // 取得 getCart 方法

  const getProducts = async () => {
    const productRes = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/products/?category=健身`
    );
    console.log(productRes);
    setProducts(productRes.data.products);
  };

  // 加入購物車
  const addCartItem = async (id) => {
    const data = {
      data: {
        product_id: id,
        qty: 1,
      },
    };
    try {
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart`,
        data
      );
      console.log(res);
      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Swiper
        className="mySwiper vh-90 position-relative"
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
      >
        <p className="text-light position-absolute top-50 top-50 start-50 translate-middle z-2000">
          FIT her - 讓妳綻放健康之美！
        </p>
        <SwiperSlide>
          <div>
            <img
              src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="object-cover w-100 vh-100"
              alt="..."
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://images.unsplash.com/photo-1554284126-aa88f22d8b74?q=80&w=1988&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="object-cover w-100 vh-100"
            alt="..."
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="object-cover w-100 vh-100"
            alt="..."
          />
        </SwiperSlide>
      </Swiper>

      <div className="container py-7">
        <div className="row flex-md-row-reverse flex-column">
          <div className="col-md-8">
            <img
              src="https://images.unsplash.com/photo-1550345332-09e3ac987658?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              width="100%"
              className="object-cover"
              height={400}
              alt="..."
            />
          </div>
          <div className="col-md-4 d-flex flex-column justify-content-center mt-md-0 mt-3 text-light">
            <h2 className="fw-bold">讓妳綻放健康之美！</h2>
            <h5 className="font-weight-normal text-muted mt-2">
              加入我們，開啟自信新篇章
            </h5>
            <ul>
              <li>💪 專屬女性的健身空間</li>
              <li>🧘‍♀️ 個性化訓練計劃</li>
              <li>🤗 友善社群，支持妳每一步</li>
            </ul>
            <div className="input-group mb-0 mt-4">
              <div className="input-group-append">
                <Link to={"/products"}>
                  <button
                    className="btn btn-light rounded-0"
                    type="button"
                    id="search"
                  >
                    立即加入
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black py-7 position-relative">
        <div
          className="bg-image position-absolute top-0 left-0 w-100 h-100 opacity-50"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1620188526357-ff08e03da266?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
            backgroundAttachment: "fixed",
          }}
        ></div>
        <div className="container mt-7">
          <div className="row">
            {products?.map((product) => {
              return (
                <div className="col-md-4 mt-md-4" key={product.id}>
                  <div className="card border-0 rounded-4 mb-4 position-relative position-relative rounded-0">
                    <img
                      src={product.imageUrl}
                      className="card-img-top rounded-top-4 object-cover"
                      alt="..."
                      height={300}
                    />
                    <div className="card-body p-4">
                      <h4 className="mb-0 mt-2">{product.title}</h4>
                      <Link
                        to={`/product/${product.id}`}
                        className="btn border-bottom rounded-0 text-nowrap mt-2 float-end stretched-link hover-gradient"
                      >
                        查看課程
                      </Link>
                      {/* 加入購物車 */}
                      <button
                        className="btn border-bottom rounded-0 text-nowrap mt-2 float-start stretched-link hover-gradient"
                        onClick={() => {
                          addCartItem(product.id);
                        }}
                      >
                        加入購物車
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="bg-light py-7">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col text-center">
              <Bmi />
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-7">
        <Swiper
          spaceBetween={5}
          slidesPerView={1} // 可調整每次展示的商品數量
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              // 640px以上的寬度
              slidesPerView: 2, // 顯示2個
              spaceBetween: 10, // 每個商品之間的距離
            },
            768: {
              // 768px以上的寬度
              slidesPerView: 3, // 顯示3個
              spaceBetween: 15, // 每個商品之間的距離
            },
          }}
        >
          {products?.map((product) => (
            <SwiperSlide key={product.id}>
              <div className=" mt-md-4">
                <div className="card border-0 mb-4 position-relative position-relative rounded-0">
                  <img
                    src={product.imageUrl}
                    className="card-img-top rounded-0 object-cover"
                    alt={product.title}
                    height={300}
                  />
                  <div className="card-body p-4">
                    <h4 className="mb-0 mt-2">{product.title}</h4>
                    <Link
                      to={`/product/${product.id}`}
                      className="btn border-bottom rounded-0 text-nowrap mt-2 float-end stretched-link hover-gradient"
                    >
                      查看課程
                    </Link>
                    <button
                      className="btn border-bottom rounded-0 text-nowrap mt-2 float-start stretched-link hover-gradient"
                      onClick={() => addCartItem(product.id)}
                    >
                      加入購物車
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
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
    </>
  );
}

export default Home;
