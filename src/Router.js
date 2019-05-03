import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Login from './scence/Login';
import Signup from './scence/Signup';
import Profile from './scence/Profile';
import Carousel from './components/Carousel';
import Store from './scence/Store';
import Search from './scence/Search';
import ProductPage from './components/ProductPage';
import SideBarMenu from './components/SideBarMenu';
import RentedList from './scence/RentedList';
import CreateStore from './scence/CreateStore';
import NotifictionCenter from './scence/NotifictionCenter';
import TestC from './scence/TestC';

const Routes = () => (
   <Router>
        <Scene key = "root" hideNavBar>
          
            <Scene key='login' component={Login} />
            <Scene key='notifictionCenter' component={NotifictionCenter} />
            <Scene key='createStore' component={CreateStore} />
            <Scene key='search' component={Search} />
            <Scene key={'profile'} component={Profile} />
            <Scene key='list' component={SideBarMenu}/>
            <Scene key='rentedList' component={RentedList} />
            <Scene key={'store'} component={Store} />
            <Scene key='prodectPage' component={ProductPage} /> 
            <Scene key='signup' component={Signup} />
            <Scene key={'carosel'} component={Carousel} />
        </Scene>
   </Router>
)
export default Routes