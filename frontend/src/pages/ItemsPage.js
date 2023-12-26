import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Form, Modal, Button, Input, Select, message } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Table } from "antd";

function ItemsPage() {
  const [itemsData, setItemsData] = useState([]);
  const dispatch = useDispatch();
  const [popUpModel, setPopUpModel] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const getAllItems = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/items/getItems"
      );
      setItemsData(data);
    } catch (error) {}
  };

  useEffect(() => {
    getAllItems();
  }, []);

  const handleDelete = async (record) => {
    try {
      await axios.post("http://localhost:8000/api/items/deleteItem", {
        itemId: record._id,
      });
      message.success("Item Deleted Successfully");
      getAllItems();
      setPopUpModel(false);
    } catch (error) {
      message.error("Something went wrong");
      console.log(`Error => ${error.message}`);
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name" },

    {
      title: "Image",
      dataIndex: "image",

      render: (image, record) => (
        <img src={image} alt={record.name} height="60" width="60" />
      ),
    },

    { title: "Price", dataIndex: "price" },

    {
      title: "Actions",
      dataIndex: "._id",
      render: (id, record) => (
        <div>
          <EditOutlined
            style={{ cursor: "pointer" }}
            className="mx-3"
            onClick={() => {
              setEditItem(record);
              setPopUpModel(true);
            }}
          />
          <DeleteOutlined
            style={{ cursor: "pointer" }}
            className="mx-3"
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];

  const handleSubmit = async (value) => {
    if (editItem === null) {
      try {
        const res = await axios.post(
          "http://localhost:8000/api/items/addItems",
          value
        );
        message.success("Item added successfully");
        getAllItems();
        setPopUpModel(false);
      } catch (error) {
        message.error("Something went wrong");
        console.log(`Error => ${error.message}`);
      }
    } else {
      try {
        const res = await axios.put(
          "http://localhost:8000/api/items/editItem",
          { ...value, itemId: editItem._id }
        );
        message.success("Item added successfully");
        getAllItems();
        setPopUpModel(false);
      } catch (error) {
        message.error("Something went wrong");
        console.log(`Error => ${error.message}`);
      }
    }
  };

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Items Page</h1>
        <Button
          type="primary"
          onClick={() => setPopUpModel(true)}
          style={{ cursor: "pointer" }}
        >
          Add Item
        </Button>
      </div>
      <Table columns={columns} dataSource={itemsData} bordered />

      {popUpModel && (
        <Modal
          title={`${editItem !== null ? "Edit Item" : "Add New Item"}`}
          open={popUpModel}
          onCancel={() => {
            setPopUpModel(false);
            setEditItem(null);
          }}
          footer={false}
        >
          <Form
            layout="vertical"
            initialValues={editItem}
            onFinish={handleSubmit}
          >
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="price" label="Price">
              <Input />
            </Form.Item>
            <Form.Item name="image" label="Image URL">
              <Input />
            </Form.Item>
            <Form.Item name="category" label="Category">
              <Select>
                <Select.Option value="drinks">Drinks</Select.Option>
                <Select.Option value="rice">Rice</Select.Option>
                <Select.Option value="noodles">Noodles</Select.Option>
              </Select>
            </Form.Item>
            <div className="d-flex justify-content-end">
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </DefaultLayout>
  );
}

export default ItemsPage;
