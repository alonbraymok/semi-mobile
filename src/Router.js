import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Login from './scence/Login';
import Signup from './scence/Signup';
import Profile from './scence/Profile';
import Carousel from './components/Carousel';
import Store from './scence/Store';
import Search from './scence/Search';

const Routes = () => (
   <Router>
        <Scene key = "root" hideNavBar>
            <Scene key='search' component={Search} />
            <Scene key='login' component={Login} />
            <Scene key='signup' component={Signup} />
            <Scene key={'profile'} component={Profile} />
            <Scene key={'store'} component={Store} />
            <Scene key={'carosel'} component={Carousel} />
        </Scene>
   </Router>
)
export default Routes