import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {},
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
  devTools: true,
});

// export types RootState = ReturnType<typeof store.getState>;
// export types AppDispatch = typeof store.dispatch;
// export types RootState = ReturnType<typeof rootReducer>; // Timur
