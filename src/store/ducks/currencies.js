import { createAction, handleActions } from 'redux-actions';

// Action creators
export const currencyRequest = createAction('CURRENCY_REQUEST');
export const currencySuccess = createAction('CURRENCY_SUCCESS');
export const currencyFailure = createAction('CURRENCY_FAILURE');

// Reducer

const defaultState = {
  loading: false,
  completed: false,
  errors: false,
};

export default handleActions(
  {
    [currencyRequest]: state => ({
      ...state,
      loading: true,
      completed: false,
      errors: false,
    }),
    [currencySuccess]: state => ({
      ...state,
      loading: false,
      completed: true,
      errors: false,
    }),
    [currencyFailure]: state => ({
      ...state,
      loading: false,
      completed: false,
      errors: true,
    }),
  },
  defaultState
);
