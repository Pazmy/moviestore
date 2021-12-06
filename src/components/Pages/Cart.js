import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { formatter } from "../../helper/formatter";
import Loader from "../Loader/Loader";
import { clearCart, removeProduct } from "../../redux/cartRedux";
import { Instance } from "../../helper/axios";
import Button from "@mui/material/Button";

const Container = styled.div`
  padding: 0 40px;
`;
const ListCart = styled.div``;
const Product = styled.div`
  display: flex;
  padding: 8px 16px;
  justify-content: space-between;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.5);
`;
const Price = styled.div`
  display: flex;
  /* align-items: center; */
  /* justify-content: space-between; */
  /* flex-wrap: wrap; */
  /* padding: 18px; */
  .price {
    font-size: 18px;
  }
`;
const Content = styled.div`
  display: flex;
  justify-content: space-between;
  .total {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }
`;
const Checkout = styled.div`
  margin-left: 10px;
  .content {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 8px 16px;
    width: 300px;
  }
`;
const Cart = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);
  const quantity = useSelector((state) => state.cart.quantity);
  let totalPrice = 0;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  });
  function handleClick() {
    setLoading(true);
    try {
      const data = { movies: products, quantity, total: totalPrice, user };
      Instance.post(`/orders/add`, data).then((res) => {
        dispatch(clearCart());
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }
  function handleDeleteProduct(product, price) {
    dispatch(removeProduct({ product, price: price }));
  }
  return (
    <Container>
      <h1 style={{ marginBottom: "10px", fontWeight: "700" }}>Your Cart</h1>
      <Content>
        <ListCart>
          {products.map((product, i) => {
            // let discount = product.discount ? product.discount.slice(0, 2) : "";
            // const calc = discount ? (product.price * discount) / 100 : false;
            // if (calc) {
            //   totalPrice += calc;
            // }
            //  else {
            totalPrice += product.price;
            // }
            return (
              <Product key={i}>
                <div style={{ display: "flex", marginRight: "10px" }}>
                  <img src={product.poster} alt={product.title} width="100" />
                  <div style={{ marginLeft: "10px" }}>{product.title}</div>
                </div>
                <Price>
                  <h4 className="price">{formatter.format(product.price)}</h4>

                  <span
                    style={{
                      cursor: "pointer",
                      display: "inline-block",
                      marginLeft: "10px",
                    }}
                    onClick={() => handleDeleteProduct(product, product.price)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5 15.538l-3.592-3.548 3.546-3.587-1.416-1.403-3.545 3.589-3.588-3.543-1.405 1.405 3.593 3.552-3.547 3.592 1.405 1.405 3.555-3.596 3.591 3.55 1.403-1.416z" />
                    </svg>
                  </span>
                </Price>
              </Product>
            );
          })}
        </ListCart>

        <Checkout>
          <div className="content">
            <h3 style={{ fontWeight: "500px" }}>Cart Summary</h3>
            <div className="total">
              <p>TOTAL:</p>
              <h2>{formatter.format(totalPrice)}</h2>
            </div>
            <Button variant="contained" onClick={handleClick}>
              PROCCEED TO CHECKOUT
            </Button>
          </div>
        </Checkout>
      </Content>
    </Container>
  );
};

export default Cart;
