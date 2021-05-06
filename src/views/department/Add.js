import React,{Component,Fragment} from 'react';
import {validate_num} from '@/utils/validate.js'
import FormCom from '@c/form/Index.js';
class DepartmentAdd extends Component{
    constructor(){
        super();
        this.state = {
            id:"", 
            loading:false,
            formConfig:{
              url:this.api.departmentAdd,  //提交url
              formLayout:{
                labelCol: { span: 2 },
                wrapperCol: { span: 8},
              },
              formItem:[
                {
                  type: 'Input',
                  label: "部门名称", 
                  name: "name", 
                  required: true, 
                  placeholder:"请输入部门名称"
                },
                {
                  type: 'Input',
                  label: "人员数量", 
                  name: "number", 
                  required: true, 
                  placeholder:"请输入人员数量",
                  // 自定义校验
                  rules:[
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            // if (!value) {
                            //     return Promise.reject('请输入人员数量');
                            // }
                          if (value && !validate_num(value)){
                            return Promise.reject('请输入整数!');
                          }
                          return Promise.resolve();
                        },
                      }),
                ]
                },
                // {
                //   type: 'Select',
                //   label: "部门名称", 
                //   name: "sele", 
                //   required: true, 
                //   placeholder:"请选择部门",
                //   options:[
                //     {
                //       label:'研发部',
                //       value:1
                //     },
                //     {
                //       label:'产品部',
                //       value:2
                //     },
                //   ]
                // },
                // {
                //   type:'Switch',
                //   label:'禁/启用',
                //   name:'Switch',
                //   status:0
                // },
                {
                  type:'Radio',
                  label:'禁/启用',
                  name:'status',
                  required: true, 
                  RadioVal:0,
                  status:[
                    {label:'禁用',value:0},
                    {label:'启用',value:1}
                ]
                },
                {
                  type:'TextArea',
                  label:'描述',
                  name:'content',
                }
              ]
            }
        }
    }
    onFinish = (values) => {
        this.setState({
            loading:true
        })
        this.state.id ? this.onEdit(values) : this.onAdd(values)
          
    };
    componentWillMount(){
        console.log(1231231232312,this.props.location.state)
        if (this.props.location.state){
            this.setState({
                id:this.props.location.state.id
            })
        }
    }
    componentDidMount(){
        if (this.props.location.state)this.getDetailed()
        console.log(this.props.location.state)
    }
    // 获取详情数据
    getDetailed = ()=>{
        this.$http({
            url:this.api.departDetai,
            method:'post',
            data:{
                id:this.state.id
            }
        }).then(res=>{
            const {name,number,status,content} = res.data
           this.refs.form.setFieldsValue({name,number,status,content})
        }).then(error=>{

        })
    }
    // 添加信息
    onAdd = (values) =>{
        this.$http({
            url:this.api.departmentAdd,
            method:'post',
            data:values
        }).then(res=>{
           this.setState({
               loading:false
           })
           if (res.resCode === 0 ) {
              //  message.info(res.message);
               // 重置表单
               this.refs.form.resetFields()
           }
        }).catch(error=>{
           this.setState({
               loading:false
           })
        })
    }
    // 编辑信息
    onEdit = (values) =>{
        this.$http({
            url:this.api.departEdit,
            method:'post',
            data:{
                id:this.state.id,
                ...values
            }
        }).then(res=>{
           this.setState({
               loading:false
           })
           if (res.resCode === 0 ) {
              //  message.info(res.message);
               // 重置表单
               this.refs.form.resetFields()
           }
        }).catch(error=>{
           this.setState({
               loading:false
           })
        })
    }
    render(){
        return (
          <Fragment>
              <FormCom formConfig={this.state.formConfig}></FormCom>
          </Fragment>
          
          //   <Form {...layout} ref="form" name="nest-messages" initialValues={{status:true}} onFinish={this.onFinish}>
          //       <Form.Item name="name" label="部门名称" rules={[{ required: true,message: '请输入部门名称！' }]}>
          //       <Input />
          //       </Form.Item>
          //       <Form.Item name='number' label="人员数量" >
          //       <Input />
          //       </Form.Item>
          //       <Form.Item name='status' label="禁/启用">
          //           <Radio.Group >
          //               <Radio value={false}>禁用</Radio>
          //               <Radio value={true}>启动</Radio>
          //           </Radio.Group>
          //       </Form.Item>
          //       <Form.Item name='content' label="描述" >
          //       <TextArea rows={6}/>
          //       </Form.Item>
          //       <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 2 }}>
          //       <Button type="primary" loading={this.state.loading} htmlType="submit">
          //           提交
          //       </Button>
          //       </Form.Item>
          // </Form>
        )
    }
}

export default DepartmentAdd