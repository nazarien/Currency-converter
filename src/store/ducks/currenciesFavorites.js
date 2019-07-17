import { createAction, handleActions } from 'redux-actions';

// const
import { currency } from '../../constants';

// Action creators
import { currencySuccess } from './currencies';

export const makeCurrencyFavorite = createAction('CURRENCY_FAVORITE');

const defaultState = {
  data: [],
};

export default handleActions(
  {
    [currencySuccess]: (state, action) => ({
      ...state,
      data: action.payload.map(item => ({
        ...item,
        favorite: false,
      })),
    }),
    [makeCurrencyFavorite]: (state, action) => ({
      ...state,
      data: state.data
        .map(item => {
          return item[currency] === action.payload
            ? { ...item, favorite: !item.favorite }
            : item;
        })
        .sort((a, b) => b.favorite - a.favorite),
    }),
  },
  defaultState
);
