import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import DashboardHead from './DashboardHead'

import useStyles from './style';
import { Container, Grid } from '@material-ui/core';
import { useDispatch,useSelector } from 'react-redux';
import {action_GET_dashboardnumber} from '../../Services/Actions/Inventory_Actions'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily:   'Cambria'
   
  },});
const Dashboard = props => {
    const classes=useStyles
    const dispatch=useDispatch()
    const user_info = useSelector((state) => state.DefaultReducers.user_info);
    useEffect(()=>{
        dispatch(action_GET_dashboardnumber(user_info?.deptcode))
    },[dispatch, user_info?.deptcode])
    return (
        <Container maxWidth="sm">
        <ThemeProvider theme={theme}>
      
        <DashboardHead/>
        </ThemeProvider>
        </Container>
        
    );
};

Dashboard.propTypes = {
    
};

export default Dashboard;