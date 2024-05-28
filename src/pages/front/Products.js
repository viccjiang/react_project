import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";

function Products() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setLoading] = useState(false);

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

  useEffect(() => {
    getProducts(1);
  }, []);

  return (
    <>
      <div className="container mt-md-5 mt-3 mb-7">
        <Loading isLoading={isLoading} />
        <div className="row">
          {/* 產品列表 */}
          {products.map((product) => {
            return (
              <div className="col-sm-6 col-md-4 col-lg-3" key={product.id}>
                <div className="card border-0 mb-4 position-relative position-relative">
                  <img
                    src={product.imageUrl}
                    className="card-img-top rounded-0 object-cover"
                    height={300}
                    alt="..."
                  />
                  <div className="card-body p-0">
                    <h4 className="mb-0 mt-3">
                      {/* 詳情頁 */}
                      <Link to={`/product/${product.id}`}>{product.title}</Link>
                    </h4>
                    <p className="text-muted mt-3">${product.price}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* 分頁元件 */}
        <nav className="d-flex justify-content-center">
          <Pagination pagination={pagination} changePage={getProducts} />
        </nav>
      </div>
    </>
  );
}

export default Products;
