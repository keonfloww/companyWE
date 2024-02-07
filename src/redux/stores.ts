import {userSlice} from './slices/user.slice';
import {userApi} from './slices/api/userApi.slice';
import {configureStore, createListenerMiddleware} from '@reduxjs/toolkit';
import {Storage, persistCombineReducers, persistStore} from 'redux-persist';
import {mailApi} from './slices/api/mailApi.slice';
import {MailApiMiddleware} from './middleware/mailApiMiddleware';
import {mailSlice} from './slices/mail.slice';
import {MMKV} from 'react-native-mmkv';

// Create the middleware instance and methods
const listenerMiddleware = createListenerMiddleware();

const storage = new MMKV();

export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};

const reducers = {
  userReducer: userSlice.reducer,
  mailReducer: mailSlice.reducer,

  // *** API ***
  userApi: userApi.reducer,
  mailApi: mailApi.reducer,
};

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  // There is an issue in the source code of redux-persist (default setTimeout does not cleaning)
  timeout: undefined,
  whitelist: ['userReducer', 'mailReducer'],
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
