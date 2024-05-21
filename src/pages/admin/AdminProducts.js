import { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import ProductModal from "../../components/ProductModal";
import DeleteModal from "../../components/DeleteModal";
import { Modal } from "bootstrap";
import Pagination from "../../components/Pagination";

import {
  MessageContext,
  handleSuccessMessage,
  handleErrorMessage,
} from "../../store/messageStore";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});

  // type: 決定 modal 展開的用途，是新增還是編輯
  const [type, setType] = useState("create"); // create, edit

  // 點選編輯時要把當前商品傳入，所以使用 tempProduct 來暫存產品資料
  const [tempProduct, setTempProduct] = useState({});

  // 使用 useRef 綁定元素
  const productModal = useRef(null);
  const deleteModal = useRef(null);

  // 使用 useContext 取得全域的 dispatch
  const [, dispatch] = useContext(MessageContext);

  // 進入頁面中會先觸發 useEffect (生命週期)
  useEffect(() => {
    // 這裡的 productModal 已經使用 useRef 綁定元素，初始化 Modal
    productModal.current = new Modal("#productModal", {
      backdrop: "static", // 點擊背景不會關閉
    });

    deleteModal.current = new Modal("#deleteModal", {
      backdrop: "static",
    });

    // 取得所有產品資料
    getProducts();
  }, []);

  // 取得所有產品資料，預設 page 第一頁
  const getProducts = async (page = 1) => {
    // 取得遠端資料

    // 須注意這支 products api 才有分頁資訊，all api 沒有分頁資訊
    const productRes = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/admin/products?page=${page}`
    );
    console.log(productRes);

    setProducts(productRes.data.products);
    setPagination(productRes.data.pagination);
  };

  // 開啟產品彈窗
  const openProductModal = (type, product) => {
    // 開啟彈窗時，設定 type 和 tempProduct
    // 這兩個資料需要透過 props 傳入 ProductModal
    setType(type);
    setTempProduct(product);
    productModal.current.show();
  };

  const closeProductModal = () => {
    productModal.current.hide();
  };

  // 開啟產品彈窗
  const openDeleteModal = (product) => {
    // 開啟彈窗時，設定  tempProduct
    // 這兩個資料需要透過 props 傳入 ProductModal
    setTempProduct(product);
    deleteModal.current.show();
  };

  const closeDeleteModal = () => {
    deleteModal.current.hide();
  };

  // 刪除放外層，可以共用
  const deleteProduct = async (id) => {
    try {
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${id}`
      );
      if (res.data.success) {
        getProducts();
        handleSuccessMessage(dispatch, res);
        closeDeleteModal();
      }
    } catch (error) {
      console.error(error);
      handleErrorMessage(dispatch, error);
    }
  };

  return (
    <div className="p-3">
      {/* 產品彈窗元件 */}
      <ProductModal
        closeProductModal={closeProductModal}
        getProducts={getProducts}
        tempProduct={tempProduct}
        type={type}
      />

      {/* 刪除彈窗元件 */}
      <DeleteModal
        close={closeDeleteModal}
        text={tempProduct.title}
        handleDelete={deleteProduct}
        id={tempProduct.id}
      />

      <h3>產品列表</h3>
      <hr />
      <div className="text-end">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => openProductModal("create", {})}
        >
          建立新商品
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">分類</th>
            <th scope="col">名稱</th>
            <th scope="col">售價</th>
            <th scope="col">啟用狀態</th>
            <th scope="col">編輯</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <tr key={product.id}>
                <td>{product.category}</td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.is_enabled ? "啟用" : "未啟用"}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => openProductModal("edit", product)}
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm ms-2"
                    onClick={() => openDeleteModal(product)}
                  >
                    刪除
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* 分頁元件 */}
      <Pagination pagination={pagination} changePage={getProducts} />
    </div>
  );
}

export default AdminProducts;
