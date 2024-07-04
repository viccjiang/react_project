import { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import CouponModal from "../../components/CouponModal";
import DeleteModal from "../../components/DeleteModal";
import { Modal } from "bootstrap";
import Pagination from "../../components/Pagination";

import {
  MessageContext,
  handleSuccessMessage,
  handleErrorMessage,
} from "../../store/messageStore";

function AdminCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [pagination, setPagination] = useState({});

  // type: 決定 modal 展開的用途，是新增還是編輯
  const [type, setType] = useState("create"); // create, edit

  // 點選編輯時要把當前商品傳入，所以使用 tempProduct 來暫存產品資料
  const [tempCoupon, setTempCoupon] = useState({});

  // 使用 useRef 綁定元素
  const couponModal = useRef(null);
  const deleteModal = useRef(null);

  // 使用 useContext 取得全域的 dispatch
  const [, dispatch] = useContext(MessageContext);

  // 進入頁面中會先觸發 useEffect (生命週期)
  useEffect(() => {
    // 這裡的 productModal 已經使用 useRef 綁定元素，初始化 Modal
    couponModal.current = new Modal("#productModal", {
      backdrop: "static", // 點擊背景不會關閉
    });

    deleteModal.current = new Modal("#deleteModal", {
      backdrop: "static",
    });

    // 取得所有產品資料
    getCoupons();
  }, []);

  // 取得所有產品資料，預設 page 第一頁
  const getCoupons = async (page = 1) => {
    // 取得遠端資料

    // 須注意這支 products api 才有分頁資訊，all api 沒有分頁資訊
    const couponRes = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupons?page=${page}`
    );
    setCoupons(couponRes.data.coupons);
    setPagination(couponRes.data.pagination);
  };

  // 開啟產品彈窗
  const openCouponModal = (type, item) => {
    // 開啟彈窗時，設定 type 和 tempProduct
    // 這兩個資料需要透過 props 傳入 ProductModal
    setType(type);
    setTempCoupon(item);
    couponModal.current.show();
  };

  const closeModal = () => {
    couponModal.current.hide();
  };

  // 開啟產品彈窗
  const openDeleteModal = (product) => {
    // 開啟彈窗時，設定  tempProduct
    // 這兩個資料需要透過 props 傳入 ProductModal
    setTempCoupon(product);
    deleteModal.current.show();
  };

  const closeDeleteModal = () => {
    deleteModal.current.hide();
  };

  // 刪除放外層，可以共用
  const deleteCoupon = async (id) => {
    try {
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${id}`
      );
      if (res.data.success) {
        getCoupons();
        handleSuccessMessage(dispatch, res);
        closeDeleteModal();
      }
    } catch (error) {
      handleErrorMessage(dispatch, error);
    }
  };

  return (
    <div className="p-3">
      {/* 產品彈窗元件 */}
      <CouponModal
        closeModal={closeModal}
        getCoupons={getCoupons}
        tempCoupon={tempCoupon}
        type={type}
      />

      {/* 刪除彈窗元件 */}
      <DeleteModal
        close={closeDeleteModal}
        text={tempCoupon.title}
        handleDelete={deleteCoupon}
        id={tempCoupon.id}
      />

      <h3>優惠券列表</h3>
      <hr />
      <div className="text-end">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => openCouponModal("create", {})}
        >
          建立新優惠券
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">標題</th>
            <th scope="col">折扣</th>
            <th scope="col">到期日</th>
            <th scope="col">優惠碼</th>
            <th scope="col">啟用狀態</th>
            <th scope="col">編輯</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((product) => {
            return (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>{product.percent}</td>
                <td>{new Date(product.due_date).toDateString()}</td>
                <td>{product.code}</td>
                <td>{product.is_enabled ? "啟用" : "未啟用"}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => openCouponModal("edit", product)}
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
      <Pagination pagination={pagination} changePage={getCoupons} />
    </div>
  );
}

export default AdminCoupons;
