import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";
import Banner from "../../components/Banner";

// redux
import { useDispatch } from "react-redux";
import { createMessageAsync } from "../../slice/messageSlice";

function Products() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setLoading] = useState(false);
  const { getCart } = useOutletContext(); // 取得 getCart 方法

  const [hoveredCard, setHoveredCard] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  // 取得所有產品資料，預設 page 第一頁
  const getProducts = async (page = 1) => {
    setLoading(true);
    // 取得遠端資料

    // 須注意這支 products api 才有分頁資訊，all api 沒有分頁資訊
    const productRes = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}`
    );
    console.log(productRes);

    setProducts(productRes.data.products);
    setPagination(productRes.data.pagination);
    setLoading(false);
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
      dispatch(createMessageAsync(res.data));
      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts(1);
  }, []);

  return (
    <>
      <Banner />
      <div className="container mt-md-5 mt-3 mb-7 full-height">
        <Loading isLoading={isLoading} />
        <div className="row mb-4">
          {/* 產品列表 */}
          {products.map((product, index) => {
            return (
              <div className="col-sm-6 col-md-4 col-lg-3" key={product.id}>
                <div
                  className="card border-0  position-relative rounded-5"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to={`/product/${product.id}`}
                    className="product-link text-dark fs-5"
                  >
                    <img
                      src={product.imageUrl}
                      className="card-img-top rounded-5 object-cover"
                      height={300}
                      alt="..."
                    />
                    {hoveredCard === index && (
                      <div className="overlay">
                        <span className="overlay-text">課程資訊</span>
                      </div>
                    )}
                  </Link>
                  <div className="card-body p-0">
                    <h4 className="mb-0 mt-3">
                      {/* 詳情頁 */}
                      <Link
                        to={`/product/${product.id}`}
                        className="text-dark fs-5"
                      >
                        {product.title}
                      </Link>
                    </h4>
                    <p className="text-muted mt-3">${product.price}</p>
                  </div>
                </div>
                <div className="d-grid">
                  <button
                    className="btn btn-light rounded-pill hover-gradient shadow bg-body-tertiary rounded mb-4"
                    onClick={() => {
                      addCartItem(product.id);
                    }}
                  >
                    加入購物車
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {/* 分頁元件 */}
        <nav className="d-flex justify-content-end">
          <Pagination pagination={pagination} changePage={getProducts} />
        </nav>
      </div>
    </>
  );
}

export default Products;
