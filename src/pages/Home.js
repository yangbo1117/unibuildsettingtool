import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import '../assets/css/home.scss';

import _ from 'lodash';

import logo from './style/50X50Logo.png'

import SettingConfigContent from '../components/SettingConfigContent/SettingConfigContent'

const { Header, Content, Sider } = Layout;

export default class Home extends React.Component {
    state = {
        navBarSelectedKeys:'nav-2',
        navBarSelectedValue:"配置",
        navBarList: [
            {
                key: 'nav-1',
                value: "首页"
            },
            {
                key: 'nav-2',
                value: "配置"
            },
        ],
        sideBarSelectedKeys:'side-1',
        sideBarSelectedValue:"配置生成向导",
        sideBarList: [
            {
                navBarKey: 'nav-2',
                value: [
                    {
                        key: 'side-1',
                        value: "配置生成向导",
                        icon: <UserOutlined/>
                    }
                ]
            },
        ],
    };

    onNavBarHandleClick = e => {
        this.setState({
            navBarSelectedKeys: e.key,
            navBarSelectedValue: e.item.props.children,
        });
    }

    onSideBarHandleClick = e => {
        this.setState({
            sideBarSelectedKeys: e.key,
            sideBarSelectedValue: e.item.props.children,
        });
    }

    render() {
        let { navBarList, sideBarList, navBarSelectedKeys, navBarSelectedValue,sideBarSelectedKeys,sideBarSelectedValue } = this.state;

        sideBarList=_.filter(sideBarList, s => s.navBarKey === navBarSelectedKeys)[0]?.value;

        return (
            <Layout className="layout">
                <Header>
                    <div className="brand">
                        <img className="brand-logo" src={logo} alt='联众' />
                        <div className="brand-text">院内版辅助工具</div>
                    </div>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[navBarSelectedKeys]} onClick={this.onNavBarHandleClick}>
                        {
                            _.map(navBarList,n=>{
                                return (
                                    <Menu.Item key={n.key}>{n.value}</Menu.Item>
                                )
                            })
                        }
                    </Menu>
                    <div className='edition'>V 2.0</div>
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={[sideBarSelectedKeys]}
                            style={{ height: '100%', borderRight: 0 }}
                            onClick={this.onSideBarHandleClick}
                        >
                            {
                                _.map(sideBarList,i=>{
                                    return (
                                    <Menu.Item key={i.key}>{i.icon}{i.value}</Menu.Item>
                                    )
                                })
                            }
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>{navBarSelectedValue}</Breadcrumb.Item>
                            <Breadcrumb.Item>{sideBarSelectedValue}</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 12,
                                margin: 0,
                            }}
                        >
                            <SettingConfigContent></SettingConfigContent>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}