import {userSlice} from './slices/user.slice';
import {userApi} from './slices/api/userApi.slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore, createListenerMiddleware} from '@reduxjs/toolkit';
import {persistCombineReducers, persistStore} from 'redux-persist';
import {mailApi} from './slices/api/mailApi.slice';
import {MailApiMiddleware} from './middleware/mailApiMiddleware';
import {mailSlice} from './slices/mail.slice';

// Create the middleware instance and methods
const listenerMiddleware = createListenerMiddleware();

const reducers = {
  userReducer: userSlice.reducer,
  mailReducer: mailSlice.reducer,

  // *** API ***
  userApi: userApi.reducer,
  mailApi: mailApi.reducer,
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
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
