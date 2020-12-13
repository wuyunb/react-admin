import { Component } from 'react';

// andt
import { Form, Input, Button, Row, Col,message} from 'antd';

import { UserOutlined, LockOutlined } from '@ant-design/icons';
// 验证
import {validate_pas,validate_email} from '../../utils/validate';
// 加密
import CryptoJs from 'crypto-js';
// 验证码组件
import Code from '../../components/code';
class RegisterForm extends Component {
    constructor() {
        super();
        this.state = {
            username:'',
            password:'',
            Code:'',
            loading:false
        }
    }
    // 注册
    onFinish = (values) => {
        const {username,password,Code} = this.state
        this.setState({
            loading:true
        })
        this.$http({
            method:'post',
            url:'/register/',
            data:{
                username,
                password: CryptoJs.MD5(password).toString(),    // 密码加密
                code:Code
            }
        }).then((res)=>{
            this.setState({
                loading:false
            })
            if (res.resCode === 0) {
                message.success(res.message)
                this.toggleForm()
                
            } else {
                message.error(res.message)
            }
        }).catch(error=>{

        })
    }
    // 调用父级方法
    toggleForm = ()=>{
        this.props.switchForm ('login');
    }
   // 邮箱输入
   emaliChange = (e)=>{
        this.setState({
            username:e.target.value
        })
    }
    // 密码输入
    paswChange = (e) =>{
        this.setState({
            password:e.target.value
        })
    }
    // 确认密码输入
    codeChange = (e) =>{
        this.setState({
            Code:e.target.value
        })
    }
    render() {
        const {username,loading} = this.state;
        return (
            <div>
                <div className="form-header clearfix">
                    <h4 className="column">注册账号</h4>
                    <div onClick={this.toggleForm}>登录</div>
                </div>
                <div className="form-content">
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={() => this.onFinish()}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                      if (!value) {
                                        return Promise.reject('邮箱不能为空！');
                                      }
                                      if (!validate_email(value)){
                                        return Promise.reject('邮箱格式不正确!');
                                      }
                                      return Promise.resolve();
                                    },
                                  }),
                            ]}
                            
                        >
                            <Input  onChange={this.emaliChange} prefix={<UserOutlined className="site-form-item-icon" />}  placeholder="请输入邮箱" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value){
                                        return Promise.reject('密码不能为空!');
                                    }
                                  if (!validate_pas(value)){
                                    return Promise.reject('请输入大于6位小于20位数字+字母!');
                                  }
                                  return Promise.resolve();
                                },
                              }), ]}
                        >
                            <Input type="password" onChange={this.paswChange} prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入密码" />
                        </Form.Item>
                        <Form.Item
                            name="passwords"
                            rules={[
                                ({ getFieldValue }) => ({     //getFieldValue()  获取form中指定name的值
                                    validator(rule, value) {
                                        if (!value){
                                            return Promise.reject('请再次输入密码!');
                                        }
                                      if (value !== getFieldValue("password")){
                                        return Promise.reject('两次密码不一致');
                                      }
                                      return Promise.resolve();
                                    },
                                  })
                            ]}
                        >
                            <Input type="password"  onChange={this.paswsChange} prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请再次输入密码" />
                        </Form.Item>
                        <Form.Item name="Code" rules={[{ required: true, message: '验证码不能为空' },{len:6,message:'请输入6位验证码'}]}>
                            <Row gutter={13}>
                                <Col span={15}>
                                    <Input onChange={this.codeChange} prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入验证码" />
                                </Col>
                                <Col span={8}>
                                    <Code username={username} type={'register'}/>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading} block className="login-form-button">
                                注册
                                </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}
export default RegisterForm 