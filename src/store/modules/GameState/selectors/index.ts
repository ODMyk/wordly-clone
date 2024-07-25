import {RootState} from '@store/rootReducer';

export const statsSelector = (state: RootState) => state.gameState;

export const appStateSelector = (state: RootState) => state.appCommon.appState;
