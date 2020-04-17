import React from 'react';
import { Route, Redirect, Switch, HashRouter } from 'react-router-dom';
import Login from '../pages/Login'
import Auth from '../guard/Auth'
import App from '../layout/App';
import Home from '../pages/Home';


export default class Eroute extends React.Component{
    render(){
        return(
            <HashRouter>
                <App>
                    <Switch>
                        <Auth path='/home' component={ Home }></Auth>
                        <Route path='/login' component={ Login }></Route>
                        <Redirect exact from='/' to='/home'></Redirect> 
                    </Switch>
                </App>
            </HashRouter>
        )
    }
} 