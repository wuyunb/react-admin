import {createStore,combineReducers} from 'redux';    // 创建 store


// reducer
import configReducer from "./reducer/Config";
import departmentReducer from "./reducer/Department";
import jobReducer from "./reducer/Job";
import app from './reducer/app';

// 创建 Reducer对象

const allReducer = {
    config:configReducer,
    department:departmentReducer,
    job:jobReducer,
    app, 
}
const rootReducer = combineReducers(allReducer)

// 创建store实例
const store = createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store