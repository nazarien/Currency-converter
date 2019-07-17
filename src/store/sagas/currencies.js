import { takeLatest, put, call } from 'redux-saga/effects';
import { currencySuccess, currencyFailure } from 'store/ducks/currencies';
import axios from 'services/axiosInterceptors';

const api = 'pubinfo?exchange&json&coursid=11';

const getCurrenciesApi = () => {
  return axios({
    method: 'GET',
    url: api,
  });
};

function* worker() {
  // { payload }
  try {
    const response = yield call(getCurrenciesApi);
    yield put(currencySuccess(response.data));
  } catch (errors) {
    yield put(currencyFailure());
  }
}

export default function* watcher() {
  yield takeLatest('CURRENCY_REQUEST', worker);
}
