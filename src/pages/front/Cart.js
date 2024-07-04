import { Link, useOutletContext } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import DeleteModal from "../../components/DeleteModal";
import DeleteAllModal from "../../components/DeleteAllModal";
import { Modal } from "bootstrap";
import Loading from "../../components/Loading";

// redux
import { useDispatch } from "react-redux";
import { createMessageAsync } from "../../slice/messageSlice";

function Cart() {
  const dispatch = useDispatch();

  const { cartData, getCart, isLoading } = useOutletContext();
  const [loadingItems, setLoadingItem] = useState([]);

  // 點選編輯時要把當前商品傳入，所以使用 tempProduct 來暫存產品資料
  // 編輯時的資料是透過 tempProduct 來傳遞
  const [tempProduct, setTempProduct] = useState({});

  // 使用 useRef 綁定元素 modal
  const deleteModal = useRef(null);
  const deleteModalAll = useRef(null);

  // 開啟刪除產品彈窗
  const openDeleteModal = (product) => {
    // 開啟彈窗時，設定  tempProduct
    // 這兩個資料需要透過 props 傳入 ProductModal
    console.log(product);
    setTempProduct(product);
    deleteModal.current.show();
  };

  const closeDeleteModal = () => {
    deleteModal.current.hide();
  };

  // 開啟刪除全部產品彈窗
  const openDeleteModalAll = () => {
    deleteModalAll.current.show();
  };

  const closeDeleteModalAll = () => {
    deleteModalAll.current.hide();
  };

  // 做一個刪除全部購物車的功能
  const removeAllCart = async () => {
    try {
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/carts`
      );
      console.log(res);
      if (res.data.success) {
        getCart();
        closeDeleteModalAll();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItem = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart/${id}`
      );
      console.log(res);
      if (res.data.success) {
        getCart();
        closeDeleteModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCartItem = async (item, quantity) => {
    const data = {
      data: {
        product_id: item.product_id,
        qty: quantity,
      },
    };
    setLoadingItem([...loadingItems, item.id]);
    try {
      const res = await axios.put(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart/${item.id}`,
        data
      );
      console.log(res);
      setLoadingItem(
        loadingItems.filter((loadingObject) => loadingObject !== item.id)
      );
      dispatch(createMessageAsync(res.data));
      getCart();
    } catch (error) {
      console.log(error);
      dispatch(createMessageAsync(error.response.data));
      setLoadingItem(
        loadingItems.filter((loadingObject) => loadingObject !== item.id)
      );
    }
  };

  // function formatCurrency(amount) {
  //   // 確保輸入是數字
  //   if (isNaN(amount)) {
  //     throw new Error("輸入必須是數字");
  //   }

  //   // 使用 toLocaleString 方法進行格式化
  //   return "NT$" + Number(amount).toLocaleString("zh-TW");
  // }

  // 進入頁面中會先觸發 useEffect (生命週期)
  useEffect(() => {
    // 刪除產品 modal
    // 這裡的 deleteModal 已經使用 useRef 綁定元素，初始化 Modal
    deleteModal.current = new Modal("#deleteModal", {
      backdrop: "static",
    });

    // 刪除全部產品 modal
    // 這裡的 deleteModalAll 已經使用 useRef 綁定元素，初始化 Modal
    deleteModalAll.current = new Modal("#deleteAllModal", {
      backdrop: "static",
    });

    // 取得所有產品資料
    getCart();
  }, []);

  return (
    <div className="container">
      <Loading isLoading={isLoading} />
      {/* DeleteModal Single*/}
      <DeleteModal
        text={tempProduct?.product?.title}
        close={closeDeleteModal}
        handleDelete={removeCartItem}
        id={tempProduct.id}
      />
      {/* DeleteAll Modal */}
      <DeleteAllModal
        text={tempProduct?.product?.title}
        close={closeDeleteModalAll}
        handleDelete={removeAllCart}
      />
      <div className="row d-flex justify-content-center">
        <div className="col-md-8 bg-white py-5 full-height">
          {cartData?.carts?.length === 0 ? (
            <>
              <div className="alert alert-secondary text-center py-6">
                您還沒有選擇課程喔
              </div>
              <Link
                to="/products"
                className="btn btn-primary rounded-3 w-100  rounded-0 py-3"
              >
                選擇健身或其他課程
              </Link>
            </>
          ) : (
            <>
              <div className="d-flex justify-content-between">
                <h2 className="mt-2">您選購的課程</h2>
              </div>

              {cartData?.carts?.map((item) => {
                return (
                  <div
                    className="d-flex mt-4 bg-light cart-bg-hover rounded-4"
                    key={item.id}
                  >
                    <Link to={`/product/${item.product.id}`}>
                      <img
                        src={item.product.imageUrl}
                        alt=""
                        className="img-fluid object-cover rounded-start-4"
                        style={{
                          width: "250px",
                          height: "150px",
                        }}
                      />
                    </Link>
                    <div className="w-100 p-3 position-relative">
                      <button
                        type="button"
                        className="position-absolute btn"
                        style={{ top: "10px", right: "10px" }}
                        onClick={() => {
                          openDeleteModal(item);
                        }}
                      >
                        <i className="bi bi-trash3 text-danger fs-5"></i>
                      </button>
                      <p className="mb-0 fw-bold">{item.product.title}</p>
                      <p
                        className="mb-1 text-muted"
                        style={{ fontSize: "14px" }}
                      >
                        {item.product.content}
                      </p>
                      <div className="d-flex justify-content-between align-items-center w-100">
                        <div className="input-group w-50 align-items-center">
                          <select
                            name=""
                            className="form-select"
                            id=""
                            value={item.qty}
                            disabled={loadingItems.includes(item.id)}
                            onChange={(e) => {
                              // 注意型別，這裡的 e.target.value 是字串，所以要轉成數字
                              updateCartItem(item, e.target.value * 1);
                            }}
                          >
                            {[...new Array(20)].map((i, num) => {
                              return (
                                <option value={num + 1} key={num}>
                                  {num + 1}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <p className="mb-0 ms-auto">NT${item.final_total}</p>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="d-flex justify-content-between mt-4">
                <p className="mb-0 h4 fw-bold">總金額</p>
                <p className="mb-0 h4 fw-bold">NT${cartData.final_total}</p>
              </div>
              <div className="d-flex flex-column flex-md-row gap-2 mt-4">
                {/* 刪除全部按鈕 */}
                <button
                  type="button"
                  className="btn btn-outline-danger w-100  rounded-3 py-3"
                  onClick={() => {
                    openDeleteModalAll();
                  }}
                >
                  刪除全部
                </button>
                <Link
                  to="/checkout"
                  className="btn btn-primary w-100  rounded-3 py-3 "
                >
                  確認課程正確
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
