import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import r1a from "../../assets/r1a.jpg";
import r1b from "../../assets/r1b.jpg";
import r1c from "../../assets/r1c.jpg";
import r2a from "../../assets/r2a.jpg";
import r2b from "../../assets/r2b.jpg";
import r2c from "../../assets/r2c.jpg";

const Container = styled.div`
  padding: 20px 26px;
`;
const Top = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h2 {
    font-size: 32px;
  }
  h4 {
    color: grey;
  }
`;
const Middle = styled.div`
  display: grid;
  grid-template-columns: 230px 230px 230px;
  grid-template-rows: 1fr 1fr;
  grid-gap: 20px;
  align-items: center;
  justify-content: center;
  img {
    border-radius: 10px;
    max-width: 222px;
    max-height: auto;
  }
`;
const Bottom = styled.div`
  margin-top: 20px;
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    padding: 12px 16px;
    background-color: #c62828;
    color: white;
    font-size: 18px;
    text-align: center;
    text-decoration: none;
  }
`;

const Section2 = () => {
  return (
    <Container>
      <Top>
        <h2>Get Even More Movies</h2>
        <h4>Buy more of your favorite movies. No need to worry.</h4>
      </Top>
      <Middle>
        <img src={r1a} alt="r1a" />
        <img src={r1b} alt="r1b" />
        <img src={r1c} alt="r1c" />
        <img src={r2a} alt="r2a" />
        <img src={r2b} alt="r2b" />
        <img src={r2c} alt="r2c" />
      </Middle>
      <Bottom>
        <Link to="/movies">Show all movies</Link>
      </Bottom>
    </Container>
  );
};

export default Section2;
