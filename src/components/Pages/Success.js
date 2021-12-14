import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Instance } from "../../helper/axios";
import { clearCart } from "../../redux/cartRedux";
import { useSnackbar } from "notistack";
import Button from "@mui/material/Button";

const Success = ({ user }) => {
  //   const [isPlaced, setIsPlaced] = useState(false);
  const [orderName, setOrderName] = useState(null);
  const products = useSelector((state) => state.cart.products);
  const quantity = useSelector((state) => state.cart.quantity);
  const total = useSelector((state) => state.cart.total);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  let isPlaced = useRef(false);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    const makeRequest = () => {
      try {
        const data = { movies: products, quantity, total: total, user };
        Instance.post(`/orders/add`, data).then((res) => {
          dispatch(clearCart());
          setOrderName(res.data?.orderName);
          isPlaced.current = false;
          enqueueSnackbar(res.data.message, { variant: "success" });
        });
      } catch (err) {
        if (err.response.data?.message) {
          enqueueSnackbar(err.response.data.message, { variant: "error" });
        }
        console.log(err);
      }
    };
    !isPlaced.current && makeRequest();
  }, [
    dispatch,
    products,
    quantity,
    total,
    user,
    navigate,
    orderName,
    enqueueSnackbar,
  ]);
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderName
        ? `Order has been created successfully. Your order number is ${orderName}`
        : `Successfull. Your order is being prepared...`}
      <Button variant="contained" sx={{ marginTop: "20px" }}>
        Go to Homepage
      </Button>
    </div>
  );
};

export default Success;
