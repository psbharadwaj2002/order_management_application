import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
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
import { useDispatch } from "react-redux";
import {
  DeleteOutlined,
  EditOutlined,
  MinusCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import Item from "antd/es/list/Item";

function BillsPage() {
  const dispatch = useDispatch();
  const [billsData, setBillsData] = useState([]);
  const [popUpModel, setPopUpModel] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

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
    { title: "Sub Total", dataIndex: "subTotal" },
    { title: "Tax", dataIndex: "tax" },
    { title: "Total Amount", dataIndex: "totalAmount" },

    {
      title: "View Order",
      dataIndex: "._id",
      render: (id, record) => (
        <div>
          <EyeOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSelectedBill(record);
              setPopUpModel(true);
            }}
          />
        </div>
      ),
    },
  ];

  const handleSubmit = async (value) => {};

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Orders List</h1>
      </div>
      <Table columns={columns} dataSource={billsData} bordered />

      {popUpModel && (
        <Modal
          title="Order Details"
          open={popUpModel}
          onCancel={() => {
            setPopUpModel(false);
          }}
          footer={false}
        >
          <div id="order-details">
            <div id="data">
              <div className="mb-4">
                <table>
                  <tr>
                    <td>Customer Name</td>
                    <td>: </td>
                    <td>
                      <b>{selectedBill.customerName}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>Phone No</td>
                    <td>: </td>
                    <td>
                      <b>{selectedBill.customerNumber}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td>: </td>
                    <td>
                      <b>{selectedBill.date.toString().substring(0, 10)}</b>
                    </td>
                  </tr>
                </table>
              </div>
              {/* {selectedBill.cartItems?.map((data) => (
                <div>
                  <p>{data["name"]}</p>
                  <p>{data["totalAmount"]}</p>
                </div>
              ))} */}
            </div>
            <div>
              <div id="table">
                <table style={{ borderRadius: 10 }}>
                  <tbody>
                    <tr style={{ backgroundColor: "#F2F1EB" }}>
                      <td>
                        <h5>Item</h5>
                      </td>
                      <td>
                        <h5>Qty</h5>
                      </td>
                      <td>
                        <h5>Price</h5>
                      </td>
                      <td>
                        <h5>Total</h5>
                      </td>
                    </tr>

                    {selectedBill.cartItems.map((items) => (
                      <>
                        <tr className="service">
                          <td className="tableItem">
                            <p>{items.name}</p>
                          </td>
                          <td className="tableItem">
                            <p>{items.quantity}</p>
                          </td>
                          <td className="tableItem">
                            <p>$ {items.price}</p>
                          </td>
                          <td className="tableItem">
                            <p>$ {items.price * items.quantity}</p>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
              <table
                id="total"
                style={{
                  width: 150,
                  marginTop: 30,
                  marginLeft: "auto",
                  marginRight: 20,
                }}
              >
                <tr>
                  <td>
                    <h6>Total</h6>
                  </td>
                  <tb>: </tb>
                  <td>
                    <h6>$ {selectedBill.subTotal}</h6>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h6>Tax</h6>
                  </td>
                  <tb>: </tb>
                  <td>
                    <h6>$ {selectedBill.tax}</h6>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h6>Grand Total</h6>
                  </td>
                  <tb>: </tb>
                  <td>
                    <h6>$ {selectedBill.totalAmount}</h6>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </Modal>
      )}
    </DefaultLayout>
  );
}

export default BillsPage;
