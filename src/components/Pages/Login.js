import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userRedux";
import Loader from "../Loader/Loader";
import { Instance } from "../../helper/axios";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 24px;
`;
const Wrapper = styled.div`
  margin: 0 auto;
  flex: 1;
  max-width: 540px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 48px 80px;
`;
const Text = styled.span`
  font-size: 2rem;
  font-weight: 500;
`;
const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
`;
const MyTextField = styled(TextField)({
  margin: "10px 0",
});
const BottomText = styled.div`
  text-align: center;
  width: 100%;
`;
const ErrMsg = styled.span`
  color: red;
  font-weight: 300;
  display: inline-block;
  margin-bottom: 5px;
`;
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleClick(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await Instance.post("/users/login", {
        email,
        password,
      });
      const { name, role, token } = response.data;
      dispatch(login({ name, email: response.data.email, role, token }));
      setLoading(false);
      navigate("/");
      // if (response.data.status === "error") setErr(response.data.message);
    } catch (error) {
      if (error.response?.data.message) {
        setErr(error.response.data.message);
      }
      setLoading(false);
    }
  }
  return (
    <Container>
      <Wrapper>
        <Text>Login</Text>
        <FormWrapper>
          <MyTextField
            error={false}
            label="Email"
            helperText=""
            variant="outlined"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <MyTextField
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {err ? <ErrMsg>{err}</ErrMsg> : ""}
          <Button onClick={handleClick} variant="contained">
            {loading ? <Loader></Loader> : "Login"}
          </Button>
        </FormWrapper>

        <BottomText>
          <span style={{ display: "inline" }}>Don't have an account? </span>
          <Link
            to={"/register"}
            style={{
              textDecoration: "underlined",
              fontWeight: 700,
              color: "black",
            }}
          >
            Create one
          </Link>
        </BottomText>
      </Wrapper>
    </Container>
  );
};

export default Login;
