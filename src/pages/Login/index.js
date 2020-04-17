import React from 'react';
import { Form, Input, Button, message } from 'antd';
import './index.scss'
import { getAccessToken, setCookie } from '../../plugin/GetToken'
import { UserOutlined, LockOutlined } from '@ant-design/icons'


export default class Login extends React.Component{
    state={
        iconLoading:false
    }

  onFinish = values => {
      this.setState({
            iconLoading:true
      })
    getAccessToken(values.username,values.password).then(res=>{
        if(res.status === 200){
            message.success('登录成功！')
            this.setState({
                iconLoading:false
            })
            const options = res.data
            localStorage.setItem('token',options)
            setCookie(options.token_type,options.access_token,options.expires_in)
            this.props.history.push('/home')
        }
    }).catch(error=>{
        this.setState({
            iconLoading:false
        })
        if (error.response) {
            if(error.response.status === 400){
                message.warning('用户名密码错误！')
            }
            if(error.response.status === 500){
                message.error('服务器异常！')
            }
          } 
    })
  };

  
  render(){

      return (
        <div id='login'>
            <section className="login_box">
                <div className='login_box_title'>
                    <img src={require('./img/50X50Logo.png')} alt=''></img>&nbsp;&nbsp;<b>院内版辅助工具</b>
                </div>
                <Form
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onFinish}
                    >
                    <Form.Item
                        name="username"
                        rules={[
                        {
                            required: true,
                            message: '请输入用户名!',
                        },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder='请输入用户名'/>
                    </Form.Item>
                
                    <Form.Item
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: '请输入用户密码!',
                        },
                        ]}
                    >
                        <Input.Password prefix={ <LockOutlined /> } placeholder='请输入用户密码' />
                    </Form.Item>
                
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={this.state.iconLoading}>
                        登录
                        </Button>
                    </Form.Item>
                </Form>
            </section>
        </div>
      );
  }

}