import React,{Component} from 'react';
import {Layout} from 'antd';
import './index.scss'
const { Header, Sider, Content } = Layout;

class main extends Component {
    constructor(){
        super();
        this.state={};
    }
    render(){

        return (
            <Layout>
                <Sider width="250px" className="layout-side">侧边栏</Sider>
                <Layout>
                    <Header className="layout-header">Header</Header>
                    <Content className="layout-main">Content</Content>
                </Layout>
            </Layout>

        )
    }
}

export default main