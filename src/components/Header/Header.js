import React, { useRef } from "react";
import styled from "styled-components";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { Link, useNavigate } from "react-router-dom";
// import PersonIcon from "@mui/icons-material/Person";
// import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userRedux";
import { clearCart } from "../../redux/cartRedux";
import Avatar from "@mui/material/Avatar";
import { SERVER_URL } from "../../helper/axios";

const Container = styled.div`
  display: flex;
  padding: 12px 24px;
  height: auto;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  list-style: none;
  justify-content: space-between;
  a {
    text-decoration: none;
    color: black;
  }
`;
const Left = styled.div`
  display: flex;
  align-items: center;
  span {
    font-size: 30px;
    font-weight: 700;
    letter-spacing: 0.1px;
    display: inline-block;
    margin-right: 8px;
  }
`;
const Right = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
`;
const Dropdown = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 10px;
`;
const DropdownContent = styled.div`
  position: absolute;
  display: none;
  min-width: 120px;
  background-color: #2a2a2a;
  color: white;
  transform: translate(-50px, 12px);
  /* padding: 12px; */
  border: 1px solid rgba(0, 0, 0, 0.5);
  z-index: 100;
  &.show {
    display: block;
  }
  .link,
  span {
    display: block;
    text-align: center;
    padding: 12px;
    color: #eeeeee;
    cursor: pointer;
  }
  .link:hover,
  span:hover {
    background-color: #616161;
  }
`;
const Header = ({ user }) => {
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.cart.quantity);
  const navigate = useNavigate();
  const toggleDropdown = useRef(false);
  const handleDropdown = () => {
    toggleDropdown.current.classList.toggle("show");
  };
  const handleLogout = () => {
    dispatch(logout(null));
    dispatch(clearCart());
    navigate("/login");
  };
  return (
    <Container>
      <Left>
        <Link to="/">
          <span>Moviz</span>
        </Link>
        <Link to="/movies">Browse</Link>
      </Left>
      <Right>
        {user ? (
          <Dropdown>
            <Avatar
              alt={user?.name}
              src={`${SERVER_URL}/${user?.avatarpath}`}
              onClick={handleDropdown}
              sx={{ width: 28, height: 28, cursor: "pointer" }}
            />
            <DropdownContent ref={toggleDropdown} onBlur={handleDropdown}>
              <Link className="link" to={`/user/info/${user.name}`}>
                Account
              </Link>
              <Link className="link" to="/order">
                Orders
              </Link>
              <span className="link" onClick={handleLogout}>
                Log out
              </span>
            </DropdownContent>
          </Dropdown>
        ) : (
          <Link to="/login">Log In</Link>
        )}

        <Link to="/cart">
          <Badge badgeContent={quantity} color="primary">
            <ShoppingCartIcon color="primary" />
          </Badge>
        </Link>
      </Right>
    </Container>
  );
};

export default Header;
