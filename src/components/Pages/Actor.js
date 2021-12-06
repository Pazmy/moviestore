import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Instance } from "../../helper/axios";
const Container = styled.div`
  padding: 20px 26px;
`;
const Section1 = styled.div`
  display: flex;
`;
const Left = styled.div``;
const Image = styled.img`
  width: 100%;
  height: 100%;
  min-width: 185px;
  transition: all 0.3s;
  object-fit: cover;
  border-radius: 20px;
  animation: animateMovieThumb 0.5s;
  :hover {
    opacity: 0.8;
  }
  @keyframes animateMovieThumb {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
const Right = styled.div`
  margin-left: 24px;
  div {
    margin-bottom: 10px;
  }
  .bio {
    p {
      overflow: auto;
      max-height: 250px;

      text-overflow: ellipsis;
    }
  }
`;

const Actor = () => {
  const [actor, setActor] = useState({});
  const { id } = useParams();
  useEffect(() => {
    Instance.get(`/actors/${id}`)
      .then((res) => {
        setActor(res.data.result);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [id]);
  return (
    <Container>
      <Section1>
        <Left>
          <div>
            <Image src={actor.image} alt={actor.name} />
          </div>
        </Left>
        <Right>
          <h2 style={{ marginBottom: "20px" }}>{actor.name}</h2>
          <div className="bio">
            <h3>Biography</h3>
            <p>{actor?.biography}</p>
          </div>
          <div>
            <h3>Gender</h3>
            <span>{actor?.gender}</span>
          </div>
          <div>
            <h3>Birthday</h3>
            <span>{actor?.birthday}</span>
          </div>
          <div>
            <h3>Place of Birth</h3>
            <span>{actor?.placeofbirth}</span>
          </div>
        </Right>
      </Section1>
    </Container>
  );
};

export default Actor;
