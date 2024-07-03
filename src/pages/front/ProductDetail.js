import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useOutletContext, useParams } from "react-router-dom";

// redux
import { useDispatch } from "react-redux";
import { createMessageAsync } from "../../slice/messageSlice";

function ProductDetail() {
  const dispatch = useDispatch();

  const [product, setProduct] = useState({}); // 單一產品資料
  const [cartQuantity, setCartQuantity] = useState(1); // 購物車數量
  const [isLoading, setIsLoading] = useState(false); // 是否載入中
  const { getCart } = useOutletContext(); // 取得 getCart 方法

  // 取得路由參數 id ，id 會帶在路由參數
  const { id } = useParams();

  // 取得單一產品資料，帶入 id
  const getProduct = async (id) => {
    const productRes = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/product/${id}`
    );
    setProduct(productRes.data.product);
  };

  const addToCart = async () => {
    const data = {
      data: {
        product_id: product.id,
        qty: cartQuantity,
      },
    };
    setIsLoading(true);
    try {
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart`,
        data
      );
      dispatch(createMessageAsync(res.data));
      getCart();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      dispatch(createMessageAsync(error.response.data));
    }
  };

  useEffect(() => {
    getProduct(id);
  }, [id]);

  return (
    <div className="full-height">
      <div
        style={{
          minHeight: "300px",
          backgroundImage: `url(${product.imageUrl})`,
          backgroundPosition: "center center",
        }}
      ></div>
      <div className="container">
        <div className="row justify-content-between mt-4 mb-7">
          <div className="col-md-7">
            <div className="my-4">
              <img src={product.imageUrl} alt="" className="img-fluid " />
            </div>
            {/* 渲染 product.imagesUrl 圖片的陣列 */}
            <div className="row">
              <div className="col-3 d-flex">
                {product.imagesUrl &&
                  product.imagesUrl
                    .filter((image) => image !== "") // 過濾空字串，避免渲染空圖片
                    .map((image, index) => (
                      <img
                        src={image}
                        alt=""
                        className="img-fluid me-2"
                        key={index}
                      />
                    ))}
              </div>
            </div>
          </div>
          <div className="col-md-4 my-4">
            <h2 className="mb-0">{product.title}</h2>
            <p className="fw-bold">NT$ {product.price}</p>
            <p>{product.content}</p>
            <div className="input-group mb-3 border rounded-pill mt-3">
              <div className="input-group-prepend">
                <button
                  className="btn btn-outline-dark border-0 py-3 rounded-start-pill product-detail-hover"
                  type="button"
                  id="button-addon1"
                  onClick={() =>
                    setCartQuantity((pre) => (pre === 1 ? pre : pre - 1))
                  }
                >
                  <i className="bi bi-dash"></i>
                </button>
              </div>
              <input
                type="number"
                className="form-control border-0 text-center my-auto shadow-none"
                placeholder=""
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
                readOnly
                value={cartQuantity}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-dark border-0 py-3 rounded-end-circle product-detail-hover"
                  type="button"
                  id="button-addon2"
                  onClick={() => setCartQuantity((pre) => pre + 1)}
                >
                  <i className="bi bi-plus"></i>
                </button>
              </div>
            </div>
            <div className="d-grid">
              <button
                type="button"
                className="btn btn-light rounded-pill hover-gradient shadow bg-body-tertiary rounded mb-4 py-3"
                disabled={isLoading}
                onClick={() => {
                  addToCart();
                }}
              >
                加入購物車
              </button>
            </div>
            <div className="text-secondary d-flex justify-content-end align-items-center gap-2">
              <span className="me-3">分享</span>
              <Link to="/" className="link-dark">
                <i className="bi bi-facebook"></i>
              </Link>
              <Link to="/" className="link-dark">
                <i className="bi bi-instagram"></i>
              </Link>
              <Link to="/" className="link-dark">
                <i className="bi bi-twitter-x"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
