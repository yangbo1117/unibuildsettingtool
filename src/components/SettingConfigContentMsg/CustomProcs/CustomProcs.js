import React from 'react'
import { Input, Button, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import _ from 'lodash';

export default class CustomProcs extends React.Component {
    state = {
        customProcsList: [
            { id: 0, value: "" }
        ],
        count:1
    }

    onCustomProcsChange = (id, e) => {
        let { customProcsList } = this.state;
        _.map(customProcsList, item => {
            if (item.id === id) item.value = e.target.value;
        })
        this.setState({
            customProcsList
        });
    };

    onCustomProcsAdd = e => {
        let { customProcsList, count } = this.state;
        customProcsList.push({ id: count, value: "" });
        count++;
        this.setState({ customProcsList, count });
    }

    render() {
        let { customProcsList } = this.state;
        
        return (
            <div>
            {
                _.map(customProcsList, item => {
                    return(
                        <Row>
                            <Col span={12}>
                                <Input placeholder="请输入单个自定义存储过程名" allowClear value={item.value} onChange={this.onCustomProcsChange.bind(this, item.id)} />
                            </Col>
                        </Row>
                    )
                })
            }
            <div>
                <Button type="primary" icon={<PlusOutlined />} onClick={this.onCustomProcsAdd}>
                    新增自定义存储过程名
                </Button>
            </div>
            </div>
        )
    }
}