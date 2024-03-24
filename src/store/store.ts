import { configureStore } from '@reduxjs/toolkit';
import logosReducer from './slices/logoReducer';

export const store = configureStore({
  reducer: {
    logos: logosReducer,
  },
});

export type state = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
