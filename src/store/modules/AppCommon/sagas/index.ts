import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {isAppLoadedSelector} from '@store/modules/AppCommon/selectors';
import {fork, put, select, take} from 'redux-saga/effects';

function* isAppInitialized() {
  const isAppLoaded: boolean = yield select(isAppLoadedSelector);
  return isAppLoaded;
}

export function* rootAppCommonSaga() {
  yield fork(function* () {
    while (!(yield* isAppInitialized())) {
      yield take('*');
    }
    yield put(AppCommonActions.APP_INITIALIZED.STATE.create());
  });
}
