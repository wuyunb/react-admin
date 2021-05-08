import React,{Component} from 'react';
// css样式
import './layout.scss';
// layout组建 
import Aside from './component/Aside';
// 导入组建
import ContainerMain  from '@c/container/compoents';
import {MenuFoldOutlined,MenuUnfoldOutlined } from '@ant-design/icons';

// andt
import {Layout} from 'antd';
const { Header, Sider, Content } = Layout;


class main extends Component {
    constructor(){
        super();
        this.state={
            collapsed:false 
        };
    }
    toggleCollapsed =()=>{
        this.setState({
            collapsed: !this.state.collapsed,
          });
    }
    render(){

        return (
            <Layout>
                <Sider width={250} collapsed={this.state.collapsed}  className="layout-side">
                    <Aside ></Aside>
                </Sider>
                <Layout>
                    <Header className="layout-header">
                    <div onClick={this.toggleCollapsed} style={{ fontSize: '20px' }}>
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                    </div>
                    </Header>
                    <Content className="layout-main">
                        <ContainerMain></ContainerMain>
                    </Content>
                </Layout>
            </Layout>

        )
    }
}

export default main