import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    paperimage:{
        display: 'flex',  justifyContent:'center', alignItems:'center',
        width:"100%"
    },
    paperTypo:{
     
        textAlign:"center",
        fontWeight:'700',
        
        fontSize:16
    },
    paperTypoNumber:{
        textAlign:"center",
        fontWeight:'700',
        fontSize:14
    },
    mainGrid:{
        width:"100%",padding:20
    },
    paperstyle:{
        display: 'flex',  justifyContent:'center', alignItems:'center',alignContent:"center",
        padding:20
    },
    rootMain:{
        backgroundColor: theme.palette.background.paper,

        width: "70%",
        position: "fixed",
        left: "60%",
        marginLeft: "-37.5%",
        minHeight:"50%",
        height:"100%",
        overflowY:'scroll',
        overflow: "auto",
      },
 
    root: {
      display: 'flex',
      marginBottom:100,
      justifyContent:"center"
    },
    table:{
      minWidth: 700
    },
    rootpaper: {
      display: 'flex',
      width: "100%",
      overflowX: "scroll",
      overflow:"auto"
    },
  }));

  export default useStyles