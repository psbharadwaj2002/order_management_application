import React, { useEffect, useState } from "react";
import axios from "axios";
import DefaultLayout from "../components/DefaultLayout";
import { Row, Col } from "antd";
import ItemList from "../components/ItemList";

function Home() {
  const [itemsData, setItemsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("drinks");

  const cateogries = [
    {
      name: "drinks",
    },
    {
      name: "rice",
    },
    {
      name: "noodles",
    },
  ];

  useEffect(() => {
    const getAllItems = async () => {
      try {
        const { data } = await axios.get(
          "https://order-management-application-pv5n.onrender.com/api/items/getItems"
        );
        setItemsData(data);
      } catch (error) {}
    };

    getAllItems();
  }, []);

  return (
    <DefaultLayout>
      <div className="d-flex">
        {cateogries.map((category) => (
          <div
            key={category.name}
            className="d-flex category"
            onClick={() => setSelectedCategory(category.name)}
          >
            <h4 key={category.name}>{category.name}</h4>
          </div>
        ))}
      </div>
      <Row>
        {itemsData
          .filter((i) => i.category === selectedCategory)
          .map((item) => (
            <Col xs={24} lg={6} md={12} sm={6}>
              <ItemList item={item} />
            </Col>
          ))}
      </Row>
    </DefaultLayout>
  );
}

export default Home;
