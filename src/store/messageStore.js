import { createContext } from "react"; // 引入 createContext 來建立 context

// useContext 跨元件傳遞
export const MessageContext = createContext(); // 建立 context

// 初始化狀態
export const initState = {
  type: "",
  title: "",
  text: "",
};

// Reducer 建立訊息及刪除訊息
export const messageReducer = (state, action) => {
  switch (action.type) {
    case "POST_MESSAGE":
      return {
        type: "danger", // success, danger, warning, info
        title: "成功 reducer",
        text: "這是一個成功的訊息",
      };
    case "CLEAR_MESSAGE":
      return {
        ...initState,
      };
    default:
      return state;
  }
};
