import React from 'react'
import { Row, Col, InputNumber, Button } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

import _ from 'lodash';

export default class RwRangeMsg extends React.Component {
    state = {
        count: 4,
        rwRangesList: [
            {
                code: 0, 
                lowerBoundValue: 0,
                upperBoundValue: 1,
            },
            {
                code: 1, 
                lowerBoundValue: 1,
                upperBoundValue: 2,
            },
            {
                code: 2, 
                lowerBoundValue: 2,
                upperBoundValue: 5,
            },
            {
                code: 3, 
                lowerBoundValue: 5,
                upperBoundValue: 10,
            },
            {
                code: 4, 
                lowerBoundValue: 10,
                upperBoundValue: 9999,
            },
        ],
    }

    onLowerBoundChange = (code, value) => {
        let { rwRangesList } = this.state;
        _.map(rwRangesList, item => {
            if (item.code === code) item.lowerBoundValue =value;
        })
        this.setState({
            rwRangesList
        });

    }

    onUpperBoundChange = (code, value) => {
        let { rwRangesList } = this.state;
        _.map(rwRangesList, item => {
            if (item.code === code) item.upperBoundValue =value;
        })
        this.setState({
            rwRangesList
        });

    }

    onAdd = () => {
        let { rwRangesList, count } = this.state;
        count = rwRangesList.length;
        rwRangesList.push({ 
            code: count, 
            lowerBoundValue: 0,
            upperBoundValue: 0, 
        })
        this.setState({
            rwRangesList, count
        })
    };

    onDelete = () => {
        let { rwRangesList } = this.state;
        rwRangesList.pop()
        this.setState({
            rwRangesList
        })
    };

    render() {
        let { rwRangesList } = this.state;

        return (
            <div>
                {
                    _.map(rwRangesList, item => { 
                        return(
                            <Row gutter={24} key={item.code}>
                                <Col>
                                第{item.code}段RW区间
                                </Col>
                                <Col >
                                下界
                                <div>
                                <InputNumber 
                                    min={0} 
                                    max={9999}
                                    defaultValue={item.lowerBoundValue} 
                                    onChange={this.onLowerBoundChange.bind(this, item.code)} />
                                </div>
                                </Col>
                                <Col >
                                上界
                                <div>
                                <InputNumber 
                                    min={item.lowerBoundValue}
                                    max={9999}
                                    defaultValue={item.upperBoundValue} 
                                    onChange={this.onUpperBoundChange.bind(this, item.code)} />
                                </div>
                                </Col>
                            </Row>
                        )
                    })
                }
                
                <Button type="primary" icon={<PlusOutlined />} onClick={this.onAdd}>
                    添加
                </Button>

                <Button type="primary" danger icon={<MinusOutlined />} onClick={this.onDelete}>
                    删除
                </Button>
            </div>
        )
    }
} 