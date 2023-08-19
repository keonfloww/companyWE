import {userSlice} from './slices/user.slice';
import {userApi} from './slices/api/userApi.slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';
import {persistCombineReducers, persistStore} from 'redux-persist';

const reducers = {
  userReducer: userSlice.reducer,

  // *** API ***
  userApi: userApi.reducer,
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // There is an issue in the source code of redux-persist (default setTimeout does not cleaning)
  timeout: undefined,
  whitelist: [''],
};

// Setup Reducers
const persistedRootReducer = persistCombineReducers(persistConfig, reducers);

// Create Store
const store = configureStore({
  reducer: persistedRootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat([userApi.middleware]),
});

// Setup Store persistence
const persistor = persistStore(store, null);

export type RootState = ReturnType<typeof persistedRootReducer>;
export {persistor, store};
