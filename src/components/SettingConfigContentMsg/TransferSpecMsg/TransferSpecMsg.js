import React from 'react'
import { Input, Radio, Col, Row } from 'antd';

import { radioDecideList } from '../../../assets/js/constants'

export default class TransferSpecMsg extends React.Component {
    state = {
        transferEnabledValue: false,
        transferIsToHourValue: false,
    };

    onTransferEnabledChange = e => {
        this.setState({
            transferEnabledValue: e.target.value,
        });
    }

    onTransferIsToHourChange = e => {
        this.setState({
            transferIsToHourValue: e.target.value,
        });
    }

    renderHospCompareRadio(){
        if(this.state.transferEnabledValue){
            return(
                <Row gutter={20}>
                    <Col>
                    转科数据是否精确到小时
                    </Col>
                    <Col >
                        <Radio.Group options={radioDecideList} onChange={this.onTransferIsToHourChange} value={this.state.transferIsToHourValue}>
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
                    是否导入转科数据
                    </Col>
                    <Col >
                        <Radio.Group options={radioDecideList} onChange={this.onTransferEnabledChange} value={this.state.transferEnabledValue}>
                        </Radio.Group>
                    </Col>
                </Row>
                {this.renderHospCompareRadio()}
                
            </div>
        )
    }
} 