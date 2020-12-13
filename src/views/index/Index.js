import React,{Component} from 'react';
// css样式
import './layout.scss';
// layout组建 
import Aside from './component/Aside';
import ContainerMain  from '../../components/container/index';
// andt
import {Layout} from 'antd';
const { Header, Sider, Content } = Layout;


class main extends Component {
    constructor(){
        super();
        this.state={};
    }
    render(){

        return (
            <Layout>
                <Sider width={250} className="layout-side">
                    <Aside></Aside>
                </Sider>
                <Layout>
                    <Header className="layout-header">Header</Header>
                    <Content className="layout-main">
                        <ContainerMain></ContainerMain>
                    </Content>
                </Layout>
            </Layout>

        )
    }
}

export default main