import React from 'react'
import { Row, Col, Input, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import _ from 'lodash';

export default class DrgsMsg extends React.Component {
    state = {
        drgsAddressValue:"",
        drgsAlternativeAddressesValue:"",
    }

    onDrgsAddressValueChange = e => {
        this.setState({
            drgsAddressValue: e.target.value,
        });
    }

    onDrgsAlternativeAddressesValueChange = e => {
        this.setState({
            drgsAlternativeAddressesValue: e.target.value,
        });
    }

    render() {
        let { drgsAddressValue, drgsAlternativeAddressesValue } = this.state
        return (
            <div>
               <Row gutter={20}>
                    <Col>
                    分组器部署地址
                    </Col>
                    <Col span={14}>
                        <Input
                            placeholder='必填，填写单个地址，如："http://172.16.10.208:7779"'
                            value={drgsAddressValue}
                            allowClear
                            suffix={
                                <Tooltip placement="right" title='填写单个地址，如："http://172.16.10.208:7779"'>
                                    <InfoCircleOutlined className="suffixColor"/>
                                </Tooltip>
                            }
                            onChange={this.onDrgsAddressValueChange} />
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col>
                    其它分组器部署地址
                    </Col>
                    <Col span={18}>
                        <Input
                            placeholder='选填，可填写多个地址（以英文逗号分割），如："http://XXXX","http://XXXX"'
                            value={drgsAlternativeAddressesValue}
                            allowClear
                            suffix={
                                <Tooltip placement="right" title='可填写多个地址（以英文逗号分割），如："http://XXXX","http://XXXX"'>
                                    <InfoCircleOutlined className="suffixColor"/>
                                </Tooltip>
                            }
                            onChange={this.onDrgsAlternativeAddressesValueChange} />
                    </Col>
                </Row>
            </div>
        )
    }
} 