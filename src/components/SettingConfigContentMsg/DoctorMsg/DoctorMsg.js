import React from 'react'
import { Row, Col, Radio } from 'antd';

import _ from 'lodash';

import { radioDecideList } from '../../../assets/js/constants'

export default class DoctorMsg extends React.Component {
    state = {
        isDoctorJobNoValue:false,
        importDoctorFromCardValue:true,
    }

    onIsDoctorJobNoChange = e => {
        this.setState({
            isDoctorJobNoValue: e.target.value,
        });
    }

    onImportDoctorFromCardChange = e => {
        this.setState({
            importDoctorFromCardValue: e.target.value,
        });
    }

    render() {
        return (
            <div>
                <Row gutter={20}>
                    <Col>
                    医生是否使用工号
                    </Col>
                    <Col >
                        <Radio.Group options={radioDecideList} onChange={this.onIsDoctorJobNoChange} value={this.state.isDoctorJobNoValue}>
                        </Radio.Group>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col>
                    是否自动从病案数据中导入医生信息
                    </Col>
                    <Col >
                        <Radio.Group options={radioDecideList} onChange={this.onImportDoctorFromCardChange} value={this.state.importDoctorFromCardValue}>
                        </Radio.Group>
                    </Col>
                </Row>
            </div>
        )
    }
} 