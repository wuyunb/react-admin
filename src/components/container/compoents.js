import React from 'react';
// 路由
import {Switch}  from 'react-router-dom';  

// 私有组建
import PrivateRouter from '../privateRouter';
// 自动化工程
import  Components from './index';
class Container extends React.Component{
  constructor(){
    super();
    this.state = {};
  }
  componentDidMount(){

  }
  render(){
    return(
          <Switch>
            {
              Components.map(item=>{
               return <PrivateRouter exact key={item.path} path={item.path} component={item.component} ></PrivateRouter>
              })
            }
          </Switch> 
    )
  }
}

export default Container;
