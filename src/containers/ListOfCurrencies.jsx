import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import clsx from 'clsx';

// const
import { currency, buy, sale } from 'constants.js';

// actions
import { makeCurrencyFavorite } from 'store/ducks/currenciesFavorites';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  text: {
    display: 'flex',
    width: '33%',
  },
  textHeader: {
    color: '#5e35b1',
  },
  icon: {
    color: 'transparent',
  },
}));

const ListOfCurrencies = ({ data, makeCurrencyFavorite }) => {
  const classes = useStyles();

  const itemOfCurrency =
    data.length !== 0 &&
    data.map(item => (
      <List
        component="div"
        className={classes.root}
        aria-label="currencies"
        key={item[currency]}
      >
        <ListItem
          button
          onClick={() => makeCurrencyFavorite(item[currency])}
          disableRipple
        >
          <ListItemText primary={item[currency]} className={classes.text} />
          <ListItemText primary={item[buy]} className={classes.text} />
          <ListItemText primary={item[sale]} className={classes.text} />
          <ListItemIcon>
            <StarIcon className={item.favorite ? '' : classes.icon} />
          </ListItemIcon>
        </ListItem>
      </List>
    ));
  return (
    <React.Fragment>
      <List component="div" className={classes.root} aria-label="currencies">
        <ListItem>
          <ListItemText
            primary="Currency"
            className={clsx(classes.text, classes.textHeader)}
          />
          <ListItemText
            primary="Buy"
            className={clsx(classes.text, classes.textHeader)}
          />
          <ListItemText
            primary="Sale"
            className={clsx(classes.text, classes.textHeader)}
          />
          <ListItemIcon>
            <StarIcon className={classes.icon} />
          </ListItemIcon>
        </ListItem>
      </List>
      {itemOfCurrency}
    </React.Fragment>
  );
};

ListOfCurrencies.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  makeCurrencyFavorite: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  data: state.currenciesFavorites.data,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      makeCurrencyFavorite,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListOfCurrencies);
