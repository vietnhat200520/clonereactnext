import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Sử dụng localStorage làm nơi lưu trữ
import authReducer from './slices/authSlice';
import categoryReducer from './slices/categorySlice';
import courseReducer from './slices/courseSlice';

const rootReducer = combineReducers({
  auth: authReducer,     // Sẽ được lưu giữ khi F5
  category: categoryReducer,
  course: courseReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // CHỈ lưu slice auth để giữ trạng thái đăng nhập
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;