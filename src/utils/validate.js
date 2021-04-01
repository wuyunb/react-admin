export const validate_password =  /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
const reg_email =/^([a-zA-Z]|[0-9])(\w)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
export const reg_password = validate_password

const reg_number =/^[1-9]\d*|0$/;


// 邮箱验证
export function validate_email(val) {
    return reg_email.test(val)
}
// 密码验证
export function validate_pas(val){
    return reg_password.test(val)
}

export function validate_num(val) {
    return reg_number.test(val)
}