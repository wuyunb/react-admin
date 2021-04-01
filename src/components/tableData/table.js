import React,{Fragment,Component} from 'react';
import {Table,message} from 'antd';
// Pagination,Row,Col,Button,/
import propTypes from 'prop-types';
import { connect } from "react-redux";

    
class table extends Component {
  constructor(){
    super();
        this.state={
          selectedRowKeys:[]
        }
  }
  onHadnlerDelete(id){
    if (id) {
        this.setState({selectedRowKeys:[id]},()=>{
            if (this.state.selectedRowKeys.length < 1) {
                message.error('请选择要删除的数据');
                return false
            }
        })
    }else {
        if (this.state.selectedRowKeys.length < 1) {
            message.error('请选择要删除的数据');
            return false
        }
    }
    this.setState({
        isModalVisible:true,
    })
  }
    render(){
        const {thead} =this.props.tableCofig;
        return (
            <Fragment>
                <Table pagination={false}    bordered className="table-wrap"  columns={thead} dataSource={this.props.list}></Table>
                {/* <Row className="spacing-30">
                        <Col span={8}>
                           {
                             props.batchButton &&  <Button  onClick={props.onHadnlerDelete}>批量删除</Button>
                           }
                        </Col>
                        <Col span={16}>
                            <Pagination
                                onChange={props.onChange}
                                onShowSizeChange = {props.onShowSizeChange}
                                defaultCurrent='1'
                                current={props.pageNumber}
                                className="pull-right"
                                total={props.total}
                                showSizeChanger
                                showQuickJumper
                                showTotal={total => `Total ${total} items`}
                               
                            />
                        </Col>
                    </Row>  */}
            </Fragment>
        )
    }
    
}

table.propTypes = {
    tableCofig:propTypes.object
    // thead:propTypes.array,
    // dataSource:propTypes.array,
    // loading:propTypes.bool,
    // total:propTypes.number,
    // onchangeCurrnePage:propTypes.func,
    // pageSizeChange:propTypes.func,
    // batchButton:propTypes.bool,
    // onHadnlerDelete:propTypes.func,
    // rowSelection:propTypes.object
}
// 默认值
table.defaultProps = {
    // thead:[],
    // dataSource:[],
    // loading:false,
    // batchButton:false
    propTypes:{}
}

// 把store中的数据映射到这个组建变成props
const mapStateToProps = (state) =>{  // mapState 会将数据映射到 this.props
    return{
        list:state.department.departmentList.data && state.department.departmentList.data.data
    }
}
export default connect(
    mapStateToProps,
    null

)(table) 