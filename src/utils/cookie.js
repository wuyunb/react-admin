import cookie from 'react-cookies';

// 存储token
export function setToken(value){
    cookie.save('adminToken',value)
}
// 存储用户名
export function setUserName(value){
    cookie.save('username',value)
}

// 获取token
export function getToken () {
    return cookie.load('adminToken')
}
// 获取用户名
export function getUserName(){
    return cookie.load('username')
}
// 删除token
export function removeTolen (value){
    cookie.remove(value)
}