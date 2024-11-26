import { configureStore } from "@reduxjs/toolkit";
import api from "/src/store/api.js";

// TODO: configure the store to use the API slice's auto-generated reducer and custom middleware.
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;

