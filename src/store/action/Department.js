import { addDepartmentList } from '../Type';
export function addDepartment(params) {
  console.log('dsfkjsdhfjkk',params)
  return {
    type:addDepartmentList,
    data:params.data
  }
}