import React from 'react'
import { Input, Radio, Col, Row, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import { radioDecideList } from '../../../assets/js/constants'

export default class SdMsg extends React.Component {
    state = {
        useDefaultSdValue: true,
        // useCustomSdValue: false,
        // updateCustomSdProc: "",
        // useMetricsSdValue: false,
    };

    onUseDefaultSdChange = e => {
        this.setState({
            useDefaultSdValue: e.target.value,
        });
    }

    // onUseCustomSdChange = e => {
    //     this.setState({
    //         useCustomSdValue: e.target.value,
    //     });
    // }

    // onUpdateCustomSdProcChange = e => {
    //     this.setState({
    //         updateCustomSdProc: e.target.value,
    //     });
    // }
    
    // onUseMetricsSdChange = e => {
    //     this.setState({
    //         useMetricsSdValue: e.target.value,
    //     });
    // }

    // renderUseCustomSdInput() {
    //     if (this.state.useCustomSdValue) {
    //         return (
    //             <Input className="" 
    //             placeholder='请更新扩充重点监控病种的存储过程名，如："XXXX"' 
    //             value={this.state.updateCustomSdProc} 
    //             allowClear 
    //             suffix={
    //                 <Tooltip placement="right" title='请更新扩充重点监控病种的存储过程名，如："XXXX"'>
    //                     <InfoCircleOutlined className="suffixColor"/>
    //                 </Tooltip>
    //             }
    //             onChange={this.onUpdateCustomSdProcChange} />
    //         )
    //     }
    // }

    render() {
        return (
            <div>
                 <Row gutter={20}>
                    <Col>
                    是否使用重点监控病种
                    </Col>
                    <Col >
                    <Radio.Group 
                        options={radioDecideList} 
                        onChange={this.onUseDefaultSdChange} 
                        value={this.state.useDefaultSdValue}>
                    </Radio.Group>
                    </Col>
                </Row>
                {/* <Row gutter={20}>
                    <Col>
                    是否使用三级公立医院单病种
                    </Col>
                    <Col >
                    <Radio.Group 
                        options={radioDecideList}
                        onChange={this.onUseMetricsSdChange} 
                        value={this.state.useMetricsSdValue}>
                    </Radio.Group>
                    </Col>
                </Row> */}
                {/* <Row gutter={20}>
                    <Col md={9} lg={8} xl={6}>
                    是否使用自定义单病种
                    </Col>
                    <Col>
                    <Radio.Group 
                        options={radioDecideList}
                        onChange={this.onUseCustomSdChange} 
                        value={this.state.useCustomSdValue}>
                    </Radio.Group>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xl={{ span: 12, offset: 6 }} lg={{ span: 14, offset: 8 }} md={{ span: 14, offset: 9 }}>
                        {this.renderUseCustomSdInput()}
                    </Col>
                </Row> */}
            </div>
        )
    }
} 