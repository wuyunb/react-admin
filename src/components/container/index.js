import React from 'react';
// 路由
import {Switch}  from 'react-router-dom';  

import User from '../../views/user/index';
import UserAdd from '../../views/user/add';


// 私有组建
import PrivateRouter from '../privateRouter';
class Container extends React.Component{
  constructor(){
    super();
    this.state = {};
  }
  render(){
    return(
          <Switch>
            <PrivateRouter exact path='/index/user/list' component={User} ></PrivateRouter>
            <PrivateRouter path='/index/user/add' component={UserAdd} ></PrivateRouter>
          </Switch> 
    )
  }
}

export default Container;
