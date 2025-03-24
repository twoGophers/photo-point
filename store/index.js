import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import searchReducer from './slices/searchSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    search: searchReducer,
  },
});

export default store;
