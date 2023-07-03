import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  chatUser : {
  },
  chatId : ""
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatValue : (state,action)=>{
        console.log("asda",action.payload);
        state.chatUser = action.payload.user;
        state.chatId = action.payload.combinedId;
    },
    handleChatLogOut : (state)=>{
      state.chatId = "";
      state.chatUser = {};
    }  
  },
})

export const {setChatValue , handleChatLogOut} = chatSlice.actions

export default chatSlice.reducer