import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { Instance } from "../../helper/axios";
import { formatter } from "../../helper/formatter";
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
const Section2 = styled.div``;
const Card = styled.div`
  display: flex;
  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); */
  flex-direction: column;
  align-items: center;
  flex-direction: wrap;
  padding: 8px 16px 8px 0;
  img {
    border-radius: 10px;
  }
  .bottom {
    display: flex;
    flex-direction: column;
    padding: 8px 12px;
    span:first-child {
      font-weight: 700;
    }
    span:last-child {
      color: rgba(0, 0, 0, 0.5);
    }
  }
`;

const Actor = () => {
  const [actor, setActor] = useState({});
  const { id } = useParams();
  console.log(actor.credits);
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
      <Section2>
        <h3>Credits</h3>
        <div style={{ display: "flex", overflowX: "auto" }}>
          {actor?.credits?.map((movie, i) => {
            return (
              <Card key={i}>
                <Link to={`/movie/detail/${movie.id}`}>
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    width="156"
                    height="237"
                  />
                </Link>
                <div className="bottom">
                  <span>{movie.title}</span>
                  <span>{formatter.format(movie.price)}</span>
                </div>
              </Card>
            );
          })}
        </div>
      </Section2>
    </Container>
  );
};

export default Actor;
