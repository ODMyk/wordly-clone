import {combineReducers} from '@reduxjs/toolkit';
import {appCommonReducer} from './modules/AppCommon/reducer';

export const rootReducer = combineReducers({
  appCommon: appCommonReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
