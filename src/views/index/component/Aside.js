import React,{Component,Fragment} from 'react';
import './sider.scss';


import AsiderMneu from '../../../components/asiderMneu';

class Aside extends Component{
    constructor(){
        super();
        this.state = {};
    }
    render(){
        return (
            <Fragment>
                <h1 className="logo">
                    <span>
                        Logo
                    </span>
                </h1>
                <AsiderMneu></AsiderMneu>
            </Fragment>
        )
    }
}

export default Aside