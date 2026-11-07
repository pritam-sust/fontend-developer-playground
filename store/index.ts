import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './slices/modalSlice';
import alertReducer from './slices/alertSlice';
import announcementReducer from './slices/announcementSlice';
import discountReducer from './slices/discountSlice';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    alert: alertReducer,
    announcement: announcementReducer,
    discount: discountReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

