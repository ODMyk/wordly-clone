import {combineReducers} from 'redux';
import {gameStateReducer} from './modules/GameState/reducer';
import {appCommonReducer} from './modules/AppCommon/reducer';

export const rootReducer = combineReducers({
  appCommon: appCommonReducer,
  gameState: gameStateReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
