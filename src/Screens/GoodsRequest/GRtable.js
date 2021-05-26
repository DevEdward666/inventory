import React,{useState,useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Button, FormControl, Icon, Paper, TextField } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import useStyles from './style'
import {useTheme} from '@material-ui/core/styles'
import TableFooter from '@material-ui/core/TableFooter';
import { useDispatch, useSelector } from 'react-redux';
import CustomModal from '../../Plugin/Modal/CustomModal';
import {action_set_openmodal,action_set_qtyopenmodal} from '../../Services/Actions/Inventory_Actions'
import {set_sncakbar} from '../../Services/Actions/Defaults_Actions'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';
import CloseIcon from '@material-ui/icons/Close';
import {action_set_requesteddtls,action_set_requestedheader} from '../../Services/Actions/Inventory_Actions'
import GRFooter from './GRFooter'
import useKeypress from '../../Hooks/useKeyPress';
const GRtable = props => {
    const classes = useStyles();
    const dispatch =useDispatch()
    const office = useSelector((state) => state.Inventory_Reducers.office);
    const selected = useSelector((state) => state.Inventory_Reducers.selected);
    const user_info = useSelector((state) => state.DefaultReducers.user_info);
    const singlerequestdetails = useSelector((state) => state.Inventory_Reducers.singlerequestdetails);
    const requestinfo = useSelector((state) => state.Inventory_Reducers.requestinfo);

    const [ActionsHide, setActionsHide] = useState("visible");
    const [arrayitem, setarrayitem] = useState([]);
       
    const [listarrayitem, setlistarrayitem] = useState([]);
    const [saverchildarrayitem, setsaverchildarrayitem] = useState([]);

    const [itemqty, setitemqty] = useState("");
    const [itemremarks, setitemremarks] = useState("");
    const [hideactions, sethideactions] = useState(false);
    const [select, setSelected] = React.useState([]);
    const isOpen = useSelector((state) => state.Inventory_Reducers.isOpen);
    const QtyOpen = useSelector((state) => state.Inventory_Reducers.QtyOpen);
    const noninventory = useSelector((state) => state.Inventory_Reducers.noninventory);
    const isSelected = (name) => select.indexOf(name) !== -1;

 const handleClose=useCallback(async()=>{
    dispatch(action_set_openmodal(false));
 },[dispatch])


 useEffect(()=>{
  let mounted=true
  const checkifrequestshow=async()=>{
    if (mounted){
     if(singlerequestdetails?.loading && requestinfo?.data?.reqno!==undefined){


      singlerequestdetails?.data.map((item)=>{
        sethideactions(true)
       return setarrayitem([{

        stockcode: item?.stockcode,
        stockdesc: item?.stockdesc,
        reqqty: item?.reqqty,
        unitdesc: item?.unitdesc,
        itemremarks:item?.itemremarks,
       }])
      })
      }else{
        sethideactions(false)
      }
    console.log(singlerequestdetails)
  }
}
mounted && checkifrequestshow();
return()=>{mounted=false}
},[dispatch, requestinfo?.data?.reqno, singlerequestdetails])
    const handleAddQty =useCallback(async()=>{
        await  dispatch(action_set_qtyopenmodal(false));
        let found=false
        if (arrayitem.length <= 0) {
            await setarrayitem((prevArray) => [
                ...prevArray,
                {
                  lineno: arrayitem.length + 1,
                  linestatus: "O",
                  deptcode: user_info?.deptcode,
                  sectioncode: "",
                  todept: office,
                  tosection:'',
                  stockcode: listarrayitem[0]?.stockcode,
                  stockdesc: listarrayitem[0]?.stockdesc,
                  reqqty: itemqty,
                  unitdesc: listarrayitem[0]?.unitdesc,
                  itemremarks:itemremarks,
                },
              ]);
         
            }else{
           await arrayitem.map(async (item) => {
            if (item?.stockcode === listarrayitem[0]?.stockcode) {
              return (found = true);
            }
          });
          if (found) {
            dispatch(set_sncakbar(true,"Already Exist","error"))
   
          } else {
       

            await setarrayitem((prevArray) => [
              ...prevArray,
              {
                lineno: arrayitem.length + 1,
                linestatus: "O",
                deptcode: user_info?.deptcode,
                sectioncode: "",
                todept: office,
                tosection:'',
                stockcode: listarrayitem[0]?.stockcode,
                stockdesc: listarrayitem[0]?.stockdesc,
                reqqty: itemqty,
                unitdesc: listarrayitem[0]?.unitdesc,
                itemremarks:itemremarks,
              },
            ]);
       
      
           
          }
        }
        await setlistarrayitem([]);
        
    },[arrayitem, dispatch, itemqty, itemremarks, listarrayitem, office, user_info?.deptcode])
useEffect(()=>{
    dispatch(action_set_requesteddtls(arrayitem))
},[arrayitem, dispatch])
      const handleClickItem = useCallback(async(selecteitem)=>{
        let newSelected = [];
          let mounted=true
        
            if(mounted){
                  dispatch(action_set_qtyopenmodal(true));
                  await  setlistarrayitem((prevArray) => [
                    ...prevArray,{stockcode: selecteitem?.stockcode,  stockdesc: selecteitem?.stockdesc,  unitdesc: selecteitem?.unitdesc},
                ]);
              
            }
        await  dispatch(action_set_openmodal(false));
    },[dispatch])
    const TablePaginationActions =(props) =>{
        const classes = useStyles();
        const theme = useTheme();
        const { count, page, rowsPerPage, onChangePage } = props;
      
        const handleFirstPageButtonClick = (event) => {
          onChangePage(event, 0);
        };
      
        const handleBackButtonClick = (event) => {
          onChangePage(event, page - 1);
        };
      
        const handleNextButtonClick = (event) => {
          onChangePage(event, page + 1);
        };
      
        const handleLastPageButtonClick = (event) => {
          onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
        };

        return (
            <div>
              <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
              >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
              </IconButton>
              <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              </IconButton>
              <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
              >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </IconButton>
              <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
              >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
              </IconButton>
            </div>
          );
        }
        
        TablePaginationActions.propTypes = {
          count: PropTypes.number.isRequired,
          onChangePage: PropTypes.func.isRequired,
          page: PropTypes.number.isRequired,
          rowsPerPage: PropTypes.number.isRequired,
        };
   
        const columns = [
            { id: 'reqno', label: 'Code', minWidth: 170,  align: 'left', },
            { id: 'deptname', label: 'Description', minWidth: 170,  align: 'left', },
            {
              id: 'pack',
              label: 'Pack',
              minWidth: 170,
              align: 'left',
            },
            {
              id: 'unit',
              label: 'Unit',
              minWidth: 170,
              align: 'left',
            },
           
          ];
    
          const createData = ( stockcode, stockdesc, unitdesc, pakcdesc) =>{
            return { stockcode, stockdesc, unitdesc, pakcdesc};
          }
          const rows = noninventory?.data?.map((row) =>
          createData(
            row.stockcode,
            row.stockdesc,
            row.unitdesc,
            row.pakcdesc
          )
        );
        const [page, setPage] = React.useState(0);
        const [rowsPerPage, setRowsPerPage] = React.useState(5);
      
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows?.length - page * rowsPerPage);
      
        const handleChangePage = (event, newPage) => {
          setPage(newPage);
        };
      
        const handleChangeRowsPerPage = (event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        };
  
        useKeypress('Escape', () => {
          dispatch(action_set_qtyopenmodal(false))
          dispatch(action_set_openmodal(false))
        });
        const handleSetItemnQty=(e)=>{
          const re = /^[0-9\b]+$/; 
          if (e.target.value === '' || re.test(e.target.value)) {
          setitemqty(e.target.value)
          }
        }
    return (
        <div>
        <CustomModal
            opens={QtyOpen}
            UI={
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',marginTop:50}}>
                <Paper  style={{ minWidth:"20%"}}>
                <CardContent style={{ padding: 50 }}>
                <Grid item xs={12} className={classes.GridStyle}>
        <FormControl variant="filled" className={classes.formControl}>
        <TextField
          fullWidth={true}
            onChange={(e)=> handleSetItemnQty(e)}
          id="outlined-required"
          label="Item Qty"
          defaultValue={itemqty}
          value={itemqty}
          variant="outlined"
        />
           </FormControl>
        </Grid>
        <Grid item xs={12} className={classes.GridStyle}>
        <FormControl variant="filled" className={classes.formControl}>
        <TextField
          fullWidth={true}
          onChange={(e)=>setitemremarks(e.target.value)}
          id="outlined-required"
          label="Item Remarks"
          defaultValue={itemremarks}
          value={itemremarks}
          variant="outlined"
        />
           </FormControl>
        </Grid>
        <Button   variant="contained" color="primary" onClick={()=>handleAddQty()}>
           Add Item
        </Button> 
        </CardContent>
        </Paper>
        </div>
            }/>
           <CustomModal
            opens={isOpen}
            UI={
                <div>
                  
               <CardContent style={{ padding: 50 }}>
               <Paper className={classes.paperclose} > 
               <div  style={{display: 'flex',  justifyContent:'flex-end', alignItems:'flex-end'}} >
               <IconButton   variant="contained" color="secondary" onClick={()=>handleClose()}>
        <CloseIcon/>
        </IconButton>    
        </div>  
        </Paper>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="custom pagination table">
                <TableHead>
                  <TableRow>
                  {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
                  </TableRow>
                </TableHead>
                <TableBody>

                  {(rowsPerPage > 0
            ? rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row, index) => (
        
                    <TableRow key={index} onClick={()=>handleClickItem(row)}>
                      <TableCell style={{ width: "10%" }} align="left">{row?.stockcode}</TableCell>
                      <TableCell style={{ width: "50%" }} align="left">{row?.stockdesc}</TableCell>
                      <TableCell style={{ width: "20%" }} align="left">{row?.packdesc}</TableCell>
                      <TableCell style={{ width: "50%" }} align="left">{row?.unitdesc}</TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
              </Table>
            </TableContainer>
           
          </CardContent>
                </div>
            }
        />
        <CardContent style={{ padding: 50 }}>
            <Grid
              container
              direction="row"
              spacing={3}
              justify="space-evenly"
              alignItems="baseline"
            ></Grid>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell>Code</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Unit</TableCell>
                    <TableCell>Requested Qty</TableCell>
                    <TableCell>Issue Qty</TableCell>
                    <TableCell>Remarks</TableCell>
                    {hideactions? null: 
                    <TableCell style={{ visibility: { ActionsHide } }}>
                      Actions
                    </TableCell>
                    }
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* item.itemcode, item.itemdesc, item.unitdesc, item.totalqty,
                  item.itemqty, item.requestedqty, item.unitprice, "",
                  item.specs */}

                  {arrayitem.map((row, index) => (
                    <TableRow key={row.stockcode}>
                      <TableCell>{row.stockcode}</TableCell>
                      <TableCell>{row.stockdesc}</TableCell>
                      <TableCell>{row.unitdesc}</TableCell>
                      <TableCell>{row.reqqty}</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>{row.itemremarks}</TableCell>
                    {hideactions? null:     <TableCell>
                        <IconButton
                          aria-label="delete"
                          className={classes.margin}
                          onClick={() => {
                            const _itemState = arrayitem.filter(
                              (_item, _index) => _index !== index
                            );
                            const _itemState3 = saverchildarrayitem.filter(
                              (_item, _index) =>
                                _item.stockcode !== row.stockcode
                       
                            );

                            setsaverchildarrayitem(_itemState3);

                            setarrayitem(_itemState);
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>}
                 
                    </TableRow>
                  ))}
                 
                 
                </TableBody>
              </Table>
            </TableContainer>
        
          </CardContent>
                          <GRFooter/>
        </div>
    );
};

GRtable.propTypes = {
    
};

export default GRtable;