import React from 'react';

import {Redirect, Route} from 'react-router-dom';   //Redirect 重定向
// import {getToken} from '../../utils/session';
import {getToken} from '../../utils/cookie';


// 无状态组建
const PrivateRouer = ({component:Component,...rest})=>{
    return (
        <Route {...rest} render={routeProps => (getToken() ? <Component {...routeProps} />: <Redirect to="/" />)}>

        </Route>
    )
}

export default PrivateRouer