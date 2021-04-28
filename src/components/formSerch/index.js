import React, { Component } from 'react';
import propTypes from 'prop-types';

import { Form, Input, Radio,Select,Button } from 'antd';
//connect
import { connect } from "react-redux";

import { addDepartment } from '@/store/action/Department.js';

import {bindActionCreators} from 'redux';
// 获取列表数据
import {TableList} from "@/config/common.js";
const {TextArea} = Input;
const { Option } = Select;
class FormSerch extends Component {
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
    componentDidMount(){
      // 返回子组建的实例
      this.props.onRef(this)
      this.onSubmit()
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
                  console.log(this.props)
                    item.options = this.props.config.status;
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
    // 搜索
    onSubmit = (value) => {
      console.log(123123,value)
        const searchData = {}
        for (let key in value) {
            if (value[key]!== undefined && value[key] !== "") {
                searchData[key] = value[key]
            }
        }
        console.log(12312312,this.props)
        this.search({
            url:this.props.formConfig.url,
            searchData
        })
    }
    search = (params)=>{
      const requestData = {
          url:params.url,
          data:{
              pageNumber:1,
              pageSize:10
          }
      }
      if (Object.keys(params.searchData).length !== 0) {
          for (let key in params.searchData) {
              requestData.data[key] = params.searchData[key]
          }
      }
      TableList(requestData).then(response =>{
          this.props.listData(response)
      }).catch(error=>{

      })
  }
   
    render() {
        const {formLayout} = this.props.formConfig
        return (
            <Form layout="inline" ref="form" name="nest-messages"  {...formLayout} onFinish={this.onSubmit}>
                {this.initFormItem()}
                <Form.Item >
                    <Button type="primary" loading={this.state.loading} htmlType="submit">搜索</Button>
                </Form.Item>
            </Form>
        )
    }
}
// 检验数据类型
FormSerch.propTypes = {
    formConfig:propTypes.object 
}
const mapStateToProps = (state) => (
    {
        config: state.config
    }
)
const mapDispatchToprops = (dispatch) =>{
    return {
      listData: bindActionCreators(addDepartment,dispatch)
                // bindActionCreators
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToprops,
)(FormSerch) 