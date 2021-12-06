import { Link } from "react-router-dom";
import styled from "styled-components";
import topBg from "../../assets/top-bg.jpg";
const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const MainContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: ${(props) =>
    `linear-gradient(rgba(0,0,0,.8),rgba(0,0,0,.8)),url('${props.image}')`};

  max-height: 500px;
  min-height: 500px;
  /* margin-top: -70px; */
  background-repeat: no-repeat;
  background-size: cover;
  margin-bottom: 20px;
  /* padding-bottom: 0; */
  h4 {
    font-size: 30px;
    font-weight: 700;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.25;
    letter-spacing: 3px;
    text-align: center;
    padding: 0 15px 10px;
    color: white;
  }
  span {
    font-size: 20px;
    font-weight: 100;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: 1px;
    text-align: center;
    padding: 0 15px 20px;
    color: white;
  }
  .text {
    padding: 12px 16px;
    background-color: white;
    color: black;
    font-size: 18px;
    text-align: center;
    text-decoration: none;
  }
  .text:hover {
    background-color: black;
    color: white;
    transition: ease 0.5s;
  }
`;
const Home = () => {
  return (
    <Container>
      <MainContainer image={topBg}>
        <h4>Explore Thousands Of Hits</h4>
        <span>
          Buy and Watch your favorite series and movies with our special offer.
        </span>
        <Link to="/register" className="text">
          CLAIM SPECIAL OFFER
        </Link>
      </MainContainer>
    </Container>
  );
};

export default Home;
