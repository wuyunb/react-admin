import React,{Component} from 'react';

import { Button,message } from 'antd';
import {validate_email} from '../../utils/validate';
// 定时器
let timer = null
class Code extends Component{
    constructor(){
        super()
        this.state={
            code_button_loding:false,
            code_button_disable:false,
            code_button_text:'获取验证码',
            username:'',
            type:''
        }
    }
    // 监听 props  
    componentWillReceiveProps({username,type}){
        this.setState({
            username,
            type
        })
    }
    componentWillUnmount (){
        clearInterval(timer)
    }
    // 获取验证码
    getCode = ()=>{
        const username = this.state.username
        if (!username) {
            message.error('邮箱不能为空！',1);
            return
        }
        if (!validate_email(username)) {
            message.error('邮箱格式不正确！',1);
            return
        }
        this.setState({
            code_button_loding:true,
            code_button_text:'发送中'
        })
        this.$http({
            method:'post',
            url:this.api.codeSms,
            data:{
                username,
                module:this.state.type,
            }
        }).then(res=>{
            this.countDown()
            if (res.resCode === 0) {
                message.success(res.message)
            }
        }).catch(error=>{
            this.setState({
                code_button_loding:false,
                code_button_text:'重新发送'
            })
        })
    }
    // 倒计时
    countDown = ()=>{
        // let timer = null
        let sec = 60
        this.setState({
           code_button_loding:false,
           code_button_disable:true, 
           code_button_text:`${sec}S`
        })
        let _this = this
        timer = setInterval(() => {
            sec--;
            if (sec <= 0) {
                _this.setState({
                    code_button_text:`重新获取`,
                    code_button_disable:false,
                })
                clearInterval(timer)
                return
            }
            _this.setState({
                code_button_text:`${sec}S`
            })
        }, 1000);
    }
    render(){
        const {code_button_loding,code_button_disable,code_button_text} = this.state
        return <Button type="primary" className="code"  size={12} danger  loading={code_button_loding} disabled={code_button_disable} onClick={this.getCode}>{code_button_text}</Button>
    }
}

export default Code