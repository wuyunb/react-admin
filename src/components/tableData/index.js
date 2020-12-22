import React,{Component,Fragment} from 'react';
import {Table,Pagination,Row,Col,Button,Modal,message} from 'antd';

//propTypes
import propTypes from 'prop-types';
class TableData extends Component{
    constructor(){
        super();
        this.state={
            selectedRowKeys:[],
            pageNumber: 1,
            pageSize:10,
            data:[],
            loadingTab:false,
            //页码
            total:0,
            confirmLoading:false,
            isModalVisible:false
        }
    }
    componentDidMount(){
        this.loadData()
        // 返回子组建的实例
        this.props.onRef(this)
    }
    // 列表数据
    loadData = () =>{
        this.setState({loadingTab:true})
        const {keyWork,pageNumber,pageSize} = this.state
        const requData = {
            pageNumber,
            pageSize
        }
        if (keyWork) requData.name = keyWork
        this.$http({
            url:this.props.tableCofig.url,
            method:this.props.tableCofig.method || 'post',
            data:requData
        }).then(res=>{
            this.setState({
                data:res.data.data,
                total:res.data.total,
                loadingTab:false
            })
        }).catch(error=>{this.setState({loadingTab:false})})
    }
    // 复选框数据
    onCheckbox =(value)=>{
        this.setState({
            selectedRowKeys:value
        })
    }
    // 当前页
    onchangeCurrnePage = (value)=>{
        this.setState({
            pageNumber:value
        },()=>{
            this.loadData()
        })
    }
    pageSizeChange = (value,page)=>{
        this.setState({
            pageNumber:1,
            pageSize:page
        },()=>{
            this.loadData()
        })
    }
    // 删除
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
    // 删除确认
    handleOk = () =>{
        
        const id = this.state.selectedRowKeys.join()
        this.setState({
            confirmLoading:true
        })
        this.$http({
            url:this.props.tableCofig.deleUrl,
            method:'post',
            data:{
                id
            }
        }).then(res=>{
            message.success(res.message)
            this.setState({
                isModalVisible:false,
                id:'',
                confirmLoading:false,
                selectedRowKeys:[] 
            })
            this.loadData()
        }).catch(error=>{
            this.setState({
                isModalVisible:false,
                id:'',
                confirmLoading:false,
                selectedRowKeys:[]
            })
            // message.error(error.message)
        })
    }
    render(){
        const {columns,checkbox} = this.props.tableCofig
        const rowSelection={
            onChange: this.onCheckbox
        }
       return (
           <Fragment>
               <Table pagination={false}   loading={this.state.loadingTab} className="table-wrap" rowKey="id" rowSelection={  checkbox ? rowSelection : null  } columns={columns} dataSource={this.state.data} bordered></Table>
               <Row className="spacing-30">
                    <Col span={8}>
                       {
                         this.props.batchButton &&  <Button  onClick={()=>this.onHadnlerDelete()}>批量删除</Button>
                       }
                    </Col>
                    <Col span={16}>
                        <Pagination
                            onChange={this.onchangeCurrnePage}
                            onShowSizeChange = {this.pageSizeChange}
                            defaultCurrent='1'
                            className="pull-right"
                            total={this.state.total}
                            showSizeChanger
                            showQuickJumper
                            showTotal={total => `Total ${total} items`}
                           
                        />
                    </Col>
                </Row> 
                <Modal title="提示" okText='确认' cancelText="取消" confirmLoading={this.state.confirmLoading} visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={()=>{
                    this.setState({
                        isModalVisible:false
                    })
                }}>
                    <div className="conten-center">
                        <p>您确定要删除吗？<strong>删除后不可恢复</strong></p>
                    </div>
                </Modal>
           </Fragment>
       )
    }
}
// 检验数据类型
TableData.propTypes = {
    tableCofig:propTypes.object 
}
// 默认值
TableData.defaultProps = {
    batchButton:false
}
export default TableData