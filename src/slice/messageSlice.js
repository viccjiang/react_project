import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
  name: "message",
  initialState: [],
  reducers: {
    createMessage(state, action) {
      // 加入成功訊息
      state.push({
        id: action.payload.id,
        type: "success",
        title: "成功",
        text: action.payload.message,
      });
    },
    removeMessage(state, action) {
      const index = state.findIndex((item) => item === action.payload);
      state.splice(index, 1);
    },
  },
});

// createAsyncThunk 是一個用來處理非同步行為的函式
// 這裡建立的方法可以被其他的原件使用，並且可以透過 dispatch 來觸發
export const createMessageAsync = createAsyncThunk(
  // 可傳兩個參數 1.自訂義名稱 2.async function
  "message/createMessageAsync",
  async (payload, { dispatch, requestId }) => {
    dispatch(messageSlice.actions.createMessage({ ...payload, id: requestId }));
    setTimeout(() => {
      dispatch(messageSlice.actions.removeMessage(requestId));
    }, 2000);
  }
);

export const { createMessage } = messageSlice.actions;

export default messageSlice.reducer;
