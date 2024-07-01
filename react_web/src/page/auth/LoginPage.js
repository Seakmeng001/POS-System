// import Password from "antd/es/input/Password";
// import { useState } from "react";
// import {Button } from "react-bootstrap";

 

//  const LoginPage = () =>{
//     const [username,setUername] = useState("")
//     const [password,setPassword] = useState("")


//     const onLogin = () =>{
//         // correct Password
//         const staticUsername= 'sa', staticPassword= "123456"
//         if(username == staticUsername && password == staticPassword){
//             localStorage.setItem("isLogin",'1')
//             window.location.href= "/"
//         }else{
//             alert("username or password incorrect!")
//         }
        
//     }
//     return(
//         <div>
//             <h1>LoginPage</h1>
//             <input
//              placeholder="username" 
//              onChange={(event)=>{
//                 setUername(event.target.value)

//              }}
//             />
//             <input 
//             placeholder="password"
//             onChange={(event)=>{
//                 setPassword(event.target.value)

//              }}
//             />
//             <br/>
//             <button onClick={onLogin}>Login</button>
//             <button >Register</button>

//         </div>
//     )
//  }
//  export default LoginPage;

import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import styles from './LoginPage.module.css';
import {request} from "../../share/request"

const LoginPage = () => {
 
  const onFinish = async(values) => {
    //employee login
    // correct Password
    var param= {
      "tel": values.username,
      "password": values.password,
}

         const res= await request("employee/login","post",param)
         if(res.isSuccess){
          //JSON.stringify(obj) convert object to string
          //JSON.parse(obj) convert object to object json
          
          
          localStorage.setItem("profile",JSON.stringify(res.user)) //user object json
          localStorage.setItem("isLogin",'1')
          window.location.href="/home"  //link to other page
         }else{
          message.warning(res)
         }
  
        
  };
  // firstname, lastname, gender,dob,email,tel,address,role
  return (
    <div className={styles.container}>
        <div className={styles.txtLogin}>Login</div>
        <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Phone number!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Phone number" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="/register">register now!</a>
      </Form.Item>
    </Form>
    </div>
  );
};
export default  LoginPage;