import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { currency, buy, sale } from 'constants.js';

import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import CachedIcon from '@material-ui/icons/Cached';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
  },
  select: {
    display: 'flex',
  },
  iconWrapper: {
    textAlign: 'center',
  },
  textFields: {
    marginTop: 10,
  },
  bottomBox: {
    marginTop: 40,
    fontSize: 26,
    display: 'flex',
    justifyItems: 'center',
    alignItems: 'center',
  },
}));

const CurrencyConvert = ({ data }) => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    fromCurrency: '',
    toCurrency: '',
    oldAmount: '',
    newAmount: '',
  });

  const isCurrencyExist = () =>
    values.fromCurrency.length && values.toCurrency.length;

  const roundValue = value => Math.round(value * 100000) / 100000;

  const calcCoefficient = () => {
    if (isCurrencyExist()) {
      const indexFrom = data.filter(
        item => item[currency] === values.fromCurrency
      );
      const indexTo = data.filter(item => item[currency] === values.toCurrency);
      return indexFrom[0][buy] / indexTo[0][sale];
    }
    return 1;
  };

  const handleClear = () => {
    setValues({
      ...values,
      oldAmount: '',
      newAmount: '',
    });
  };

  const handleChange = name => event => {
    setValues({
      ...values,
      [name]: event.target.value,
      oldAmount: '',
      newAmount: '',
    });
  };

  const changeCurrencyPlace = () => {
    const to = values.toCurrency;
    const from = values.fromCurrency;
    setValues({
      ...values,
      toCurrency: from,
      fromCurrency: to,
      oldAmount: '',
      newAmount: '',
    });
  };

  const handleChangeInput = name => event => {
    if (name === 'oldAmount') {
      setValues({
        ...values,
        oldAmount: event.target.value,
        newAmount: event.target.value * calcCoefficient(),
      });
    } else if (name === 'newAmount') {
      setValues({
        ...values,
        oldAmount: event.target.value / calcCoefficient(),
        newAmount: event.target.value,
      });
    }
  };
  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Grid
        container
        className={classes.select}
        alignItems="center"
        justify="space-between"
      >
        <Grid item xs={5}>
          <TextField
            id="outlined-select-currency-from"
            select
            label="From"
            value={values.fromCurrency}
            onChange={handleChange('fromCurrency')}
            helperText="Please select your currency"
            margin="normal"
            variant="outlined"
            fullWidth
          >
            {data.map(option => (
              <MenuItem key={option[currency]} value={option[currency]}>
                {option[currency]}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={2} className={classes.iconWrapper}>
          <IconButton
            edge={false}
            color="inherit"
            aria-label="Open drawer"
            onClick={changeCurrencyPlace}
            disabled={values.fromCurrency === '' || values.toCurrency === ''}
          >
            <CachedIcon />
          </IconButton>
        </Grid>

        <Grid item xs={5}>
          <TextField
            id="outlined-select-currency-to"
            select
            label="To"
            value={values.toCurrency}
            onChange={handleChange('toCurrency')}
            helperText="Please select your currency"
            margin="normal"
            variant="outlined"
            fullWidth
          >
            {data.map(option => (
              <MenuItem key={option[currency]} value={option[currency]}>
                {option[currency]}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={5}>
          <TextField
            id="outlined-adornment-oldAmount"
            type="number"
            variant="outlined"
            label="Old Value"
            fullWidth
            value={
              values.oldAmount.length || values.newAmount.length
                ? roundValue(values.oldAmount)
                : ''
            }
            className={classes.textFields}
            onChange={handleChangeInput('oldAmount')}
            InputProps={{
              endAdornment: values.toCurrency && (
                <InputAdornment position="end">
                  {values.fromCurrency}
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={2} className={classes.iconWrapper}>
          <IconButton
            edge={false}
            color="inherit"
            aria-label="Open drawer"
            onClick={handleClear}
            disabled={values.oldAmount === '' || values.newAmount === ''}
          >
            <HighlightOffIcon />
          </IconButton>
        </Grid>

        <Grid item xs={5}>
          <TextField
            id="outlined-adornment-amount"
            type="number"
            variant="outlined"
            label="New Value"
            value={
              values.oldAmount.length || values.newAmount.length
                ? roundValue(values.newAmount)
                : ''
            }
            className={classes.textFields}
            onChange={handleChangeInput('newAmount')}
            fullWidth
            InputProps={{
              endAdornment: values.toCurrency && (
                <InputAdornment position="end">
                  {values.toCurrency}
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>

      <div className={classes.bottomBox}>
        {isCurrencyExist() &&
        values.toCurrency.length !== 0 &&
        values.fromCurrency.length !== 0
          ? `Exchange Rate: 1 ${values.fromCurrency} = 
          ${roundValue(calcCoefficient())} ${values.toCurrency}`
          : ''}
      </div>
    </form>
  );
};

CurrencyConvert.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  data: state.currenciesFavorites.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyConvert);
