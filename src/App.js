import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navigation from "./Screens/Header/Navigation";
import store from "./Services/Store";
import { Provider } from "react-redux";
import Login from "./Components/Containers/LoginCtnr";
import Maintable from "./Screens/Body/MainTable";
import GoodsRequest from "./Screens/GoodsRequest/GoodsRequest";
import Dashboard from "./Screens/Dashboard/Dashboard";
import ManageNotification from "./Screens/Notification/ManageNotification";
import "./../src/CustomStyles/PRSelectedInfo.css";
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { useSelector } from 'react-redux';
const theme = createMuiTheme({
  typography: {
    fontFamily:   'Cambria'
   
  },});
function App() {

  const LoginContainer = () => (
    <div>
      <Provider store={store}>
        
        <Route path="/Login" component={Login} />
      </Provider>
    </div>
  );
  const DefaultContainer = () => (
    <Container fixed >
      <Provider store={store}>
        <Navigation />

        <Route path="/Maintable" component={Maintable}/>
        <Route path="/GoodsRequest" component={GoodsRequest}/>
        <Route path="/Dashboard" component={Dashboard}/>
        <Route path="/Notification" component={ManageNotification}/>
      </Provider>
    </Container>
  );
  return (
    <ThemeProvider theme={theme}>
   <div>
        <BrowserRouter>
      <Switch>
          <Route exact path="/(login)" component={LoginContainer} />
          <Route component={DefaultContainer} />
        </Switch>
      </BrowserRouter>
   </div>
   </ThemeProvider>
  );
}

export default App;
