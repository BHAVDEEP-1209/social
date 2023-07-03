import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser : {
    displayName : "",
    uid : "",
    photoURL : "",
    email : ""
  },
  isLoggedIn : false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setValue : (state,action)=>{
      console.log(action.payload.displayName);
        state.currentUser.displayName = action.payload.displayName;
        state.currentUser.uid = action.payload.uid;
        state.currentUser.photoURL = action.payload.photoURL;
        state.isLoggedIn = true;
        state.currentUser.email = action.payload.email; 
    },
    handleLogOut : (state)=>{
        state.currentUser = {};
        state.isLoggedIn = false;
    }
  },
})

export const { setValue , handleLogOut} = userSlice.actions

export default userSlice.reducer