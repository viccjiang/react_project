import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { useOutletContext, useParams } from "react-router-dom";

import Bmi from "../../components/Bmi";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel, Autoplay, Navigation } from "swiper/modules";

import "swiper/css/pagination";
import "swiper/css/navigation"; // Navigation module styles

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
        className="mySwiper vh-100 position-relative"
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        // direction={"vertical"} // 垂直滑動
        mousewheel={{
          releaseOnEdges: true, // 滑鼠滾輪控制時，滾動到最邊緣時，會釋放滾輪控制
        }}
        modules={[Pagination, Mousewheel]}
      >
        <p
          className="fs-1 fw-bolder text-light position-absolute top-50 start-50 translate-middle z-2000 "
          style={{
            color: "white",
            textShadow: "black 0.1em 0.1em 0.2em",
            letterSpacing: "0.1em", // 增加文字間距
          }}
        >
          FIT her - 讓妳綻放健康之美！
          <Link to={"/products"} className="banner-link-hover">
            <i className="bi bi-arrow-right text-light fs-4">立即加入</i>
          </Link>
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

      <div className="container py-5 py-md-7">
        <div className="row flex-md-row-reverse flex-column">
          <div className="col-md-8">
            <img
              src="https://images.unsplash.com/photo-1550345332-09e3ac987658?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              width="100%"
              className="object-cover rounded-5"
              height={400}
              alt="..."
            />
          </div>
          <div className="col-md-4 d-flex flex-column justify-content-center align-items-center mt-md-0 mt-3">
            <h2 className="fw-bold">讓妳綻放健康之美！</h2>
            <h5 className="font-weight-normal text-muted mt-2">
              加入我們，開啟自信新篇章
            </h5>
            <ul className="list-unstyled my-4">
              <li>💪 專屬女性的健身空間</li>
              <li>🧘‍♀️ 個性化訓練計劃</li>
              <li>🤗 友善社群，支持妳每一步</li>
            </ul>

            <Link to={"/products"}>
              <button
                className="btn btn-light rounded-pill hover-gradient px-6 shadow p-3 bg-body-tertiary"
                type="button"
              >
                立即加入
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-light py-7">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center">
              <p className="fs-5 subtitle-border mb-2">FEATURES</p>
              <h2 className="fs-1 fw-bold mb-4">
                {" "}
                核心<span className="text-colot-gradient">特色</span>
              </h2>
              <p className="text-muted mt-2">
                FIT her
                提供專屬女性的健身空間，讓妳在舒適的環境中，享受健康運動的樂趣！
              </p>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-md-3 g-4 mt-4">
            <div className="col-md-4">
              <div
                className="card h-100 p-4 border-0 rounded-5 bg-light text-center card-hover-gradient"
                style={{
                  boxShadow: "0 0 1.5em rgba(75, 0, 130, 0.15)",
                }}
              >
                <div className="card-body">
                  <i className="bi bi-person-circle fs-1"></i>
                  <h4
                    className="mt-4 mb-4"
                    style={{
                      letterSpacing: "0.1em", // 增加文字間距
                    }}
                  >
                    女性專屬課程
                  </h4>
                  <p
                    className=""
                    style={{
                      letterSpacing: "0.1em", // 增加文字間距
                    }}
                  >
                    提供多元化的、專為女性設計的多種課程！多元化選擇，為妳量身打造！
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="card h-100 p-4 border-0 rounded-5 bg-light text-center card-hover-gradient"
                style={{
                  boxShadow: "0 0 1.5em rgba(75, 0, 130, 0.15)",
                }}
              >
                <div className="card-body">
                  <i className="bi bi-card-checklist fs-1"></i>
                  <h4
                    className="mt-4 mb-4"
                    style={{
                      letterSpacing: "0.1em", // 增加文字間距
                    }}
                  >
                    個性化健身計劃
                  </h4>
                  <p
                    className=""
                    style={{
                      letterSpacing: "0.1em", // 增加文字間距
                    }}
                  >
                    量身定制個性化的健身計劃，幫助她們實現最佳效果，讓每個人都擁有健康自信！
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="card h-100 p-4 border-0 rounded-5 bg-light text-center card-hover-gradient"
                style={{
                  boxShadow: "0 0 1.5em rgba(75, 0, 130, 0.15)",
                }}
              >
                <div className="card-body">
                  <i className="bi bi-person-hearts fs-1"></i>
                  <h4
                    className="mt-4 mb-4"
                    style={{
                      letterSpacing: "0.1em", // 增加文字間距
                    }}
                  >
                    友善社群
                  </h4>
                  <p
                    className=""
                    style={{
                      letterSpacing: "0.1em", // 增加文字間距
                    }}
                  >
                    有一群友善的社群成員，讓妳在這裡找到歸屬感，獲得溫暖和支持！
                  </p>
                </div>
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

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center">
              <p className="fs-5 subtitle-border mb-2">THE BEST COURSE</p>
              <h2 className="fs-1 fw-bold mb-4 text-white">熱門課程</h2>
              <p className="text-white mt-2">
                準備好改變你的身心嗎？立即報名參加這個專屬體驗，重新定義你的健身之旅！
              </p>
            </div>
          </div>
          <div className="row">
            {products?.map((product) => {
              return (
                <div className="col-sm-6 col-md-4 mt-md-4" key={product.id}>
                  <div className="home-card card shadow border-0 rounded-4 mb-4 position-relative position-relative rounded-0">
                    <img
                      src={product.imageUrl}
                      className="card-img-top rounded-top-4 object-cover"
                      alt="..."
                      height={300}
                    />
                    <div className="card-body p-4 d-flex flex-sm-column flex-md-column flex-lg-row justify-content-between align-items-center">
                      <div className="d-flex flex-column justify-content-between  mb-4">
                        <h4 className="mb-0 mt-2">{product.title}</h4>
                        <h5 className="mb-0 mt-2 text-secondary">
                          NT$ {product.price}
                        </h5>
                      </div>
                      {/* 查看課程 */}
                      {/* <Link
                        to={`/product/${product.id}`}
                        className="btn border-bottom rounded-0 text-nowrap mt-2 float-end stretched-link hover-gradient"
                      >
                        查看課程
                      </Link> */}
                      {/* 加入購物車 */}
                      <div>
                        <button
                          className="btn btn-light rounded-pill hover-gradient px-5  shadow bg-body-tertiary rounded stretched-link "
                          onClick={() => {
                            addCartItem(product.id);
                          }}
                        >
                          加入購物車
                        </button>
                      </div>
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
            <div className="col-md-6 text-center">
              <p className="fs-5 subtitle-border mb-2">BMI CALCULATOR</p>
              <h2 className="fs-1 fw-bold mb-4 ">
                BMI <span className="text-colot-gradient">身體質量指數</span>
              </h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col text-center">
              <Bmi />
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-7">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <p className="fs-5 subtitle-border mb-2">RECOMMENDATION</p>
            <h2 className="fs-1 fw-bold mb-4">
              專屬<span className="text-colot-gradient">推薦</span>
            </h2>
            <p className="text-muted mt-2">
              準備好改變你的身心嗎？立即報名參加這個專屬體驗，重新定義你的健身之旅！
            </p>
          </div>
        </div>
        <Swiper
          spaceBetween={5}
          slidesPerView={1} // 可調整每次展示的商品數量
          // loop={true} // 幻燈片數量不足時會報錯
          // autoplay={{
          //   delay: 2000,
          //   disableOnInteraction: false,
          // }}
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
          navigation={true}
          modules={[Autoplay, Navigation]}
          className="home-swiper"
        >
          {products?.map((product) => (
            <SwiperSlide key={product.id}>
              <div className=" mt-md-4">
                <div className="card border-0 mb-4 position-relative position-relative rounded-5">
                  <img
                    src={product.imageUrl}
                    className="card-img-top rounded-5 object-cover"
                    alt={product.title}
                    height={300}
                  />
                  <div className="card-body p-4">
                    <h4 className="mb-0 mt-2">{product.title}</h4>
                    <div className="d-flex justify-content-end">
                      <Link
                        to={`/product/${product.id}`}
                        className="btn btn btn-light rounded-pill hover-gradient px-5 shadow bg-body-tertiary rounded stretched-link"
                      >
                        查看課程
                      </Link>
                    </div>
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
