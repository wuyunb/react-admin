
#### create-react-app  [官网](https://www.html.cn/create-react-app/docs/getting-started/)

Create React App 是一个官方支持的创建 React 单页应用程序的方法。它提供了一个零配置的现代构建设。



#### 安装

``` 
1、全局安装脚手架
npm install -g create-react-app
2、直接使用脚手架工具创建项目
create-react-app demo01  //用脚手架创建React项目
npm  start  //预览项目

```
安装后报错

解决：
创建 .env文件  

```
SKIP_PREFLIGHT_CHECK=true
```
#### jsx

遇到 < 解析 html  遇到{ 解析js 

Fragment 标签 （占位）


#### 组件传值

##### 1. 父组件向子组件通信
React数据流动是单向的，React数据流动是单向的

```
// Child.js

import React from 'react';
import PropTypes from 'prop-types';

 class Child extends React.Component{
  constructor(props){      // 表示父类的构造方法、用来新建父类的this对象
    super(props);
  }
    render() {
     return (
       <div>
           <span></span>
          <div>{this.props.hahh}</div>
        </div>
     ) 
    }
 }
 export default Child;

 
 // Parent.js
 import React, { Component } from 'react';
 import Child from './Child';
 class Parent extends React.Component{
    constructor(props){
    super(props);
    this.state = {
        hest:'你好啊'
    }
   }
   render() {
        return (
          <div>
              <Child  hahh={this.state.hest} 
          </div>
        )
      }
 }
export default Parent;
```
#### props和state区别
``` 
props 是外部传入的，一般是由父组件传入
state 是由组件自身维持

修改state值使用 setState

```


#### PropTypes校验传递值

```
// 引入
import PropTypes from 'prop-types'
```
引入后、在组件的下方引用，注意：子组件的最下面（不是类里边），写入下面的代码：
```
类名.propTypes={
    // 父组件属性: PropTypes.类型
    // 例：
    content:PropTypes.string.isRequired,
    deleteItem:PropTypes.func,
    index:PropTypes.number
}
 // isRequired （必须传参）
```

#### 使用默认值defaultProps

```
类名.defaultProps = {
    类型: '值'
}
```
### 虚拟Dom

缺陷：
第一次生成完整的DOM、第二次也生成了完整的DOM、第二次替换第一次DOM，非常耗性能
### 生命周期

```
生命周期函数指在某一个时刻组件会自动调用执行的函数 

四大阶段：
1、Initialization:初始化阶段。
2、Mounting: 挂载阶段。
3、Updation: 更新阶段。
4、Unmounting: 销毁阶段
```

#### 初始化阶段 

```
Initialization:

constructor不算生命周期函数。它是ES6的基本语法。虽然它和生命周期函数的性质一样，但不能认为是生命周期函数。

我个人把它看成React的Initialization阶段，定义属性（props）和状态(state)。

```
#### 挂载阶段
```
componentWillMount：在组件挂载之前自动执行

render：页面state或props发生变化时执行。

componentDidMount： 在组件被挂载到页面后自动执行 (获取后台数据)

ps:注意的问题
componentWillMount和componentDidMount这两个生命周期函数，只在页面刷新时执行一次，而render函数是只要有state和props变化就会执行
```




#### 更新阶段

1、shouldComponentUpdate
```
 组件在被更新之前自动执行 （返回布尔值、参数：nextProps,nextState)
 
 1、询问组件是否需要更新的一个钩子函数，判断数据是否需要重新渲染，返回一个布尔值。默认的返回值是true，需要重新render()。若如果返回值是false则不触发渲染,利用这个生命周期函数可以强制关闭不需要更新的子组件来提升渲染性能。
 
 2、用来判断是否需要调用 render 方法重新描绘 dom
 
 3、 dom 的描绘非常消耗性能，如果在 shouldComponentUpdate 方法中能够写出更优化的 dom diff 算法，可以极大的提高性能。
```

2、componentWillUpdate
```
执行程序会报错官方推荐 UNSAFE_componentWillMount

ps:在组件更新之前，但在shouldComponenUpdate之后被执行,返回true后执行， 返回false不会被执行 

1、在加载渲染页面render方法之前执行的函数，做页面初始化数据的处理

2、在componentWillMount函数中，可以改变state的状态，也只能通过this.state去处理数据，在render方法中，this.state的数据是得到承认的。

3、在工作中常用的是页面初始化ajax的请求，渲染数据的处理；因为在页面加载中，只执行一次，可以通过改变状态，this.setState去重新渲染组件。

```
3、componentDidUpdate

```
组件更新完成之后自动执行
```
4、componentWillReceiveProps
```
子组件接收到父组件传递过来的参数，父组件render函数重新被执行，这个生命周期就会被执行。

1、这个组件第一次存在于Dom中，函数是不会被执行的;

2、如果已经存在于Dom中，函数才会被执行
```




### 卸载
componentWillUnmount: 组件退出之前


### 动画

react-transition-group插件

### Redux工作流 

![image](https://note.youdao.com/yws/res/364/85C3A816C36A431E987C3599D3928F6E)



#### 安装 redux
```
npm install --save redux
```
####  创建 Store
##### 在store文件夹下创建 index文件 和 reducre文件

1、index.JS
```

import {createStore} from 'redux'    // 创建 store
import reducer from './reducer';     // 引入reducer
//创建数据存储仓库
const store = createStore(
reducer,
 // 插件 devTools
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())   // 将reducer传递给store

export default store;    // 导出store
```

2、reducer.js

```
const defaultState ={
  inputValue:'hellow',
  list:[1,2,3]
}

export default (state = defaultState, actions) =>{
  return state
}
// state: store 存储的数据

```

3、组件中使用

```
// 引入store
import store from './store'
// 在constructor里调用store中getState方法获取Store中的数据
 constructor(props) {
    super(props);
    console.log(store.getState())
  }

```

3-1、组件通过action派发数据

```
1、在要修改的方法里创建action
 const action = {
      type:'' //：告诉store要干什么
      value: '' ：传的内容
    }
2、通过Store中dispatch方法将action传递给store
 store.dispatch(action)
```
    

4、store接收到传递后的数据后，会把当前store存的数据和接收到的action一起转发给reducers（store自动执行）

5、在reducer.js中改变数据
```
export default (state = defaultState, actions) =>{
if(actions.type === '通过action传来类型'){
    // 因为无法修改state，所以需要拷贝state
    const newState = JSON.parse(JSON.stringify(state))
    retrun newState
}
  return state
}
```
6、订阅store 只要store发生变化subscribe方法自动执行   subscribe (思埠sk瑞不)
```
    constructor(props) {
    ....
        this.handleStoreChange = this.handleStoreChange.bind(this)
        store.subscribe(this.handleStoreChange )

    }
```
7、定义方法 改变state里所需改变的数据

```
handleStoreChange(){
    this.Setstae(store.getState())
}
 
```


#### ActionTypes拆分

解决action中type值容易写错但是react不报错

1、创建actionTypes.js文件

2、在actionTypes.js文件中定义所需要的常量
```
exporet const  key="type-value"
exporet const  key="type-value"
……
```
![image](https://note.youdao.com/yws/res/652/D1911FBFE5F14835A592ADCEFB40ABE4)

3、在组件中引入actionTypes
```
import{key,……} from './store/actionTypes'
``` 
4、将组件中action中type属性的值改为对应的key

5、在reducer中引入actionTypes（用法和在组件中一样）

#### 使用actionCreator统一创建action

在store文件夹下actionCreator.js文件

```
import{key,……} from './store/actionTypes'

export const FUNCTIONNAME =(value)=>({
  type:key,
  value
})

```
在所需的组件中引入 FunctionName

```
import {FunctionName,……} from './store/actionCreator'
```
在组件所需要派发store的地方使用（事件中）
```
const action = FunctionName（传递的参数）
store.dispatch (action)
```
#### redux-thunk （处理异步，ps：获取数据）
安装
```
npm install --save redux-thunk
```
在store文件夹下的inde.js文件下引入
```
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({  }) : compose;
  
  const enhancer = composeEnhancers(
  applyMiddleware([thunk])
  );
  const store = createStore(……，enhancer)
  
  exprot default store

```
在actionCreator.js文件中创建一个获取数据的方法
```
export const FunctionName =（）=> {
 retrun (dispatch) =>{   //dispatch参数store带来的
      axios.get('').then((res)=>{
        const data =res.data
        cosnt action = actionCreator中创建的   方法(data)
        dispatch(action)
    })
 }
}
```
在组件中 componentDidMount钩子中使用

```
import {,……,FunctionName,……} from './store/actionCreator'

 componentDidMount(){
     const action = FunctionName()
     store.dispatch(action)
 }
```
#### redux-saga (中间件：异步)
安装
```
npm install --save redux-saga
```
在store文件夹下的inde.js文件下引入
```
 import createSagaMiddleware from 'redux-saga' //引入redux-saga
 import  todoSagas from './sagas';
 
 
 const sagaMiddleware = createSagaMiddleware()  // 创建 aga中间件
 const composeEnhancers =typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({  }) :compose;
  
  const enhancer = composeEnhancers(
  applyMiddleware([thunk])
  );
  const store = createStore(……，enhancer)
  ===========================
  sagaMiddleware.run(todoSagas)
  ===========================
  exprot default store

```
创建 sagas.js文件
```
function* mySaga() {
  yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
}

export default mySaga;
```

#### react-Redux

1、安装 react-redux

```
npm install --save react-redux
```
2、<Provider>：是一个提供器，只要使用了这个组件，组件里边的其它所有组件都可以使用store了，这也是React-redux的核心组件

```
<!--APP父组件-->
import React from 'react';
import ReactDOM from 'react-dom';
<!--引入的子组件-->
import TodoList from './TodoList'
//---------关键代码--------start
import { Provider } from 'react-redux'
import store from './store'
//声明一个App组件，然后这个组件用Provider进行包裹。
const App = (
   <Provider store={store}>
       // 子组件
       <TodoList/>
   </Provider>
)
//---------关键代码--------end
ReactDOM.render(App, document.getElementById('root'));

```
3、 connect 连接器

```
<!--TodoList.js-->
import React, { Component } from 'react';
import {connect} from 'react-redux'   //引入连接器
class TodoList extends Component {
    constructor(props){
        super(props)
    }
    render() { 
        return (
            <div>
                <div>
                    <input value={this.props.inputValue} />
                    <button>提交</button>
                </div>
                <ul>
                    <li>JSPang</li>
                </ul>
            </div>
            );
    }
}

//映射：映射关系就是把原来的state映射成组件中的props属性
const stateToProps = (state)=>{
    return {
        inputValue : state.inputValue
    }
}
 
export default connect(stateToProps,null)(TodoList);

```
#### Redux（总结）
```
strore是唯一的

只有store能够改变自己的内容

reducer必须是纯函数

createStore  创建store

store.dispatch()  派发action

store.getState() 获取到store中所有的内容    

store.subscribe()  订阅store的改变
```



charles 模拟服务


### React Router


react-router提供了一些router的核心api，router、route、switch等 但是没有提供dom操作进行跳转的api

react-router-dom 提供了browserRouter、route、link、switch等api、可以通过dom事件控制路由

#### 安装

```
npm install --save react-router-dom
```


#### 路由模式

HashRouter：使用 URL 中的 hash（#）部分去创建路由，举例来说，用户访问（简单的说就是URL上会带#号），访问地址会变成这种；http://www.example.com/#/xxxxxxxx
不需要处理

BrowserRouter：URL 是指向真实 URL 的资源路径，当通过真实 URL 访问网站的时候。意思就是，不带#号的实际地址；
项目上线后，需要后台处理url指向

CreateMemoryHistory：不会在地址栏被操作或读取。这就解释了我们是如何实现服务器渲染的。同时它也非常适合测试和其他的渲染环境（像 React Native ）。和另外两种history的一点不同是你必须创建它，这种方式便于测试。


Switch：<Route>在路径相同的情况下，只匹配第一个，这个可以避免重复匹配；

exact：精准匹配；



#### 组件中引入浏览器路由
```
import React from 'react';
import {BrowserRouter as Router ,Route ,Link} from 'react-router-dom'     //BrowserRouter浏览器路由 、 as：起别名 、Route：线路  Link

function Index() {
   return <span>你好！</span>
}
function List() {
  return  <span>哈哈哈说</span>
}

function AppRouter (){
  return (
     <Router>
       <ul>
         <li>
           <Link to="/">首页</Link>
         </li>
         <li>
          <Link to="/list">列表</Link>
         </li>
       </ul>
       <Route path="/" exact component={Index}></Route>  
       //  exact 精确匹配
       <Route path="/list/"  component={List}></Route>
     </Router>
  )
}
export default AppRouter
```
#### 重定向 Redirect

* 标签式重定向:就是利用<Redirect>标签来进行重定向，业务逻辑不复杂时建议使用这种。

* 编程式重定向:这种是利用编程的方式，一般用于业务逻辑当中，比如登录成功挑战到会员中心页面。

##### 标签重定向 

在组件中引入Readirect

```
import { Link , Redirect } from "react-router-dom";
```
引入Redirect后，直接在render函数里return里使用就可以了。

```
<Redirect to="/home/" />
```

##### 编程式重定向

在constructor中加入下面代码：
```
 this.props.history.push("/");  
```
####  ReactRouter动态传值

1、在Route上设置允许动态传值

```
在path上设置传递的Key

 <Route path="/list/:id" component={List} />
```
2、在Link上传递值
```
 <li><Link to="/list/123">列表</Link> </li>
```
3、在组件中接受并显示传递值
```
组件接收传递过来的值的时候，可以在声明周期componentDidMount中进行，传递的值在this.props.match中

match对象包括三个部分：

    1、patch:自己定义的路由规则，可以清楚的看到是可以产地id参数的

    2、url: 真实的访问路径，这上面可以清楚的看到传递过来的参数是什么。

    3、params：传递过来的参数，key和value值。

在params中获取传递过来的ID值
```
#### 暴露eject 修改webpack配置

```
npm run eject

报错时执行下面命令：

git add .

git commit -m 'up'
```

1、配置 less （sass默认自带）

```
// 安装
npm install less less-loader --save-dev

//在webpack.config.js 中配置 

style files regexes下添加less

const lessRegex = /\.less$/;

const lessModuleRegex = /\.module\.less$/;

找到
    {
        test: sassRegex,
        exclude: sassModuleRegex,
        use: getStyleLoaders(
          {
            importLoaders: 2,
            sourceMap: isEnvProduction shouldUseSourceMap,
          },
          'sass-loader'
        ),
        sideEffects: true,
    },
复制粘贴出新的修改：
    {
        test: lessRegex,
        exclude: lessModuleRegex,
        use: getStyleLoaders(
            {
                importLoaders: 2,
                sourceMap: isEnvProduction && shouldUseSourceMap,
            },
            'less-loader'
            ),
            sideEffects: true,
        },
    
    {
        test: lessModuleRegex,
        use: getStyleLoaders(
            {
                importLoaders: 2,
                sourceMap: isEnvProduction && shouldUseSourceMap,
                modules: true,
                getLocalIdent: getCSSModuleLocalIdent,
            },
            'less-loader'
             ),
    },

```
2、sass-node

```
安装：
npm install sass-loader node-sass --save-dev

在 loader: require.resolve('file-loader') 下添加

{
  loader: require.resolve('file-loader'),
  // Exclude `js` files to keep "css" loader working as it injects
  // its runtime that would otherwise be processed through "file" loader.
  // Also exclude `html` and `json` extensions so they get processed
  // by webpacks internal loaders.
  exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/, /\.scss$/],
  options: {
    name: 'static/media/[name].[hash:8].[ext]',
  },
},
{ 
  test: /\.scss$/, 
  loaders: ['style-loader', 'css-loader', 'sass-loader'],
}

```

3、Sass全局变量

全局配置变量，项目中所有的scss文件均可使用变量和方法，无需再次单独引入

```
安装依赖
npm install sass-resources-loader –D

在 sassRegex 下添加 concat

{
              test: sassRegex,
              exclude: sassModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 3,
                  sourceMap: isEnvProduction && shouldUseSourceMap,
                },
                'sass-loader'
              ).concat({
                loader: 'sass-resources-loader',
                options: {
                    resources: [
                        // 这里按照你的文件路径填写
                        path.resolve(__dirname, './../src/styles/main.scss')
                    ]
                }
              }),
              sideEffects: true,
            },

```
#### 使用ant design ui 自定义主题

先安装babel-plugin-import

```
npm install babel-plugin-import --save-dev
```

在webpack.config.js 中配置 

```
    const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
      isEnvDevelopment && require.resolve('style-loader'),
      isEnvProduction && {
        loader: MiniCssExtractPlugin.loader,
        options: Object.assign(
          {},
          shouldUseRelativeAssetPaths ? { publicPath: '../../' } : undefined
        ),
      },
      {
        loader: require.resolve('css-loader'),
        options: cssOptions,
      },
      {
        // Options for PostCSS as we reference these options twice
        // Adds vendor prefixing based on your specified browser support in
        // package.json
        loader: require.resolve('postcss-loader'),
        options: {
          // Necessary for external CSS imports to work
          // https://github.com/facebook/create-react-app/issues/2677
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
            }),
          ],
          sourceMap: isEnvProduction && shouldUseSourceMap,
        },
      },
    ].filter(Boolean);
    if (preProcessor) {
      if (preProcessor === 'less-loader'){
        loaders.push({
          loader: require.resolve(preProcessor),
          options: {
            sourceMap: isEnvProduction && shouldUseSourceMap,
            modules: false,
            modifyVars: {
            <!--修改主题-->
              "@primary-color": "#1890ff",
            },
            javascriptEnabled: true,
          },
        });
      } else {
        loaders.push({
          loader: require.resolve(preProcessor),
          options: {
            sourceMap: isEnvProduction && shouldUseSourceMap,
          },
        });
      }
    }
    return loaders;
  };

```

#### 配置跨域
1、安装依赖
```
npm i http-proxy-middleware
```

2、新建文件 （src/目录新建 setupProxy.js ps: 与config/path.js 的proxySetup路径 相对应
）

```
const { createProxyMiddleware } = require('http-proxy-middleware');
app.use(createProxyMiddleware("/devApi", {
    target: "http://www.web-jshtml.cn/api/react" , //配置你要请求的服务器地址
    changeOrigin: true,      // 是否跨域
    pathRewrite: {
        "^/devApi": "",
    },
}))
```

#### 环境变量

create-react-app 创建的项目有内置的环境变量 NODE_ENV, 可通过 process.env.NODE_ENV 读取变量。

NODE_ENV：默认的三个值

开发：development - npm start

测试：test - npm run test 

生产：production - npm run build
