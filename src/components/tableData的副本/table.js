import React,{Fragment} from 'react';
import {Pagination,Row,Col,Button,Table} from 'antd';
import propTypes from 'prop-types';

const table = (props) =>{
    return (
        <Fragment>
            <Table pagination={false} rowKey={props.rowKey ? props.rowKey : 'id'} rowSelection={props.rowSelection}  bordered className="table-wrap"  columns={props.thead} dataSource={props.dataSource}></Table>
            <Row className="spacing-30">
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
                </Row> 
        </Fragment>
    )
}
table.propTypes = {
    thead:propTypes.array,
    dataSource:propTypes.array,
    loading:propTypes.bool,
    total:propTypes.number,
    onchangeCurrnePage:propTypes.func,
    pageSizeChange:propTypes.func,
    batchButton:propTypes.bool,
    onHadnlerDelete:propTypes.func,
    rowSelection:propTypes.object
}
// 默认值
table.defaultProps = {
    thead:[],
    dataSource:[],
    loading:false,
    batchButton:false
}

export default table