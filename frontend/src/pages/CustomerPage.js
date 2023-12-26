import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import {
  DeleteOutlined,
  EditOutlined,
  MinusCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  Form,
  Modal,
  Button,
  Input,
  Select,
  message,
  Table,
  columns,
} from "antd";

function CustomerPage() {
  const [billsData, setBillsData] = useState([]);
  const getAllBills = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/bills/getBills"
      );
      setBillsData(data);
    } catch (error) {}
  };

  useEffect(() => {
    getAllBills();
  }, []);

  const columns = [
    { title: "ID", dataIndex: "_id" },

    {
      title: "Customer Name",
      dataIndex: "customerName",
    },

    { title: "Contact Number", dataIndex: "customerNumber" },
  ];

  return (
    <DefaultLayout>
      <h2>Customers</h2>
      <Table columns={columns} dataSource={billsData} bordered />
    </DefaultLayout>
  );
}

export default CustomerPage;
