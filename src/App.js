import { Component } from 'react';
// 路由
import {BrowserRouter as Router,Switch,Route}  from 'react-router-dom';  
// 引入组件
import Login from './views/login/index';
import Index from './views/index/Index'
import './App.scss';
// 私有组建
import PrivateRouter from '@c/privateRouter';
// provider
import {Provider} from 'react-redux';

// store

import Store from '@/store/index';
class App extends Component{
  constructor(){
    super();
    this.state = {};
  }
  render(){
    return(
      <Provider store={Store}>
         <Router>
          <Switch>
            <Route  exact component={Login} path="/"></Route>
            <PrivateRouter component={Index} path='/index'></PrivateRouter>
          </Switch>
        </Router>
      </Provider>
       
      
    )
  }
}

export default App;
