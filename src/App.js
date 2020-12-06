import { Component } from 'react';
// 路由
import {HashRouter,Switch,Route}  from 'react-router-dom';  
// 引入组件
import Home from './views/home';
import About from './views/about'
class App extends Component{
  constructor(){
    super();
    this.state = {};
  }
  render(){
    return(
      <HashRouter>
        <Switch>
          <Route  exact component={Home} path="/"></Route>
          <Route component={About}  path="/about"></Route>
        </Switch>
      </HashRouter>
    )
  }
}

export default App;
