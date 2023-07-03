import { configureStore , combineReducers } from '@reduxjs/toolkit'
import userReducer from "../slices/userSlice.js"
import chatReducer from "../slices/chatSlice.js"
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
  }
const rootReducer = combineReducers({user:userReducer,chat:chatReducer})
const persistedReducer = persistReducer(persistConfig,rootReducer )
export const store = configureStore({
    reducer: persistedReducer,
})

export const persistor = persistStore(store)






