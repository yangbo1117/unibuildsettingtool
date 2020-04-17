import React,{ Component } from 'react';
import { getCookie } from '../plugin/GetToken'
import {Route,Redirect} from 'react-router-dom'

class Auth extends Component{

    render() {
        let {component:Component, ...rest} = this.props;
        let token = getCookie('Bearer')
        return <Route render={(routeProps)=>{
           return  token ?  <Component { ...rest } {...routeProps } /> : <Redirect to="/login"/>
        }}
        />
    }
}

export default Auth;