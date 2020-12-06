import { Component } from 'react';

// andt
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

class LoginForm extends Component {
    constructor(props) {
        super();
        this.state = {}
    }
    onFinish = (values) => {
        console.log(values)
    }
    toggleForm = () =>{
        this.props.switchForm ('register')
    }
    render() {
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
                        onFinish={() => this.onFinish()}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Row gutter={13}>
                                <Col span={15}>
                                    <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                                </Col>
                                <Col span={8}>
                                    <Button type="primary" size={12} danger>获取验证码</Button>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block className="login-form-button">
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