import {userSlice} from './slices/user.slice';
import {userApi} from './slices/api/userApi.slice';
import {configureStore, createListenerMiddleware} from '@reduxjs/toolkit';
import {persistCombineReducers, persistStore} from 'redux-persist';
import {mailApi} from './slices/api/mailApi.slice';
import {MailApiMiddleware} from './middleware/mailApiMiddleware';
// import {MMKV} from 'react-native-mmkv';
import {persistSlice} from './slices/persist.slice';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the middleware instance and methods
const listenerMiddleware = createListenerMiddleware();

// const storage = new MMKV();

// export const reduxStorage: Storage = {
//   setItem: (key, value) => {
//     storage.set(key, value);
//     return Promise.resolve(true);
//   },
//   getItem: key => {
//     const value = storage.getString(key);
//     return Promise.resolve(value);
//   },
//   removeItem: key => {
//     storage.delete(key);
//     return Promise.resolve();
//   },
// };

const reducers = {
  userReducer: userSlice.reducer,
  persistReducer: persistSlice.reducer,

  // *** API ***
  userApi: userApi.reducer,
  mailApi: mailApi.reducer,
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // storage: reduxStorage,
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
        mailApi.middleware,
      ]),
});

// Setup Store persistence
const persistor = persistStore(store, null);

export type BaseState = ReturnType<typeof persistedRootReducer>;
export {persistor, store};

// Middlewares

MailApiMiddleware.start(listenerMiddleware);
