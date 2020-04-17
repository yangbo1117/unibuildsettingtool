import React from 'react'
import { Row, Col, InputNumber, Input } from 'antd';

import _ from 'lodash';

export default class SqlExecutorMsg extends React.Component {
    state = {
        expireValue: 300,
        timeoutValue: 600,
        genCustomFeaturesProcsValue:""
    }

    onExpireChange = e => {
        this.setState({
            expireValue: e.target.value,
        });
    }

    onTimeoutChange = e => {
        this.setState({
            timeoutValue: e.target.value,
        });
    }

    onGenCustomFeaturesProcsChange = e => {
        this.setState({
            genCustomFeaturesProcsValue: e.target.value,
        });
    }

    render() {
        let { expireValue, timeoutValue, genCustomFeaturesProcsValue } = this.state
        return (
            <div>
                <Row gutter={20}>
                    <Col>
                    缓存过期时间（S）
                    </Col>
                    <Col>
                    <InputNumber 
                    defaultValue={expireValue} 
                    onChange={this.onExpireChange} />
                    </Col>
                  </Row>
                  <Row gutter={20}>
                      <Col>
                      存储过程最长执行时间（S）
                      </Col>
                      <Col>
                      <InputNumber 
                        defaultValue={timeoutValue} 
                        onChange={this.onTimeoutChange} />
                    </Col>
                  </Row>
                  <Row gutter={20}>
                    <Col>
                    自定义存储过程列表
                    </Col>
                    <Col span={16}>
                        <Input
                            placeholder='可填写多个存储过程（以英文逗号分割），如："XXX","XXX"'
                            value={genCustomFeaturesProcsValue}
                            allowClear
                            onChange={this.onGenCustomFeaturesProcsChange} />
                    </Col>
                  </Row>
            </div>
        )
    }
} 