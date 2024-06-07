import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import Bmi from "../../components/Bmi";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css/pagination";

function Home() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const productRes = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/products/?category=健身`
    );
    console.log(productRes);
    setProducts(productRes.data.products);
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
                  <div className="card border-0 mb-4 position-relative position-relative rounded-0">
                    <img
                      src={product.imageUrl}
                      className="card-img-top rounded-0 object-cover"
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
            <div className="col-md-4 text-center">
              <Bmi />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
