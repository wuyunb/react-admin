import React,{Component,Fragment} from 'react';
import  Router from '../../router/index';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

class AsiderMneu extends Component{
    constructor(){
        super();
        this.state = {};
        console.log(Router)
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
        return (
            <Fragment>
                <Menu
                    mode="inline"
                    theme="dark"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
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

export default AsiderMneu