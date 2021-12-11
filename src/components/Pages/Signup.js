import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
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
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleClick(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await Instance.post("/users/add", {
        name,
        email,
        password,
      });

      if (response.data.status === "error") setErr(response.data.message);
      setLoading(false);
      navigate("/login");
    } catch (error) {
      if (error.response.data.message) {
        setErr(error.response.data.message);
      }
      setLoading(false);
    }
  }
  return (
    <Container>
      <Wrapper>
        <Text>Create an account</Text>
        <FormWrapper>
          <MyTextField
            label="Name"
            variant="outlined"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <Button type="submit" onClick={handleClick} variant="contained">
            {loading ? <Loader></Loader> : "Register"}
          </Button>
        </FormWrapper>

        <BottomText>
          <Link
            to={"/login"}
            style={{
              textDecoration: "underlined",
              fontWeight: 700,
              color: "black",
            }}
          >
            <span style={{ display: "inline" }}>Already have an account? </span>
          </Link>
        </BottomText>
      </Wrapper>
    </Container>
  );
};

export default Signup;
