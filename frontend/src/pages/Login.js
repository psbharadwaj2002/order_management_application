import React, { useEffect } from "react";
import { Form, Button, Input, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
// import { response } from "express";

function Login() {
  const navigate = useNavigate();
  const handleSubmit = async (value) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/users/login",
        value
      );
      message.success("User Login successfull");
      localStorage.setItem("auth", JSON.stringify(res.data));
      navigate("/");
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      localStorage.getItem("auth");
      navigate("/");
    }
  }, [navigate]);
  return (
    <div className="register_page">
      <h2>Login here!!</h2>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="userId" label="User ID">
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Input type="password" />
        </Form.Item>

        <div className="d-flex justify-content-between">
          <p>
            <span>Not Registered. Please </span>
            <Link to="/register">Register Here</Link>.
          </p>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Login;
