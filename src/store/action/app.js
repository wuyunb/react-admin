import { setToenKey,setUsernameKey } from '../Type';
export function  setTokenAction(params) {

  return {
    type:setToenKey,
    data:params
  }
}

export function  setUsernameAction(params) {

  return {
    type:setUsernameKey,
    data:params
  }
}