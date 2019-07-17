import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BarChartIcon from '@material-ui/icons/BarChart';
import AutorenewIcon from '@material-ui/icons/Autorenew';

const MainListItems = ({ handleChangePage }) => (
  <div>
    <ListItem button onClick={() => handleChangePage('currency-convert')}>
      <ListItemIcon>
        <AutorenewIcon />
      </ListItemIcon>
      <ListItemText primary="Currency converter" />
    </ListItem>
    <ListItem button onClick={() => handleChangePage('list-of-currencies')}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="List of currencies" />
    </ListItem>
  </div>
);

export default MainListItems;
