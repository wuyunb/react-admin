import React,{Component,Fragment} from 'react';
import {Form,Input,Button,Switch, message} from 'antd';
import {Link} from 'react-router-dom';
import TableData from '@c/tableData';
class DepartmentList extends Component{
    constructor(){
        super();
        this.state = {
            keyWork:'',   // 部门名称-搜索
            id:'',
            // 子组建传参
            tableCofig:{
                url:this.api.departmentList,// url
                checkbox:true,  // 复选框
                deleUrl:this.api.departmentDele,
                // tableTitle
                columns:[
                    {title:'部门名称',dataIndex:"name",key:"name"},
                    {title:'禁启用',dataIndex:"status",key:"status",
                    render:(text,rowData)=>{
                        return  <Switch checkedChildren="启用" unCheckedChildren="禁用" onChange={()=>this.switchChange(rowData)} loading={rowData.id === this.state.id} defaultChecked={rowData.status === '1' ? true : false } />
                    }
                },
                    {title:'人员数量',dataIndex:"number",key:"number"},
                    {title:'操作',dataIndex:"operation",key:"operation",width:215,
                        render:(text,rowData)=>{
                            return (
                                <div className="inline-button">
                                    {/* <Button type="primary" onClick={()=>this.onHadnlerEdit(rowData.id)}>编辑</Button> */}
                                    <Button type="primary">
                                        {/* <Link to={'/index/department/add?id='+rowData.id}>
                                            编辑
                                        </Link> */} 
                                        <Link to={{pathname:'/index/department/add',state:{id:rowData.id}}}>
                                        编辑
                                        </Link>
                                    </Button>
                                    <Button onClick={()=>this.delete(rowData.id)}>删除</Button>
                                </div>
                            )
                        }
                    },
                ],
            },
            data:[]
        }
    }
    // 搜索
    onFinish = (valus)=>{
        this.setState({
            keyWork:valus.username,
            pageNumber:1,
            pageSize:10,
        })
        this.tableComponent.loadData()
        
    }
    // 禁启用
    switchChange(val){
        const {id,status} = val
        if (!id) return false
        this.setState({id})
        this.$http({
            url:this.api.status,
            method:'post',
            data:{
                id,
                status: status === '1'? false : true
            }
        }).then((res)=>{
            message.success(res.message)
            this.setState({id:''})
        }).catch(error=>{
            message.error(error.message)
            this.setState({id:''})
        })
     }
    //  编辑
    onHadnlerEdit(id){
        this.props.history.push('/index/department/add/?id='+id)
    }
    /*
    在父组建获取子组建的实例
    1、在子组建调用父组建方法，并把子组建实例传回给父组建，已存储了子组建的实例
    2、通过实例调用子组建的方法
    */ 
   getChildRef = (ref) => {
       console.log(ref)
     this.tableComponent = ref // 存储子组建
   }
    //  删除
    delete = (id)=>{
     this.tableComponent.onHadnlerDelete(id)
   }
    render(){
        return (
            <Fragment>
                <Form layout="inline" onFinish={this.onFinish}>
                    <Form.Item label="部门名称" name="username">
                        <Input placeholder="请输入部门名称"/>
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">搜索</Button>
                    </Form.Item> 
                </Form>
                {/* 表格 */}
                <TableData  onRef={this.getChildRef} batchButton={true} keyWork={this.state.keyWork} tableCofig={this.state.tableCofig}/>
                {/* <Table  className="table-wrap" rowKey="id" rowSelection={rowSelection} columns={columns} dataSource={data} bordered></Table> */}
                
            </Fragment>
        )
    }
}
export default DepartmentList