
const stateData = {
    departmentList:[]
}
const DepartmentReducer = function(state=stateData,action) {
  console.log(action)
    switch (action.type) {
        case 'GET_DEPARTMENT_LIST': {
            return {
                ...state,
                departmentList:action.payload
            }
        }
    
        default:
            return state
    }
    
}

export default DepartmentReducer;