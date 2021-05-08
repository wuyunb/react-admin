import React,{Component,Fragment} from 'react';
import {Modal,message} from 'antd';
import TableBasis from './table.js';
import FormSerch from "../formSerch";
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
            isModalVisible:false,
            requData:'',
            formConfig:{
                formItem:[
                    { 
                        type: 'Input',
                        label: "部门名称", 
                        name: "name", 
                        placeholder:"请输入部门名称"
                    },
                ]
            }
        }
    }
    componentDidMount(){
        this.loadData()
        // 返回子组建的实例
        this.props.onRef(this)
    }
    // 搜索
    onSerch =(value) =>{
        this.setState({
            pageNumber:1,
            requData:value
        },()=>{
            this.loadData()
        })
        console.table(value)
        // this.loadData()
    }
    // 列表数据
    loadData = () =>{
        this.setState({loadingTab:true})
        const {requData,pageNumber,pageSize} = this.state
        const requDatas = {
            ...requData,
            pageNumber,
            pageSize
        }
        // if (keyWork) requData.name = keyWork
        this.$http({
            url:this.props.tableCofig.url,
            method:this.props.tableCofig.method || 'post',
            data:requDatas
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
        const {thead,checkbox,rowKey} = this.props.tableCofig
        const rowSelection={
            onChange: this.onCheckbox
        }
       return (
           <Fragment>
               <FormSerch formConfig={this.state.formConfig} onSubmit={this.onSerch}></FormSerch>
               <TableBasis 
                thead={thead}  
                dataSource={this.state.data} 
                loading={this.state.loadingTab}
                onChange={this.onchangeCurrnePage}
                onShowSizeChange={this.pageSizeChange}
                total={this.state.total}
                batchButton={this.props.batchButton}
                onHadnlerDelete={()=>this.onHadnlerDelete()}
                rowSelection={checkbox ? rowSelection : null}
                pageNumber={this.state.pageNumber}
                rowKey={rowKey}
                />
               {/* <Table pagination={false}   loading={this.state.loadingTab} className="table-wrap" rowKey="id" rowSelection={    } columns={columns} dataSource={this.state.data} bordered></Table> */}
               
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