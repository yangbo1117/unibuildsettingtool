import React from 'react'
import { Radio, Col, Row } from 'antd';

import { radioDecideList, radioPersonalIdColumnList } from '../../../assets/js/constants'

export default class CardInfoMsg extends React.Component {
    state = {
        isToHourValue: false,
        personalIdColumnValue:'SFZH',
        useAdditionalCodeValue: false,
    };

    onIsToHourChange = e => {
        this.setState({
            isToHourValue: e.target.value,
        });
    }

    onPersonalIdColumnChange = e => {
        this.setState({
            personalIdColumnValue: e.target.value,
        });
    }

    onUseAdditionalCodeChange = e => {
        this.setState({
            useAdditionalCodeValue: e.target.value,
        });
    }

    render() {
        return (
            <div>
                 <Row gutter={20}>
                    <Col>
                    病案数据出入院时间
                    </Col>
                    <Col >
                    <Radio.Group options={radioDecideList} onChange={this.onIsToHourChange} value={this.state.isToHourValue}>
                        </Radio.Group>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col>
                    诊断编码是否使用附加码
                    </Col>
                    <Col >
                    <Radio.Group options={radioDecideList} onChange={this.onUseAdditionalCodeChange} value={this.state.useAdditionalCodeValue}>
                        </Radio.Group>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col>
                    患者唯一标识
                    </Col>
                    <Col >
                    <Radio.Group options={radioPersonalIdColumnList} onChange={this.onPersonalIdColumnChange} value={this.state.personalIdColumnValue}>
                        </Radio.Group>
                    </Col>
                </Row>
            </div>
        )
    }
} 