import React from 'react'
import { Row, Col, Radio } from 'antd';

import _ from 'lodash';

import { radioDecideList, radioMedTeamColumnList } from '../../../assets/js/constants'

export default class MedTeamMsg extends React.Component {
    state = {
        useMedTeamValue:false,
        medTeamBelongToCliDeptValue:true,
        medTeamColumnValue:'JXYS',
    }

    onUseMedTeamChange = e => {
        this.setState({
            useMedTeamValue: e.target.value,
        });
    }

    onMedTeamBelongToCliDeptChange = e => {
        this.setState({
            medTeamBelongToCliDeptValue: e.target.value,
        });
    }

    onMedTeamColumnChange = e => {
        this.setState({
            medTeamColumnValue: e.target.value,
        });
    }

    renderHospCompareRadio(){
        if(this.state.useMedTeamValue){
            return(
                <Row gutter={20}>
                    <Col lg={6}>
                        医疗组是否隶属于临床科室
                    </Col>
                    <Col >
                        <Radio.Group 
                            options={radioDecideList} 
                            onChange={this.onMedTeamBelongToCliDeptChange} 
                            value={this.state.medTeamBelongToCliDeptValue}
                        >
                        </Radio.Group>
                    </Col>
                </Row>
            )
        }
    }

    render() {
        return (
            <div>
                <Row gutter={20}>
                    <Col>
                    是否使用医疗组
                    </Col>
                    <Col >
                        <Radio.Group options={radioDecideList} onChange={this.onUseMedTeamChange} value={this.state.useMedTeamValue}>
                        </Radio.Group>
                    </Col>
                </Row>
                {this.renderHospCompareRadio()}
                <Row gutter={20}>
                    <Col>
                    医疗组医生字段
                    </Col>
                    <Col >
                        <Radio.Group options={radioMedTeamColumnList} onChange={this.onMedTeamColumnChange} value={this.state.medTeamColumnValue}>
                        </Radio.Group>
                    </Col>
                </Row>
            </div>
        )
    }
} 