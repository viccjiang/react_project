import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  MessageContext,
  handleSuccessMessage,
  handleErrorMessage,
} from "../store/messageStore";

function ProductModal({ closeProductModal, getProducts, type, tempProduct }) {
  // 建立資料狀態
  const [tempData, setTempData] = useState({
    // 預設值
    title: "",
    category: "",
    origin_price: 0,
    price: 0,
    unit: "",
    description: "",
    content: "",
    is_enabled: 1,
    imageUrl: "",
    imagesUrl: ["", "", "", "", ""],
  });

  // 訊息提示，注意這裡的逗號不能清除
  const [, dispatch] = useContext(MessageContext);

  useEffect(() => {
    // 新增商品時，清空欄位
    if (type === "create") {
      setTempData({
        title: "",
        category: "",
        origin_price: 0,
        price: 0,
        unit: "",
        description: "",
        content: "",
        is_enabled: 1,
        imageUrl: "",
        imagesUrl: ["", "", "", "", ""],
      });
    } else if (type === "edit") {
      setTempData(tempProduct);
    }
  }, [type, tempProduct]);

  // 寫入值 (輸入欄位時) 時觸發
  const handleChange = (e) => {
    // name input 欄位 title -> 對應到 api title 屬性
    // value 欄位輸入的值
    const { name, value } = e.target;
    // matchImages 用來判斷是否有 images 字串
    const matchImages = name.match("images")?.[0]; //會回傳 "images" 或 undefined

    // 處理 input 的 value 型別問題
    // 把價格取出來轉成數字
    // 查詢的 name 屬性是否包含在陣列中，使用陣列的 includes 方法

    if (["price", "origin_price"].includes(name)) {
      setTempData({
        ...tempData,
        [name]: Number(value),
      });
    } else if (name === "is_enabled") {
      // 是否啟用要取得 checkbox 的值，並且轉型
      setTempData({
        ...tempData,
        [name]: +e.target.checked, // 將布林 false 或 true 轉型數字 0 或 1
      });
    } else if (matchImages) {
      const index = name.substring(10) - 1; // 擷取第幾個input
      setTempData((pre) => ({
        ...pre,
        imagesUrl: pre.imagesUrl.map((item, i) => {
          if (i === index) {
            return value;
          }
          return item;
        }),
      }));
    } else {
      setTempData({
        ...tempData, // 原始值
        [name]: value, // 欄位名稱 : 欄位輸入的值
      });
    }
  };

  // 儲存按鈕 post 資料
  const submit = async () => {
    try {
      // 新增
      let api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product`;
      let method = "post";

      // 編輯 (要帶產品 id)
      if (type === "edit") {
        api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${tempProduct.id}`;
        method = "put";
      }

      // 送出資料
      const res = await axios[method](api, {
        data: tempData, // 依照 api 格式送出，所以包在 data 裡面
      });
      console.log(res);

      // 觸發訊息提示，觸發 messageStore.js 的 POST_MESSAGE
      handleSuccessMessage(dispatch, res);

      // 送出submit後，執行以下
      // 關閉彈窗
      closeProductModal();
      // 關閉彈窗後執行，此函式為由外面 props 傳進來的函式，取得所有產品資料
      getProducts();
    } catch (error) {
      console.log(error);

      // 觸發訊息提示，觸發 messageStore.js 的 POST_MESSAGE
      handleErrorMessage(dispatch, error);
    }
  };

  // 上傳圖片/檔案
  const uploadFile = async (file) => {
    console.log(file);
    if (!file) return;

    // FormData 物件
    const formData = new FormData();
    // swagger 文件有說明 input 欄位名稱 name 為 file-to-upload，傳送檔案 file
    formData.append("file-to-upload", file);

    try {
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/upload`,
        formData
      );
      console.log(res);
      if (res.data.success) {
        setTempData({
          ...tempData,
          imageUrl: res.data.imageUrl,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="modal fade"
      tabIndex="-1"
      id="productModal"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {/* Modal 標題 */}
              {type === "create"
                ? "建立新商品"
                : `編輯商品 ${tempProduct.title}`}
            </h1>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={closeProductModal}
            />
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-sm-12">
                {/* <pre>{JSON.stringify(tempData)}</pre> */}
                <div className="form-group mb-2">
                  <label className="w-100" htmlFor="title">
                    標題
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="請輸入標題"
                      className="form-control"
                      onChange={handleChange}
                      value={tempData.title}
                    />
                  </label>
                </div>
                <div className="row">
                  <div className="form-group mb-2 col-md-6">
                    <label className="w-100" htmlFor="category">
                      分類
                      <input
                        type="text"
                        id="category"
                        name="category"
                        placeholder="請輸入分類"
                        className="form-control"
                        onChange={handleChange}
                        value={tempData.category}
                      />
                    </label>
                  </div>
                  <div className="form-group mb-2 col-md-6">
                    <label className="w-100" htmlFor="unit">
                      單位
                      <input
                        type="unit"
                        id="unit"
                        name="unit"
                        placeholder="請輸入單位"
                        className="form-control"
                        onChange={handleChange}
                        value={tempData.unit}
                      />
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group mb-2 col-md-6">
                    <label className="w-100" htmlFor="origin_price">
                      原價
                      <input
                        type="number"
                        id="origin_price"
                        name="origin_price"
                        placeholder="請輸入原價"
                        className="form-control"
                        onChange={handleChange}
                        value={tempData.origin_price}
                      />
                    </label>
                  </div>
                  <div className="form-group mb-2 col-md-6">
                    <label className="w-100" htmlFor="price">
                      售價
                      <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="請輸入售價"
                        className="form-control"
                        onChange={handleChange}
                        value={tempData.price}
                      />
                    </label>
                  </div>
                </div>
                <hr />
                <div className="form-group mb-2">
                  <label className="w-100" htmlFor="description">
                    產品描述
                    <textarea
                      type="text"
                      id="description"
                      name="description"
                      placeholder="請輸入產品描述"
                      className="form-control"
                      onChange={handleChange}
                      value={tempData.description}
                    />
                  </label>
                </div>
                <div className="form-group mb-2">
                  <label className="w-100" htmlFor="content">
                    說明內容
                    <textarea
                      type="text"
                      id="content"
                      name="content"
                      placeholder="請輸入產品說明內容"
                      className="form-control"
                      onChange={handleChange}
                      value={tempData.content}
                    />
                  </label>
                </div>
                <div className="form-group mb-2">
                  <div className="form-check">
                    <label
                      className="w-100 form-check-label"
                      htmlFor="is_enabled"
                    >
                      是否啟用
                      <input
                        type="checkbox"
                        id="is_enabled"
                        name="is_enabled"
                        placeholder="請輸入產品說明內容"
                        className="form-check-input"
                        onChange={handleChange}
                        checked={Boolean(tempData.is_enabled)}
                        // checked={!!tempData.is_enabled} // 一樣是轉型
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-sm-12">
                <div className="form-group mb-2">
                  <label className="w-100 border-top py-4" htmlFor="customFile">
                    <p className="fs-3 fw-bold">請上傳主要圖片</p>
                    <input
                      type="file"
                      id="customFile"
                      className="form-control"
                      onChange={(e) => {
                        uploadFile(e.target.files[0]);
                      }}
                    />
                  </label>
                </div>
                {/* 圖片預覽 */}
                {tempData.imageUrl && (
                  <img src={tempData.imageUrl} alt="" className="img-fluid" />
                )}

                <div className="form-group mb-2">
                  <label className="form-label ">最多輸入四張圖片網址</label>
                  <div
                    style={{ display: "flex", flexWrap: "wrap" }}
                    className="bg-light"
                  >
                    {[...Array(4)].map((_, index) => (
                      <div
                        key={index + 1}
                        style={{ flex: "1 0 33%", margin: "10px" }}
                      >
                        <input
                          type="text"
                          name={`imagesUrl-${index + 1} `}
                          className={`form-control mb-1`}
                          id={`productImagesUrl${index + 1}`}
                          placeholder={`請輸入第 ${index + 1} 張圖片連結`}
                          onChange={handleChange}
                          value={tempData.imagesUrl[index] || ""} // 避免 undefined
                        />
                        {tempData.imagesUrl && tempData.imagesUrl[index] && (
                          <img
                            src={tempData.imagesUrl[index]}
                            alt=""
                            className="img-fluid admin-modal-img"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* {JSON.stringify(tempData.imagesUrl)} */}

                {/* <hr />
                {tempData.imagesUrl &&
                  tempData.imagesUrl.map((image, index) => (
                    <img key={index} src={image} alt="" className="img-fluid" />
                  ))} */}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeProductModal}
            >
              關閉
            </button>
            <button type="button" className="btn btn-primary" onClick={submit}>
              儲存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
