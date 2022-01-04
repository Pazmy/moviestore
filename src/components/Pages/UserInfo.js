import React, { useState } from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import { Instance, SERVER_URL } from "../../helper/axios";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { updateUserAvatar } from "../../redux/userRedux";
import { useSnackbar } from "notistack";

const Container = styled.div`
  padding: 20px 26px;
  min-height: 320px;
`;
const Content = styled.div`
  h3 {
    display: inline-block;
    margin-right: 10px;
  }
  form label {
    margin-right: 8px;
  }
  form input {
    display: block;
    margin: 8px 0;
  }
`;
const UserInfo = ({ user }) => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  function handleChange(e) {
    setFile(e.target.files);
  }
  function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData();
    const token = `Bearer ${user.token}`;
    data.append("image", file[0]);
    data.append("email", user.email);

    Instance.put("/users/info/avatar", data, {
      headers: { Authorization: token },
    })
      .then((res) => {
        dispatch(updateUserAvatar(res.data.result.avatarpath));
        enqueueSnackbar(res.data.message, { variant: "success" });
      })
      .catch((err) => {
        if (err.response.data?.message) {
          enqueueSnackbar(err.response.data.message, { variant: "error" });
        }
        console.log(err.response);
      });
  }

  return (
    <Container>
      <Content>
        <div>
          {/* <h3>Avatar</h3> */}
          <Avatar
            alt={user?.name}
            src={`${SERVER_URL}/${user?.avatarpath}`}
            sx={{ maxWidth: 150, width: 100, minHeight: 100, height: "auto" }}
          />
        </div>
        <div>
          <h3>Name:</h3>
          <span>{user.name}</span>
        </div>
        <div>
          <h3>Email:</h3>
          <span>{user.email}</span>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Change Avatar?</label>
          <input type="file" name="image" onChange={handleChange} />
          <Button type="submit" variant="contained">
            Save
          </Button>
        </form>
      </Content>
    </Container>
  );
};

export default UserInfo;
