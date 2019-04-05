import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Login from './scence/Login';
import Signup from './scence/Signup';


const Routes = () => (
   <Router>
        <Scene key = "root" hideNavBar>
            <Scene key='signup' component={Signup} />
            <Scene key='login' component={Login} />
        </Scene>
   </Router>
)
export default Routes