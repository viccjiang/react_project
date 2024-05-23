import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProductDetail() {
  const [product, setProduct] = useState({});

  // 取得路由參數 id ，id 會帶在路由參數
  const { id } = useParams();

  // 取得單一產品資料，帶入 id
  const getProduct = async (id) => {
    const productRes = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/product/${id}`
    );
    console.log(productRes);
    setProduct(productRes.data.product);
  };

  useEffect(() => {
    getProduct(id);
  }, [id]);

  return (
    <div className="container">
      <div
        style={{
          minHeight: "400px",
          backgroundImage: `url(${product.imageUrl})`,
          backgroundPosition: "center center",
        }}
      ></div>
      <div className="row justify-content-between mt-4 mb-7">
        <div className="col-md-7">
          <h2 className="mb-0">{product.title}</h2>
          <p className="fw-bold">NT$ {product.price}</p>
          <p>{product.content}</p>
          <div className="my-4">
            <img src={product.imageUrl} alt="" className="img-fluid mt-4" />
          </div>
        </div>
        <div className="col-md-4">
          <div className="input-group mb-3 border mt-3">
            <div className="input-group-prepend">
              <button
                className="btn btn-outline-dark rounded-0 border-0 py-3"
                type="button"
                id="button-addon1"
              >
                <i className="fas fa-minus"></i>
              </button>
            </div>
            <input
              type="text"
              className="form-control border-0 text-center my-auto shadow-none"
              placeholder=""
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-dark rounded-0 border-0 py-3"
                type="button"
                id="button-addon2"
              >
                <i className="fas fa-plus"></i>
              </button>
            </div>
          </div>
          <a
            href="./checkout.html"
            className="btn btn-dark btn-block rounded-0 py-3"
          >
            Lorem ipsum
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
