import React from 'react';
import {request} from "../../share/request"
import { useState } from "react";
import { LockOutlined, UserOutlined, CalendarFilled} from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Select, message } from 'antd';
import styles from './LoginPage.module.css';


const RegisterPage = () =>{
 
  // const handleRegister= () => {
      
  //     const[values,setValues]= useState({
  //       firstname: '',
  //       lastname: '',
  //       gender: '',
  //       dob: '',
  //       email: '',
  //       tel: '',
  //       password: '',

  //     })
  //     const handleChange= (event) => {
  //       setValues({...values,[event.target.firstname]:[event.target.values]})
  //     }
  //   } 
      
    return(
        
            <div className={styles.container}>
        <div className={styles.txtLogin}>Register</div>
        <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
    //  onClick={ handleChange}
    >
      <Form.Item
        name="firstname"
        rules={[
          {
            required: true,
            message: 'Please input your firstname!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Firstname" />
      </Form.Item>
      <Form.Item
        name="lastname"
        rules={[
          {
            required: true,
            message: 'Please input your lastname!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Lastname" />
      </Form.Item>
      
      <Form.Item
        name="gender"
        rules={[
          {
            required: true,
           
          },
        ]}
      >
        <Select placeholder="Gender" allowClear>
                <Select.Option value={"1"}>Male</Select.Option>
                <Select.Option value={"0"}>Female</Select.Option>
              </Select>
      </Form.Item>
      <Form.Item
        name="dob"
        rules={[
          {
            required: true,
           
          },
        ]}
      >
        <Input 
          type="date"
         placeholder="Date of birth" />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input  placeholder=" Email" />
      </Form.Item>
      <Form.Item
        name="tel"
        rules={[
          {
            required: true,
            message: 'Please input your Telephone',
          },
        ]}
      >
        <Input  placeholder=" Telephone" />
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
      <Form.Item
        name="role"
        rules={[
          {
            required: true,
            message: 'Please input your role!',
          },
        ]}
      >
        <Input  placeholder="Role" />
        <a href="/login">Aleady have account?</a>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
         <a href="/login">Register</a>
        </Button>
      </Form.Item>
      
     
    </Form>
        </div>
    )
}
export default RegisterPage;