import React, { Component, Fragment } from 'react';
import FormCom from '@/components/form/Index.js';
import {message } from 'antd';
import {validate_num} from '@/utils/validate.js'
import Store from '@/store/index'

class DepartmentAdd extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            loading: false,
            formConfig:{
                url:this.api.departmentAdd,
                formLayout:{
                    labelCol: { span: 2 },
                    wrapperCol: { span: 8 },
                },
                setFieldsValue:{},
                edId:'',
                formItem: [
                    { 
                        type: 'Input',
                        label: "部门名称", 
                        name: "name", 
                        required: true, 
                        // style: { width: "200px" },
                        placeholder:"请输入部门名称"
                    },
                    { 
                        type: 'Input',
                        label: "人员数量", 
                        name: "number", 
                        // required: true, 
                        // style: { width: "200px" },
                        placeholder:"请输入人员数量",
                        rules:[
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value) {
                                        return Promise.reject('请输入人员数量');
                                    }
                                  if (!validate_num(value)){
                                    return Promise.reject('请输入非整数!');
                                  }
                                  return Promise.resolve();
                                },
                              }),
                        ]
                    },
                    {
                        type: 'Radio', label: "禁/启用", name: "status", required: true, RadioVal: Store.getState().config.status,
                        // style: { width: "200px" }
                    },
                    {
                        type:'TextArea',label:"描述",name:"content"
                    },
                    // {
                    //     type: "Select", 
                    //     label: '部门', 
                    //     name: 'sele', 
                    //     required: true, 
                    //     options: [
                    //         {
                    //             label: '研发部', value: 'a',
                    //         },
                    //         {
                    //             label: '行政部', value: 'b',
                    //         }
                    //     ],
                    //     // style: { width: "200px" },
                    //     placeholder:"请选择部门"
                    // },
                ]
            }
            
        }
    }
    onFinish = (values) => {
        // this.setState({
        //     loading: true
        // })
        // this.state.id ? this.onEdit(values) : this.onAdd(values)

    };
    // 获取部门传的id
    componentWillMount() {
        if (this.props.location.state) {
            // Object.assign   复制多个对象并返回
            let data = Object.assign({}, this.state.formConfig, { edId: this.props.location.state.id })
            this.setState({
                formConfig: data
            })
        }
    }
    componentDidMount() {
        if (this.props.location.state) this.getDetailed()
    }
    // 获取详情数据
    getDetailed = () => {
        this.$http({
            url: this.api.departDetai,
            method: 'post',
            data: {
                id: this.state.formConfig.edId
            }
        }).then(res => {
            let data = Object.assign({}, this.state.formConfig, { setFieldsValue: res.data,url:this.api.departEdit },)
            this.setState({formConfig:data})
        }).then(error => {

        })
    }
    // 添加信息
    onAdd = (values) => {
        this.$http({
            url: this.api.departmentAdd,
            method: 'post',
            data: values
        }).then(res => {
            this.setState({
                loading: false
            })
            if (res.resCode === 0) {
                message.info(res.message);
                // 重置表单
                this.refs.form.resetFields()
            }
        }).catch(error => {
            this.setState({
                loading: false
            })
        })
    }
    // 编辑信息
    onEdit = (values) => {
        this.$http({
            url: this.api.departEdit,
            method: 'post',
            data: {
                id: this.state.id,
                ...values
            }
        }).then(res => {
            this.setState({
                loading: false
            })
            if (res.resCode === 0) {
                message.info(res.message);
                // 重置表单
                this.refs.form.resetFields()
            }
        }).catch(error => {
            this.setState({
                loading: false
            })
        })
    }
    render() {
        return (
            <Fragment>
                <FormCom formConfig={this.state.formConfig} ref="FormComs"/>
                {/* <Form {...layout} ref="form" name="nest-messages" initialValues={{ status: true }} onFinish={this.onFinish}>
                    <Form.Item name="name" label="部门名称" rules={[{ required: true, message: '请输入部门名称！' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name='number' label="人员数量" >
                        <Input />
                    </Form.Item>
                    <Form.Item name='status' label="禁/启用">
                        <Radio.Group >
                            <Radio value={false}>禁用</Radio>
                            <Radio value={true}>启动</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name='content' label="描述" >
                        <TextArea rows={6} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 2 }}>
                        
                    </Form.Item>
                </Form> */}
                {/* <Button type="primary" onClick={this.onFinish} htmlType="submit">
                            提交
                </Button> */}
            </Fragment>
        )
    }
}

export default DepartmentAdd