import { all } from 'redux-saga/effects';
import currencies from './currencies';

export default function* rootSaga() {
  yield all([currencies()]);
}
