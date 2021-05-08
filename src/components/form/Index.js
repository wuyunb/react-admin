<<<<<<< HEAD
/**
 *  封装 form表单
 *  1、初始化表单  
 * 
 **/

 import { Component } from 'react';
 import { Form, Input,Select,Switch,Button,Radio,message} from 'antd';
 const { Option } = Select;
 const { TextArea } = Input;
 class FormCom extends Component {
  constructor(){
    super();
    this.state = {
      loading:false,
      mesPreix:{
        Input:'请输入',
        Radio:'请选择',
        Select:'请选择',
      },
    }
  }

  //初始化
  initFormItem = () =>{
    const {formItem} = this.props.formConfig
    if (!formItem || (formItem && formItem.length === 0)) return false
    const formList = []
    formItem.map(item => {
      switch (item.type) {
        case 'Input':
          formList.push(this.inputElm(item))
          break;
        case 'Select':
          formList.push(this.select(item))  
          break;
        case 'Switch':
          formList.push(this.switchElm(item))
          break;
        case 'Radio':
          formList.push(this.radioElem(item))
          break;
        case 'TextArea':
          formList.push(this.areaElem(item))
          break;
        default:
          break;
      }
      return ''
    })
    return formList
  }
  // 校验
  rules = (item) => {
    let rules = []
    const {mesPreix} = this.state
    // 校验是否必填
    if (item.required) {
      rules.push({required:true,message:`${mesPreix[item.type]}${item.label}`})
    }
    // 自定义校验
    if (item.rules && item.rules.length > 0){
      rules = rules.concat(item.rules)
    }
    return rules
  }
  // input
  inputElm = (item) =>{
    const rules = this.rules(item)
    return (
      <Form.Item label={item.label} name={item.name} rules={rules}>
        <Input style={item.style} placeholder={item.placeholder}/>
    </Form.Item>
    )
  }
  // 选择
  select = (item) =>{
    const rules = this.rules(item)
    return (
      <Form.Item label={item.label} name={item.name} rules={rules}>
      <Select placeholder={item.placeholder}>
        {
          item.options &&  item.options.map(elem=>{
            return <Option value={elem.value} key={elem.value} >{elem.label}</Option>
          })
        }
        {/* <Select.Option value="demo">Demo</Select.Option> */}
      </Select>
    </Form.Item>
    )
  }
  // 开关
  switchElm = (item) =>{
    return (
      <Form.Item label={item.label} name={item.name}>
        <Switch defaultChecked={item.status === 1 ? true : false} onChange={()=>this.switchChange(item)}/>
      </Form.Item>
    )
  }
  switchChange(item){
    item.status = item.status === 1 ? 0 : 1
    console.log(item)
  }
  // 单选
  radioElem = (item)=>{
    const rules = this.rules(item)
    return (
      <Form.Item label={item.label} name={item.name} rules={rules}>
      <Radio.Group >
      {
          item.status && item.status.map(em => {
              return <Radio value={em.value} key={em.value}>{em.label}</Radio>
          })
      }
      </Radio.Group>
      </Form.Item>
    )
  }
  // 文本域
  areaElem = (item)=>{
    const rules = this.rules(item)
    return (
      <Form.Item label={item.label} name={item.name} rules={rules}>
        <TextArea rows={6} />
      </Form.Item>
    )
  }
  // 提交
  onSubmit = (value)=>{
    const {url} = this.props.formConfig
    let requData = {...value}
    this.$http({
      url: url,
      method: 'post',
      data: requData
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
    console.log(value)
  }
  render() {
    const {formLayout} = this.props.formConfig
    return (
      <Form ref="form" {...formLayout} onFinish={this.onSubmit}>
        {this.initFormItem()}
        <Form.Item  wrapperCol={{ ...formLayout.wrapperCol, offset: 2 }}>
            <Button type="primary" loading={this.state.loading} htmlType="submit">
                提交
            </Button>
        </Form.Item>
      </Form>
    )
  }
}


export default FormCom
=======
import React, { Component } from 'react';
import propTypes from 'prop-types';

import { Form, Input, Radio,Select,Button,message } from 'antd';
const {TextArea} = Input;
const { Option } = Select;
class FormCom extends Component {
    constructor() {
        super();
        this.state = {
            mesPreix:{
                Input:'请输入',
                Radio:'请选择',
                Select:'请选择',
            },
            loading:false
        }
    }
    // 初始化
    initFormItem = () => {
        const { formItem } = this.props.formConfig
        // 检测是否存在 formItem
        if (!formItem || (formItem && formItem.length === 0)) return false
        // 循环处理
        const formList = []
        formItem.map(item => {
            switch (item.type) {
                case "Input":
                    formList.push(this.inputElem(item));
                    break;
                case "Radio":
                    formList.push(this.radioElem(item));
                    break;
                case "Select":
                    formList.push(this.selectElem(item));
                    break;
                case "TextArea":
                    formList.push(this.areaElem(item));
                    break;
                default:
                    break;
            }
            return '';
        })
        return formList;

    }
    // 校验
    rules = (item) => {
        const {mesPreix} = this.state
        let rules = []
        // 校验是否必填
        if (item.required) {
            rules.push({ required: true, message: `${mesPreix[item.type]}${item.label}` })
        }
        if (item.rules && item.rules.length > 0) {
            rules=rules.concat(item.rules)
        }
        return rules
    }
    // input 
    inputElem = (item) => {
        const rules = this.rules(item)
        return (
            <Form.Item name={item.name} label={item.label} key={item.name} rules={rules}>
                <Input style={item.style} placeholder={item.placeholder}/>
            </Form.Item>
        )
    }
    // 单选
    radioElem = (item) => {
        const rules = this.rules(item)
        return (
            <Form.Item name={item.name} label={item.label} key={item.name} rules={rules}>
                <Radio.Group >
                    {
                        item.RadioVal && item.RadioVal.map(em => {
                            return <Radio value={em.value} key={em.value}>{em.label}</Radio>
                        })
                    }

                </Radio.Group>
            </Form.Item>
        )
    }
    areaElem = (item)=>{
        const rules = this.rules(item)
        return (
            <Form.Item name={item.name} label={item.label} key={item.name} rules={rules}>
                 <TextArea rows={6} />
            </Form.Item>
        )
    }
    // select
    selectElem = (item) => {
        const rules = this.rules(item)
        return (
            <Form.Item name={item.name} label={item.label} key={item.name} rules={rules}>
                <Select style={item.style} placeholder={item.placeholder}>
                    {
                         item.options && item.options.map(elem=>{
                            return  <Option value={elem.value} key={elem.value}>{elem.label}</Option>
                        })
                    }
                   
                </Select>
            </Form.Item>

        )
    }
    // 提交
    onSubmit = (value) => {
        this.setState({
            loading: true
        })
        const {url,edId} = this.props.formConfig
        let requData = null
        if (edId) requData={ ...value,id:edId}
        this.$http({
            url: url,
            method: 'post',
            data: requData
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
        // this.props.onSubmit(value)
    }
    // 监听父组建传的值
    componentWillReceiveProps({formConfig}){
        if (formConfig.setFieldsValue) this.refs.form.setFieldsValue(formConfig.setFieldsValue)
        // this.setState({
        //     username,
        //     type
        // })
    }
    render() {
        const {formLayout} = this.props.formConfig
        return (
            <Form ref="form" name="nest-messages" initialValues={{ status: true }} {...formLayout} onFinish={this.onSubmit}>
                {this.initFormItem()}
                <Form.Item  wrapperCol={{ ...formLayout.wrapperCol, offset: 2 }}>
                    <Button type="primary" loading={this.state.loading} htmlType="submit">
                                提交
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}
// 检验数据类型
FormCom.propTypes = {
    formConfig:propTypes.object 
}

export default FormCom

>>>>>>> 7b19cc583112e82e2453c2f20910da7ad0f1196d
