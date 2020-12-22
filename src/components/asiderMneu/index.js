import React,{Component,Fragment} from 'react';
import  Router from '../../router/index';
import { Link,withRouter } from 'react-router-dom';
import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

class AsiderMneu extends Component{
    constructor(){
        super();
        this.state = {
            selectedKeys:[],
            openKeys:['/index/user'],

        };
    }
    // 组件挂载之前
    UNSAFE_componentWillMount (){
        let pathname = this.props.location.pathname;
        let openks = pathname.split('/').slice(0,3).join('/');
        this.setState({
            selectedKeys: [pathname],
            openKeys:[openks]
        })
    }
    // 选择菜单
    selectMenu = ({key, keyPath})=>{
        this.setState({
            selectedKeys: [key],
            openKeys:[keyPath[keyPath.length-1]]
        })
    }

    // 无级菜单
    renderMenu = ({key,title}) => {
        return(
            <Menu.Item key={key}><Link to={key}>{title}</Link></Menu.Item>
        )   
    }
    // 子级菜单处理
    renderSubMenu =({key,title,child})=>{ 
       return <SubMenu key={key} icon={<UserOutlined />}  title={title}>
           {
               child && child.map(em=>{
                    return em.child && em.child.length > 0 ? this.renderSubMenu(em) :this.renderMenu(em)
               })
           }
        </SubMenu>
    }
    render(){
        const {selectedKeys,openKeys} = this.state
        return (
            <Fragment>
                <Menu
                    mode="inline"
                    theme="dark"
                    onClick={this.selectMenu}
                    defaultSelectedKeys={selectedKeys}
                    defaultOpenKeys={openKeys}
                    style={{borderRight: 0 }}
                    >
                        {
                            Router && Router.map(firstItem => {
                                return firstItem.child && firstItem.child.length > 0 ? this.renderSubMenu(firstItem) : this.renderMenu(firstItem)
                            })
                        }
                </Menu>
            </Fragment>
        )
    }
}

export default withRouter(AsiderMneu)