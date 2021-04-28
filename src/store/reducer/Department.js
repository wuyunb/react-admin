import { addDepartmentList } from '../Type';
const stateData = {
    departmentList:[]
}
const DepartmentReducer = function(state=stateData,action) {
    switch (action.type) {
        case addDepartmentList: {
            return {
                ...state,
                departmentList:action.data
            }
        }
    
        default:
            return state
    }
    
}

export default DepartmentReducer;