import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { formatter } from "../../helper/formatter";
import { Instance } from "../../helper/axios";

const Container = styled.div`
  padding: 20px 26px;
  min-height: 320px;

  h1 {
    margin-bottom: 10px;
  }
  li {
    list-style: none;
  }
`;
const Table = styled.table`
  &,
  th,
  td {
    border: 1px solid black;
    border-collapse: collapse;
  }
  th {
    text-align: left;
    padding: 8px 8px;
  }
  td {
    padding: 8px 8px;
  }
`;
const Order = ({ user }) => {
  let email = user.email;
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    Instance.post("/orders/user", { email })
      .then((res) => {
        setOrders(res.data.results);
      })
      .catch((err) => {
        console.log(err.response?.data);
      });
  }, [email]);
  return (
    <Container>
      <h1>Orders</h1>
      <Table>
        <thead>
          <tr>
            <th>No</th>
            <th className="">Order Name</th>
            <th>Items</th>
            <th className="">Status</th>
            <th className="">Date</th>
            <th className="">Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, i) => {
            return (
              <tr key={i}>
                <td>{(i += 1)}</td>
                <td>{order.orderDetail.name}</td>
                <td>
                  <ul>
                    {order.movies.map((movie) => (
                      <li>- {movie.title}</li>
                    ))}
                  </ul>
                </td>
                <td>{order.orderDetail.status}</td>

                <td>
                  {new Date(order.orderDetail.createdAt)
                    .toString()
                    .slice(0, 15)}
                </td>

                <td>{formatter.format(order.orderDetail.total)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default Order;
