import { useEffect, useState } from 'react';
import axios from 'axios';

function CouponModal({ closeModal, getCoupons, type, tempCoupon }) {

  // 建立資料狀態
  const [tempData, setTempData] = useState({
    // 預設值
    title: "",
    is_enabled: 1,
    percent: 80,
    due_date: 1555459200,
    code: "testCode"
  });


  // 建立時間格式
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (type === 'create') {
      setTempData({
        title: "",
        is_enabled: 1,
        percent: 80,
        due_date: 1555459200,
        code: "testCode"
      });
      setDate(new Date());
    } else if (type === 'edit') {
      setTempData(tempCoupon);
      setDate(new Date(tempCoupon.due_date));
    }
  }, [type, tempCoupon])

  // 寫入值時觸發
  const handleChange = (e) => {

    // name input 欄位 title -> 對應到 api title 屬性
    // value 欄位輸入的值
    const { name, value } = e.target;

    // 處理 input 的 value 型別問題
    // 把價格取出來轉成數字
    // 查詢的 name 屬性是否包含在陣列中，使用陣列的 includes 方法

    if (['price', 'origin_price'].includes(name)) {
      setTempData({
        ...tempData,
        [name]: Number(value),
      });
    } else if (name === 'is_enabled') {
      // 是否啟用要取得 checkbox 的值，並且轉型
      setTempData({
        ...tempData,
        [name]: +e.target.checked, // 將布林 false 或 true 轉型數字 0 或 1
      });
    } else {
      setTempData({
        ...tempData, // 原始值
        [name]: value, // 欄位名稱 : 欄位輸入的值
      });
    }
  }

  // 儲存按鈕 post 資料
  const submit = async () => {
    try {

      // 新增
      let api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon`;
      let method = 'post';

      // 編輯
      if (type === 'edit') {
        api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${tempCoupon.id}`;
        method = 'put';
      }

      const res = await axios[method](
        api,
        {
          data: {
            ...tempData,
            due_date: date.getTime(),
          } // 依照 api 格式送出，所以包在 data 裡面
        }
      );
      console.log(res);
      // 送出submit後，執行以下
      // 關閉彈窗
      closeModal();
      // 關閉彈窗後執行，此函式為由外面 props 傳進來的函式，取得所有產品資料
      getCoupons();
    } catch (error) {
      console.log(error);
    }
  }

  // 上傳圖片/檔案
  const uploadFile = async (file) => {
    console.log(file);
    if (!file) return;

    const formData = new FormData();
    formData.append('file-to-upload', file);

    try {
      const res = await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/upload`, formData);
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
  }

  return (
    <div
      className='modal fade'
      tabIndex='-1'
      id="productModal"
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-lg'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='exampleModalLabel'>
              {
                type === 'create' ? '建立新優惠券' : `編輯商品 ${tempCoupon.title}`
              }
            </h1>
            <button
              type='button'
              className='btn-close'
              aria-label='Close'
              onClick={closeModal}
            />
          </div>
          <div className='modal-body'>
            <div className='mb-2'>
              <label className='w-100' htmlFor='title'>
                標題
                <input
                  type='text'
                  id='title'
                  placeholder='請輸入標題'
                  name='title'
                  className='form-control mt-1'
                  value={tempData.title}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className='row'>
              <div className='col-md-6 mb-2'>
                <label className='w-100' htmlFor='percent'>
                  折扣（%）
                  <input
                    type='text'
                    name='percent'
                    id='percent'
                    placeholder='請輸入折扣（%）'
                    className='form-control mt-1'
                    value={tempData.percent}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className='col-md-6 mb-2'>
                <label className='w-100' htmlFor='due_date'>
                  到期日
                  <input
                    type='date'
                    id='due_date'
                    name='due_date'
                    placeholder='請輸入到期日'
                    className='form-control mt-1'
                    value={`${date.getFullYear().toString()}-${(
                      date.getMonth() + 1
                    )
                      .toString()
                      .padStart(2, 0)}-${date
                      .getDate()
                      .toString()
                      .padStart(2, 0)}`}
                    onChange={(e) => {
                      setDate(new Date(e.target.value));
                    }}
                  />
                </label>
              </div>
              <div className='col-md-6 mb-2'>
                <label className='w-100' htmlFor='code'>
                  優惠碼
                  <input
                    type='text'
                    id='code'
                    name='code'
                    placeholder='請輸入優惠碼'
                    className='form-control mt-1'
                    value={tempData.code}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
            <label className='form-check-label' htmlFor='is_enabled'>
              <input
                className='form-check-input me-2'
                type='checkbox'
                id='is_enabled'
                name='is_enabled'
                checked={!!tempData.is_enabled} // !! 轉型 轉為布林值
                onChange={handleChange}
              />
              是否啟用
            </label>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-secondary' onClick={closeModal}>
              關閉
            </button>
            <button type='button' className='btn btn-primary' onClick={submit}>
              儲存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CouponModal;