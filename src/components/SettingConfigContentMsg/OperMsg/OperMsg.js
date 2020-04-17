import React from 'react'
import { Row, Col, Radio } from 'antd';

import _ from 'lodash';

import { radioDecideList, radioValidOperRuleList } from '../../../assets/js/constants'

export default class OperMsg extends React.Component {
    state = {
        useOperGroupSortValue: false,
        useExtendedOperCodeValue: false,
        // useCombinedOperValue: false,
        useManualPrimaryOperManipulationValue: false,
        useDaySurgeryValue: true,
        useMultiPrimaryOperValue: true,
        useHospOperRateValue: false,
        useValidOperRuleValue: 0,
    }

    onUseOperGroupSortChange = e => {
        this.setState({
            useOperGroupSortValue: e.target.value,
        });
    }

    onUseExtendedOperCodeChange = e => {
        this.setState({
            useExtendedOperCodeValue: e.target.value,
        });
    }

    // onUseCombinedOperChange = e => {
    //     this.setState({
    //         useCombinedOperValue: e.target.value,
    //     });
    // }

    onUseManualPrimaryOperManipulationChange = e => {
        this.setState({
            useManualPrimaryOperManipulationValue: e.target.value,
        });
    }

    onUseDaySurgeryChange = e => {
        this.setState({
            useDaySurgeryValue: e.target.value,
        });
    }

    onUseMultiPrimaryOperChange = e => {
        this.setState({
            useMultiPrimaryOperValue: e.target.value,
        });
    }
    onUseHospOperRateChange = e => {
        this.setState({
            useHospOperRateValue: e.target.value,
        });
    }

    onValidOperRuleChange = e => {
        this.setState({
            useValidOperRuleValue: e.target.value,
        });
    }

    renderValidOperRuleRadio() {
        if (this.state.useHospOperRateValue) {
            return (
                <Row gutter={20}>
                    <Col>
                        手术人次判定规则
                    </Col>
                    <Col >
                        <Radio.Group
                            options={radioValidOperRuleList}
                            onChange={this.onValidOperRuleChange}
                            value={this.state.useValidOperRuleValue}
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
                {/* <Row gutter={20}>
                    <Col>
                    是否使用手术组序号
                    </Col>
                    <Col >
                        <Radio.Group options={radioDecideList} onChange={this.onUseOperGroupSortChange} value={this.state.useOperGroupSortValue}>
                        </Radio.Group>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col>
                    是否使用手术扩码
                    </Col>
                    <Col >
                        <Radio.Group options={radioDecideList} onChange={this.onUseExtendedOperCodeChange} value={this.state.useExtendedOperCodeValue}>
                        </Radio.Group>
                    </Col>
                </Row> */}
                {/* <Row gutter={20}>
                    <Col>
                        是否使用联合手术
                    </Col>
                    <Col >
                        <Radio.Group options={radioDecideList} onChange={this.onUseCombinedOperChange} value={this.state.useCombinedOperValue}>
                        </Radio.Group>
                    </Col>
                </Row> */}
                {/* <Row gutter={20}>
                    <Col>
                    是否支持手动修改每台手术的主手术
                    </Col>
                    <Col >
                        <Radio.Group options={radioDecideList} onChange={this.onUseManualPrimaryOperManipulationChange} value={this.state.useManualPrimaryOperManipulationValue}>
                        </Radio.Group>
                    </Col>
                </Row> */}
                {/* <Row gutter={20}>
                    <Col>
                    是否使用日间手术
                    </Col>
                    <Col >
                        <Radio.Group options={radioDecideList} onChange={this.onUseDaySurgeryChange} value={this.state.useDaySurgeryValue}>
                        </Radio.Group>
                    </Col>
                </Row> */}
                {/* <Row gutter={20}>
                    <Col>
                    是否使用多台次主手术模式
                    </Col>
                    <Col >
                        <Radio.Group options={radioDecideList} onChange={this.onUseMultiPrimaryOperChange} value={this.state.useMultiPrimaryOperValue}>
                        </Radio.Group>
                    </Col>
                </Row> */}
                <Row gutter={20}>
                    <Col>
                        是否使用医院填写的手术等级
                    </Col>
                    <Col >
                        <Radio.Group options={radioDecideList} onChange={this.onUseHospOperRateChange} value={this.state.useHospOperRateValue}>
                        </Radio.Group>
                    </Col>
                </Row>
                {this.renderValidOperRuleRadio()}
            </div>
        )
    }
} 