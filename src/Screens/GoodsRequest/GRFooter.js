import React,{useState,useCallback} from 'react';
import PropTypes from 'prop-types';
import { CardContent, TextField } from '@material-ui/core';
import {action_set_requestedfooter} from '../../Services/Actions/Inventory_Actions'
import { useDispatch,useSelector } from 'react-redux';
const GRFooter = () => {
    const dispatch =useDispatch()
    
    const reqremarks = useSelector((state) => state.Inventory_Reducers.requestfooter);
    const handleReqremarks=useCallback(async(e)=>{
        dispatch(action_set_requestedfooter(e.target.value))
      },[dispatch])

    return (
        <div>
        <CardContent style={{ padding: 50,width:"100%" }}>
          <TextField
          onChange={(e)=>handleReqremarks(e)}
          style={{width:"100%"}}
          id="outlined-multiline-static"
          label="Request Remarks"
          multiline
          rows={4}
          value={reqremarks}
          variant="outlined"
        />
        </CardContent>
        </div>
    );
};

GRFooter.propTypes = {
    
};

export default GRFooter;