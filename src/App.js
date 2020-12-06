import { Component } from 'react';
// 路由
import {BrowserRouter as Router,Switch,Route}  from 'react-router-dom';  
// 引入组件
import Login from './views/login/index';
import About from './views/about';
import './App.scss';
class App extends Component{
  constructor(){
    super();
    this.state = {};
  }
  render(){
    return(
      <div className="test">
        <Router>
          <Switch>
            <Route  exact component={Login} path="/"></Route>
            <Route component={About}  path="/about"></Route>
          </Switch>
        </Router>
      </div>
      
    )
  }
}

export default App;
