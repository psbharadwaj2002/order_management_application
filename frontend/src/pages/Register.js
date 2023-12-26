import { Form, Button, Input, Select } from "antd";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import { Form, Button, Input, Select } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

function Register() {
  const navigate = useNavigate();
  const handleSubmit = async (value) => {
    try {
      await axios.post("http://localhost:8000/api/users/register", value);
      message.success("Registered successfull");
      navigate("/login");
    } catch (error) {
      message.error("Something went wrong");
      console.log(`Error => ${error.message}`);
    }
    console.log(value);
  };

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      localStorage.getItem("auth");
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="register_page">
      <h2>Register here!!</h2>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="name" label="Name">
          <Input />
        </Form.Item>
        <Form.Item name="userId" label="User ID">
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Input />
        </Form.Item>

        <div className="d-flex justify-content-between">
          <p>
            <span>Already Registered. Please </span>
            <Link to="/login">Login Here</Link>.
          </p>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Register;
