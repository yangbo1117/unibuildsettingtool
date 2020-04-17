import React from 'react'
import { Input, Row, Col, Radio, Button, Tooltip } from 'antd';
import { PlusOutlined, InfoCircleOutlined, MinusOutlined } from '@ant-design/icons';

import { radioDecideList, radioTableTypeList, radioImportTypeList, radioImportDataTypeList } from '../../../assets/js/constants'

import _ from 'lodash';

export default class HospMsg extends React.Component {
    state = {
        dataImportsList: [
            {
                id: 0, 
                inputHospCodeValue: '',
                importDataTypeValue: 0,
                importTypeValue: 0,
                storedPathValue: "",
                tableTypeValue: 0,
            }
        ],
        count: 1,

        multiHospsValue: false,
        hospCompareValue:false
    }

    onUseMultiHospsChange = e => {
        this.setState({
            multiHospsValue: e.target.value,
        });
    }

    onHospCompareChange = e => {
        this.setState({
            hospCompareValue: e.target.value,
        });
    }

    onAdd = () => {
        let { dataImportsList, count } = this.state;
        count = dataImportsList.length;
        dataImportsList.push({ 
            id: count, 
            inputHospCodeValue: '', 
            importDataTypeValue: 0, 
            importTypeValue: 0, 
            storedPathValue: "", 
            tableTypeValue: 0 
        })
        this.setState({
            dataImportsList, count
        })
    };

    onDelete = () => {
        let { dataImportsList } = this.state;
        dataImportsList.pop()
        this.setState({
            dataImportsList
        })
    };
    
    onHospCodeChange = (id, e) => {
        let { dataImportsList } = this.state;
        _.map(dataImportsList, item => {
            if (item.id === id) item.inputHospCodeValue = e.target.value;
        })
        this.setState({
            dataImportsList
        });
    };

    onImportDataTypeChange = (id, e) => {
        let { dataImportsList } = this.state;
        _.map(dataImportsList, item => {
            if (item.id === id) item.importDataTypeValue = e.target.value;
        })
        this.setState({
            dataImportsList
        });
    };

    onImportTypeChange =  (id, e) => {
        let { dataImportsList } = this.state;
        _.map(dataImportsList, item => {
            if (item.id === id) item.importTypeValue = e.target.value;
        })
        this.setState({
            dataImportsList
        });
    };

    onStoredPathChange = (id, e) => {
        let { dataImportsList } = this.state;
        _.map(dataImportsList, item => {
            if (item.id === id) item.storedPathValue = e.target.value;
        })
        this.setState({
            dataImportsList
        });
    };

    onTableTypeChange =  (id, e) => {
        let { dataImportsList } = this.state;
        _.map(dataImportsList, item => {
            if (item.id === id) item.tableTypeValue = e.target.value;
        })
        this.setState({
            dataImportsList
        });
    };

    renderHospCompareRadio(){
        if(this.state.multiHospsValue){
            return(
                <Row gutter={20}>
                    <Col>
                        是否跨院对比
                    </Col>
                    <Col >
                        <Radio.Group options={radioDecideList} onChange={this.onHospCompareChange} value={this.state.hospCompareValue}>
                        </Radio.Group>
                    </Col>
                </Row>
            )
        }
    }

    renderAddButon(){
        if(this.state.multiHospsValue){
            return(
                <Button type="primary" icon={<PlusOutlined />} onClick={this.onAdd}>
                    新增
                </Button>
            )
        }
    }

    renderDelteButon(){
        if(this.state.multiHospsValue){
            return(
                <Button type="primary" danger icon={<MinusOutlined />} onClick={this.onDelete}>
                    删除
                </Button>
            )
        }
    }

    renderHospInput(item){
        if(this.state.multiHospsValue){
            return(
                <Row gutter={20}>
                <Col>
                    医院编码
                </Col>
                <Col span={16}>
                    <Input
                        placeholder='请输入Hospcode，如："530000000462"'
                        value={item.inputHospCodeValue}
                        allowClear
                        suffix={
                            <Tooltip placement="right" title='请输入Hospcode，如："530000000462"'>
                                <InfoCircleOutlined className="suffixColor"/>
                            </Tooltip>
                        }
                        onChange={this.onHospCodeChange.bind(this, item.id)} />
                </Col>
            </Row>
            )
        }
    }

    render() {
        let { dataImportsList } = this.state;

        return (
            <div>
                <Row gutter={20}>
                    <Col>
                        是否使用分院
                    </Col>
                    <Col >
                        <Radio.Group options={radioDecideList} onChange={this.onUseMultiHospsChange} value={this.state.multiHospsValue}>
                        </Radio.Group>
                    </Col>
                </Row>
                {this.renderHospCompareRadio()}
                {
                    dataImportsList.map(item => {
                        return (
                            <div className="border-card" key={item.id}>
                                {this.renderHospInput(item)}
                                <Row gutter={20}>
                                    <Col>
                                        输入数据类型
                                    </Col>
                                    <Col>
                                        <Radio.Group options={radioImportDataTypeList} onChange={this.onImportDataTypeChange.bind(this, item.id)} value={item.importDataTypeValue}>
                                        </Radio.Group>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col>
                                    数据源输入路径
                                    </Col>
                                    <Col span={16} >
                                    <Input 
                                        placeholder='选填，输入上传数据存储路径，如："D:\\Unionnet\\upload"' 
                                        allowClear 
                                        value={this.state.storedPathValue} 
                                        onChange={this.onStoredPathChange.bind(this, item.id)} 
                                        suffix={
                                            <Tooltip placement="right" title="未指定的情况下，会继承privatesettings.json中FileImportOptions属性的设置">
                                                <InfoCircleOutlined className="suffixColor"/>
                                            </Tooltip>
                                        }/>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col>
                                        数据源类型
                                    </Col>
                                    <Col span={20}>
                                        <Radio.Group options={radioTableTypeList} onChange={this.onTableTypeChange.bind(this, item.id)} value={item.tableTypeValue}>
                                        </Radio.Group>
                                    </Col>
                                </Row>
                            </div>
                        )
                    })
                }
                <div>
                    {this.renderAddButon()}
                    {this.renderDelteButon()}
                </div>
            </div>
        )
    }
} 