import { Component } from 'react';

// andt
import { Form, Input, Row, Col,Button,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {validate_email,validate_password} from '../../utils/validate';
// 加密
import CryptoJs from 'crypto-js';
// 加载组建
import Code from '../../components/code'
class LoginForm extends Component {
    constructor(props) {
        super();
        this.state = {
            username:'',
            code_button_disable:true,
            password:'',
            code:'',
            loading:false
        }
        // react 没有双向数据绑定的概念 通过e.target.value 赋值
    }
    onFinish = (values) => {
        this.setState({
            loading:true
        })
        this.$http({
            method: 'post',
            url: '/login/',
            data: {
                username:this.state.username,
                password: CryptoJs.MD5(this.state.password).toString(),
                code:this.state.code
            }
        }).then(res=>{
            this.setState({
                loading:false
            })
            if (res.resCode === 0) {
                message.success(res.message)
            }
        })
    }
    // 邮箱输入
    emaliChange = (e)=>{
        this.setState({
            username:e.target.value
        })
    }
    codeChange = (e)=>{
        console.log(e)
        this.setState({
            code:e.target.value
        })
    }
    paswChange=(e)=>{
        this.setState({
            password:e.target.value
        })
    }
    // 调用父组建方法
    toggleForm = () =>{
        this.props.switchForm ('register')
    }
    
    render() {
        const {username,loading} = this.state;
        const _this = this
        return (
            <div>
                <div className="form-header clearfix">
                    <h4 className="column">登录</h4>
                    <div onClick={this.toggleForm}>账号注册</div>
                </div>
                <div className="form-content">
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                  if (!value) {
                                    return Promise.reject('邮箱不能为空！');
                                  }
                                  if (validate_email(value)){
                                      _this.setState({
                                        code_button_disable:false
                                      })
                                    return Promise.resolve();

                                  }
                                  return Promise.reject('邮箱格式不正确!');
                                },
                              }),
                        ]}
                        >
                            <Input onChange={this.emaliChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: '密码不能为空!' },
                            {pattern:validate_password,message:"请输入大于6位小于20位数字+字母"}
                             
                        ]}
                        >
                            <Input  type="password"  onChange={this.paswChange} prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                        </Form.Item>
                        <Form.Item name="code"  rules={[{ required: true, message: '验证码不能为空' },{len:6,message:'请输入6位验证码'}]}>
                            <Row gutter={13}>
                                <Col span={15}>
                                    <Input onChange={this.codeChange} prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Code" />
                                </Col>
                                <Col span={8}>
                                    <Code username={username} type={'login'}/>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" loading={loading} htmlType="submit" block className="login-form-button">
                                登录
                                </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}
export default LoginForm 