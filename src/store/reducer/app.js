import { setToenKey,setUsernameKey } from '../Type';
import {getToken,getUserName} from '@/utils/cookie';

const app = {
    token:'' || getToken(),
    userName:'' || getUserName()
}
const login = function(state=app,action) {
  console.log(action)
    switch (action.type) {
        case setToenKey: {
            return {...state,token:action.data}
        }
        case setUsernameKey: {
          return {
              ...state,
              userName:action.data
          }
      }
    
        default:
            return state
    }
    
}

export default login;