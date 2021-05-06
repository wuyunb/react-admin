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
