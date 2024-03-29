import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore, createListenerMiddleware} from '@reduxjs/toolkit';
import {persistCombineReducers, persistStore} from 'redux-persist';
import {userApi} from './slices/api/userApi.slice';
import {persistSlice} from './slices/persist.slice';
import {userSlice} from './slices/user.slice';

// Create the middleware instance and methods
const listenerMiddleware = createListenerMiddleware();

const reducers = {
  userReducer: userSlice.reducer,
  persistReducer: persistSlice.reducer,

  // *** API ***
  userApi: userApi.reducer,
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // There is an issue in the source code of redux-persist (default setTimeout does not cleaning)
  timeout: undefined,
  whitelist: ['userReducer', 'persistReducer'],
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
    })
      .prepend(listenerMiddleware.middleware)
      .concat([
        userApi.middleware,
        //
      ]),
});

// Setup Store persistence
const persistor = persistStore(store, null);

export type BaseState = ReturnType<typeof persistedRootReducer>;
export {persistor, store};

// Middlewares

// MailApiMiddleware.start(listenerMiddleware);
