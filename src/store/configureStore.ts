import {configureStore, Reducer} from '@reduxjs/toolkit';
import {asyncReduxStorage} from '@services/mmkv';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

import {rootReducer} from './rootReducer';

const persistConfig = {
  key: 'root',
  storage: asyncReduxStorage,
  whitelist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export const configuredStore = {
  store,
  persistor,
};
