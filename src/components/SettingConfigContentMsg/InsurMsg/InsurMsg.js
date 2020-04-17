import React from 'react'
import { Row, Col, Radio, Checkbox } from 'antd';

import _ from 'lodash';

import { radioDecideDigitList, radioInsurTypeColumnList, radioInsurTypeList } from '../../../assets/js/constants'

// const CheckboxGroup = Checkbox.Group;
// const defaultCheckedList = ['0'];
// const plainOptions = ['0', '01', '02', '03', '04', '05', '06', '07', '08', '99'];

export default class InsurMsg extends React.Component {
    state = {
        insurTypesValue: 0,
        distInsurTypesValue: 0,
        insurTypeColumnValue:'RYBF',
        optInsurTypeValue: true,

        // checkedList: defaultCheckedList,
        indeterminate: true,
        checkAll: false,
    }

    onInsurTypesChange = e => {
        this.setState({
            insurTypesValue: e.target.value,
        });
    }

    onDistInsurTypesValueChange = e => {
        this.setState({
            distInsurTypesValue: e.target.value,
        });
    }

    onInsurTypeColumnValueChange = e => {
        this.setState({
            insurTypeColumnValue: e.target.value,
        });
    }

    onOptInsurTypeChange = e => {
        this.setState({
            optInsurTypeValue: e.target.value,
        });
    }

    // onChangeCheckbox = checkedList => {
    //     this.setState({
    //         checkedList,
    //         indeterminate: !!checkedList.length && checkedList.length < radioInsurTypeList.length,
    //         checkAll: checkedList.length === radioInsurTypeList.length,
    //     });
    // };

    // onCheckAllChangeCheckbox = e => {
    //     this.setState({
    //         checkedList: e.target.checked ? plainOptions : [],
    //         indeterminate: false,
    //         checkAll: e.target.checked,
    //     });
    // };

    renderDistInsurTypesRadio() {
        if (this.state.insurTypesValue === 1) {
            return (
                <div>
                <Row gutter={20}>
                    <Col>
                        院方是否区分医保类型
                    </Col>
                    <Col >
                        <Radio.Group
                            options={radioDecideDigitList}
                            onChange={this.onDistInsurTypesValueChange}
                            value={this.state.distInsurTypesValue}
                        >
                        </Radio.Group>
                    </Col>
                </Row>
                {this.renderInsurTypeColumnRadio()}
                </div>
            )
        }
    }

    renderInsurTypeColumnRadio() {
        if (this.state.distInsurTypesValue === 1) {
            return (
                <div>
                <Row gutter={20}>
                    <Col>
                    医保类型对应字段
                    </Col>
                    <Col >
                        <Radio.Group
                            options={radioInsurTypeColumnList}
                            onChange={this.onInsurTypeColumnValueChange}
                            value={this.state.insurTypeColumnValue}
                        >
                        </Radio.Group>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col>
                        选择医保类型
                    </Col>
                    <Col >
                    <Radio.Group
                            options={radioInsurTypeList}
                            onChange={this.onOptInsurTypeChange}
                            value={this.state.optInsurTypeValue}
                        >
                        </Radio.Group>
                    {/* <div className="site-checkbox-all-wrapper">
                        <Checkbox
                            indeterminate={this.state.indeterminate}
                            onChange={this.onCheckAllChangeCheckbox}
                            checked={this.state.checkAll}>
                            全选
                        </Checkbox>
                    </div>
                    <CheckboxGroup
                        options={radioInsurTypeList}
                        value={this.state.checkedList}
                        onChange={this.onChangeCheckbox}
                    /> */}
                    </Col>
                </Row>

                </div>
            )
        }
    }

    render() {

        return (
            <div>
                <Row gutter={20}>
                    <Col>
                    医院是否使用医保相关功能
                    </Col>
                    <Col >
                        <Radio.Group options={radioDecideDigitList} onChange={this.onInsurTypesChange} value={this.state.insurTypesValue}>
                        </Radio.Group>
                    </Col>
                </Row>
                {this.renderDistInsurTypesRadio()}
            </div>
        )
    }
} 