import { createContext } from "react"; // 引入 createContext 來建立 context

// useContext 跨元件傳遞
export const MessageContext = createContext(); // 建立 context

// 初始化狀態 state
export const initState = {
  type: "",
  title: "",
  text: "",
};

// Reducer
// 建立訊息及刪除訊息，state 狀態本身以及 action 方法
export const messageReducer = (state, action) => {
  switch (action.type) {
    // 新增訊息
    case "POST_MESSAGE":
      return {
        ...action.payload, // 將 action.payload 的值傳入 state
      };
    // 清除訊息
    case "CLEAR_MESSAGE":
      return {
        ...initState, // 將 initState 的值傳入 state
      };
    default:
      return state;
  }
};

// 封裝處理成功訊息
export function handleSuccessMessage(dispatch, res) {
  dispatch({
    type: "POST_MESSAGE",
    payload: {
      type: "success",
      title: "更新成功",
      text: res.data.message,
    },
  });
  // 3 秒後清除訊息
  setTimeout(() => {
    dispatch({
      type: "CLEAR_MESSAGE",
    });
  }, 3000);
}

// 封裝處理錯誤訊息
export function handleErrorMessage(dispatch, error) {
  dispatch({
    type: "POST_MESSAGE",
    payload: {
      type: "danger",
      title: "更新失敗",
      // 判斷錯誤訊息是否為陣列，如果是陣列則用字串 join 串接
      text: Array.isArray(error?.response?.data?.message)
        ? error.response.data.message.join("、")
        : error.response.data.message,
    },
  });
  // 3 秒後清除訊息
  setTimeout(() => {
    dispatch({
      type: "CLEAR_MESSAGE",
    });
  }, 3000);
}

// 要準備三個東西
// MessageContext
// messageReducer
// initState
