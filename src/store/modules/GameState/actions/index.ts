import {createAction} from '@store/utils/actions/createAction';

export type AppStateType =
  | 'active'
  | 'background'
  | 'inactive'
  | 'unknown'
  | 'extension';

const APP_LOADED = createAction('APP_LOADED', {
  STATE: true,
});

const APP_INITIALIZED = createAction('APP_INITIALIZED', {
  STATE: true,
});

const APP_STATE_CHANGE = createAction('APP_STATE_CHANGE', {
  STATE: (appState: AppStateType) => ({appState}),
});

const APP_CLEAR_ROOT = createAction('APP_CLEAR_ROOT', {
  STATE: () => ({}),
});

const UPDATE_SPLASH_VISIBLE_STATE = createAction(
  'UPDATE_SPLASH_VISIBLE_STATE',
  {
    HIDE: true,
  },
);

const API_ERROR_STATUS = createAction('API_ERROR_STATUS', {
  STATE: (apiErrorStatus: number) => ({apiErrorStatus}),
});

const IS_NEED_TO_BE_UPDATED = createAction('IS_NEED_TO_BE_UPDATED', {
  START: () => ({}),
  SUCCESS: ({
    isNeedToBeUpdated,
    appStoreUrl,
  }: {
    isNeedToBeUpdated: boolean;
    appStoreUrl: string;
  }) => ({
    isNeedToBeUpdated,
    appStoreUrl,
  }),
  FAILED: (errorMessage: string) => ({
    errorMessage,
  }),
});

export const AppCommonActions = Object.freeze({
  APP_LOADED,
  APP_INITIALIZED,
  APP_STATE_CHANGE,
  APP_CLEAR_ROOT,
  UPDATE_SPLASH_VISIBLE_STATE,
  API_ERROR_STATUS,
  IS_NEED_TO_BE_UPDATED,
});
