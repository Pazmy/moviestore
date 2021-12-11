import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Instance } from "../../helper/axios";
import { formatter } from "../../helper/formatter";

const Container = styled.div`
  padding: 20px 26px;

  .details::-webkit-scrollbar-track {
    /* -webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.3); */
    /* box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.3); */
    background-color: #f5f5f5;
  }
  .details::-webkit-scrollbar {
    width: 6px;
    height: 8px;
    background-color: #f5f5f5;
  }
  .details::-webkit-scrollbar-thumb {
    background-color: #a8a4a4;
    border-radius: 10px;
  }
`;
const Content = styled.div`
  display: flex;
  overflow-x: auto;
`;
const Card = styled.div`
  display: flex;
  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); */
  flex-direction: column;
  padding: 8px 16px 8px 0;
  img {
    border-radius: 10px 10px 0 0;
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

const PopularContent = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    Instance.get("/movies/popular")
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  return (
    <Container>
      <h2>What's Popular</h2>
      <Content className="details">
        {movies.map((movie, i) => {
          return (
            <Card key={i}>
              <Link
                to={`/movie/detail/${movie.id}`}
                style={{ display: "block" }}
              >
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
      </Content>
    </Container>
  );
};

export default PopularContent;
