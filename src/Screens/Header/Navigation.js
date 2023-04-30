import {
  Badge,
  CardContent,
  Container,
  CssBaseline,
  Divider,
  Grid,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
  Tooltip,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import useStyles from "../Header/Navstyle";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import MoreIcon from "@material-ui/icons/MoreVert";
import NotificationsIcon from "@material-ui/icons/Notifications";
import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useSound from "use-sound";
import ringtone from "../../Assets/ringtone/calling_you.mp3";
import "../../Plugin/Modal/custommodalcss.css";
import {
  action_GET_defaultlogo,
  action_GET_defaultname,
  signalr_connection_notify,
  action_GET_getuserinfo,
  set_global_sncakbar,
  action_GET_noticationsby_dept,
  action_GET_getUserPermission,
  action_GET_getUserPermission_Cancel,
  set_permissions,
} from "../../Services/Actions/Defaults_Actions";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
// import { notifycalling } from "../../Services/Actions/SignalRActions";
// import CustomModal from "../Plugin/Modal/CustomModal";
import CustomDrawer from "./CustomDrawer/CustomDrawer";
import SimpleSnackbar from "../../Plugin/SimpleSnackbar";
import CustomList from "../../Plugin/List/CustomList";
import CustomModal from "../../Plugin/Modal/CustomModal";
import useKeypress from "../../Hooks/useKeyPress";
const Navigation = () => {
  const [info, setInfo] = useState([]);
  const [isLoggedin, setisLoggedin] = useState("Login");
  const [ishide, setishide] = useState(false);
  // const [approve, setapprove] = useState(false);
  // const [cancel, setcancel] = useState(false);
  const [notify, setnotify] = useState("");
  const [offset, setoffset] = useState(50);
  const [IsRunning, setIsRunning] = useState(true);
  const dispatch = useDispatch();
  const name = useSelector((state) => state.DefaultReducers.name);
  const logo = useSelector((state) => state.DefaultReducers.logo);
  const base_url = useSelector((state) => state.DefaultReducers.base_url);
  const [play] = useSound(ringtone, { volume: 0.2 });
  const hubconnectnotify = useSelector(
    (state) => state.DefaultReducers.hubconnectnotify
  );
  const calling = useSelector((state) => state.SignalRReducers.calling);
  const username = window.localStorage.getItem("username");
  const user_info = useSelector((state) => state.DefaultReducers.user_info);
  const globalsnackbar = useSelector(
    (state) => state.DefaultReducers.globalsnackbar
  );
  const notificationlistbydept = useSelector(
    (state) => state.DefaultReducers.notificationlistbydept
  );
  const getpermissions = useSelector(
    (state) => state.DefaultReducers.user_permission
  );
  const getpermissions_cancel = useSelector(
    (state) => state.DefaultReducers.user_permission_cancel
  );

  var link = document.querySelector("link[rel~='icon']");
  var title = document.querySelector("title[rel~='title']");
if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.getElementsByTagName('head')[0].appendChild(link);
}
link.href=logo;


  const permissions = useSelector((state) => state.DefaultReducers.permissions);
  useEffect(() => {
    let mounted = true;
    const index = async () => {
      if (mounted) {
        let approve = false;
        let cancel = false;
        dispatch(signalr_connection_notify());
        dispatch(action_GET_defaultname());
        dispatch(action_GET_defaultlogo());
        dispatch(action_GET_getuserinfo(username));
        dispatch(action_GET_getUserPermission(username));
        dispatch(action_GET_getUserPermission_Cancel(username));
        if (user_info?.deptcode !== "") {
          dispatch(action_GET_noticationsby_dept(user_info?.deptcode, offset));
        }

        if (getpermissions?.logid === "approve") {
          approve = true;
        }
        if (getpermissions_cancel?.logid === "cancel") {
          cancel = true;
        }
        dispatch(set_permissions(approve, cancel));
      }
    };
    mounted && index();
    return () => {
      mounted = false;
    };
  }, [
    dispatch,
    offset,
    user_info?.deptcode,
    username,
    getpermissions_cancel?.logid,
  ]);
  useEffect(() => {
    let mounted = true;
    const createHubConnection = async () => {
      try {
        hubconnectnotify.on("notifytoreact", async (data) => {
          await setnotify({
            Notification: data.notification,
            from: data.from,
            to: data.to,
          });
          if (user_info?.deptcode === data.to || data.to === "all") {
            dispatch(set_global_sncakbar(true, data.notification, data.type));
            dispatch(
              action_GET_noticationsby_dept(user_info?.deptcode, offset)
            );
          }
        });
      } catch (err) {
        // alert(err);
        // console.log(err);
        console.log("Error while establishing connection: " + { err });
      }
    };
    mounted && createHubConnection();
    return () => (mounted = false);
  }, [
    IsRunning,
    calling,
    dispatch,
    hubconnectnotify,
    offset,
    play,
    user_info?.deptcode,
  ]);
  const currenturl = window.location.href;

  const auth = window.localStorage.getItem("inventory_token");

  const logout = () => {
    window.localStorage.removeItem("inventory_token");
    window.localStorage.removeItem("username");
    window.location.href = "/Login";
  };

  useEffect(() => {
    let mounted = true;

    const isLoggedin = () => {
      if (mounted) {
        if (auth) {
          setisLoggedin("Logout");
          if (currenturl === `${process.env.REACT_APP_URL}`) {
            setishide(true);
          } else {
            setishide(false);
          }
        } else {
          window.location.href = "/Login";
        }
      }
    };
    mounted && isLoggedin();
    return () => {
      mounted = false;
    };
  }, [auth, currenturl]);
  const handleClose = useCallback(() => {
    dispatch(set_global_sncakbar(false, "", ""));
  }, [dispatch]);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [NotificationsAnchorEl, setNotificationsAnchorEl] =
    React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [NotificationsMobileAnchorEl, setNotificationsMobileAnchorEl] =
    React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMenuNotificationsOpen = Boolean(NotificationsAnchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isMobileNotificationsOpen = Boolean(NotificationsMobileAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleNotificationsOpen = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };
  const history = useHistory();

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMobileNotificationClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleNotificationClose = () => {
    setNotificationsAnchorEl(null);
    handleMobileNotificationClose();
  };
  const handleMenuLogout = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    window.localStorage.clear();
    window.location.reload();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const [notificationopen, setnotificationopen] = useState(false);
  const [notificationbody, setnotificationbody] = useState("");
  const [notificationtitle, setnotificationtitle] = useState("");
  const HandleopenNotification = (item) => {
    setnotificationopen(true);
    setnotificationbody(item?.body);
    setnotificationtitle(item?.title);
  };
  const handleNotificationModalClose = () => {
    setnotificationopen(false);
  };
  useKeypress("Escape", () => {
    setnotificationopen(false);
  });
  const menuId = "primary-search-account-menu";
  const renderNotifList = (
    <>
      <Menu
        anchorEl={NotificationsAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuNotificationsOpen}
        onClose={handleNotificationClose}
      >
        {notificationlistbydept?.data?.map((item, index) => {
          let color = "";
          if (item?.priority === "info") {
            color = "#42b6f5";
          } else if (item?.priority === "warning") {
            color = "#ffec59";
          } else {
            color = "#f23d3d";
          }
          return (
            <div>
              <MenuItem
                onClick={() => HandleopenNotification(item)}
                key={index}
              >
                <ListItemIcon>
                  <FiberManualRecordIcon
                    fontSize="small"
                    style={{ color: color }}
                  />
                </ListItemIcon>
                <Tooltip title={item?.body} aria-label={item?.body}>
                  <div
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      width: "30rem",
                    }}
                  >
                    <Typography variant="inherit">
                      {item.createdBy} : {item?.body}
                    </Typography>
                  </div>
                </Tooltip>
              </MenuItem>
              <Divider />
            </div>
          );
        })}
      </Menu>
    </>
  );

  const renderMenu = (
    <>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuLogout}>Logout</MenuItem>
      </Menu>
    </>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <NotificationsIcon />
        </IconButton>
        <p>Notifications</p>
      </MenuItem>

      <MenuItem onClick={handleMenuLogout}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );
  return (
    <div style={{ marginTop: 100 }}>
      <CustomModal
        opens={notificationopen}
        UI={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50,
            }}
          >
            <Paper style={{ minWidth: "10%" }}>
              <CardContent style={{ padding: 50 }}>
                <Grid item xs={12} className={classes.GridStyle}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img src={logo} alt="success icon" width="20%" />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    style={{
                      textAlign: "center",
                      fontSize: "16",
                      fontWeight: 800,
                      marginTop: 50,
                    }}
                  >
                    {notificationtitle}
                  </Typography>
                  <Typography
                    style={{
                      textAlign: "center",
                      fontSize: "12",
                      fontWeight: 500,
                    }}
                  >
                    {notificationbody}
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 50,
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleNotificationModalClose()}
                    >
                      Close
                    </Button>
                  </div>
                </Grid>
              </CardContent>
            </Paper>
          </div>
        }
      />
      <SimpleSnackbar
        vertical="top"
        horizontal="right"
        open={globalsnackbar.open}
        close={false}
        handleClose={() => handleClose()}
        message={globalsnackbar.message}
        typeofmessage={globalsnackbar.type}
      />
      <CustomDrawer
        UI={
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <img src={logo} height="30px" widht="30px" alt="" />
              </IconButton>
              <Typography variant="body3" className={classes.title} key="">
                {name}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <div className={classes.sectionDesktop}>
                <IconButton
                  edge="start"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleNotificationsOpen}
                  color="inherit"
                >
                  <NotificationsIcon />
                </IconButton>

                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </Grid>
          </Grid>
        }
      />
      {renderMobileMenu}

      {renderMenu}
      {renderNotifList}
    </div>
  );
};
export default Navigation;
