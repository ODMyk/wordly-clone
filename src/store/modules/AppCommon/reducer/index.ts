import {AppCommonActions, AppStateType} from '@store/modules/AppCommon/actions';
import {produce} from 'immer';

export interface State {
  isAppLoaded: boolean;
  isAppInitialized: boolean;
  appState: AppStateType | null;
  isSplashHidden: boolean;
  mandatoryUpdate: {
    isNeedToBeUpdated: boolean;
    appStoreUrl: string;
  };
  apiErrorStatus: number;
}

type Actions = ReturnType<
  | typeof AppCommonActions.APP_LOADED.STATE.create
  | typeof AppCommonActions.APP_INITIALIZED.STATE.create
  | typeof AppCommonActions.APP_STATE_CHANGE.STATE.create
  | typeof AppCommonActions.UPDATE_SPLASH_VISIBLE_STATE.HIDE.create
  | typeof AppCommonActions.IS_NEED_TO_BE_UPDATED.SUCCESS.create
  | typeof AppCommonActions.IS_NEED_TO_BE_UPDATED.FAILED.create
  | typeof AppCommonActions.API_ERROR_STATUS.STATE.create
>;

const INITIAL_STATE: State = {
  isAppLoaded: false,
  isAppInitialized: false,
  isSplashHidden: false,
  appState: 'active',
  mandatoryUpdate: {
    isNeedToBeUpdated: false,
    appStoreUrl: '',
  },
  apiErrorStatus: 0,
};

export function appCommonReducer(
  state = INITIAL_STATE,
  action: Actions,
): State {
  return produce(state, draft => {
    switch (action.type) {
      case AppCommonActions.APP_LOADED.STATE.type:
        draft.isAppLoaded = true;
        break;
      case AppCommonActions.APP_INITIALIZED.STATE.type:
        draft.isAppInitialized = true;
        break;
      case AppCommonActions.APP_STATE_CHANGE.STATE.type:
        draft.appState = action.payload.appState;
        break;
      case AppCommonActions.UPDATE_SPLASH_VISIBLE_STATE.HIDE.type:
        draft.isSplashHidden = true;
        break;
      case AppCommonActions.IS_NEED_TO_BE_UPDATED.SUCCESS.type:
        const {isNeedToBeUpdated, appStoreUrl} = action.payload;
        draft.mandatoryUpdate.isNeedToBeUpdated = isNeedToBeUpdated;
        draft.mandatoryUpdate.appStoreUrl = appStoreUrl;
        break;
      case AppCommonActions.IS_NEED_TO_BE_UPDATED.FAILED.type:
        console.log(
          'ERROR IN AppCommonActions.IS_NEED_TO_BE_UPDATED',
          action.payload.errorMessage,
        );
        break;
      case AppCommonActions.API_ERROR_STATUS.STATE.type:
        draft.apiErrorStatus = action.payload.apiErrorStatus;
        break;
    }
  });
}
