import React from "react";
import "..//styles/styles.css";

import { Card } from "antd";
import { Button } from "antd";
import { useDispatch } from "react-redux";

function ItemList({ item }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...item, quantity: 1 },
    });
  };

  const { Meta } = Card;
  return (
    <div>
      <Card
        hoverable
        style={{ width: 240, marginTop: 20 }}
        cover={<img alt="example" src={item.image} style={{ height: 250 }} />}
      >
        <Meta title={item.name} />
        <div className="item-button">
          <Button onClick={() => handleAddToCart()}>Add to cart</Button>
        </div>
      </Card>
    </div>
  );
}

export default ItemList;
