import {RootState} from '@store/rootReducer';

export const isAppLoadedSelector = (state: RootState) =>
  state.appCommon.isAppLoaded;

export const isAppInitializedSelector = (state: RootState) =>
  state.appCommon.isAppInitialized;

export const isAppActiveSelector = (state: RootState) =>
  state.appCommon.appState === 'active';

export const appStateSelector = (state: RootState) => state.appCommon.appState;

export const isSplashHiddenSelector = (state: RootState) =>
  state.appCommon.isSplashHidden;

export const isNeedToBeUpdatedSelector = (state: RootState) =>
  state.appCommon.mandatoryUpdate.isNeedToBeUpdated;

export const appStoreUrlSelector = (state: RootState) =>
  state.appCommon.mandatoryUpdate.appStoreUrl;

export const apiErrorStatusSelector = (state: RootState) =>
  state.appCommon.apiErrorStatus;
