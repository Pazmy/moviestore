import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { tmdbInstance, URLPOSTER } from "../../helper/tmdbUrl";
import noImage from "../../assets/no_image.jpg";

const Container = styled.div`
  padding: 20px 26px;
  margin-bottom: 10px;

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

const UpcomingContent = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    tmdbInstance
      .get(
        "/discover/movie?sort_by=release_date.asc&primary_release_year=2022&include_adult=false"
      )
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  return (
    <Container>
      <h2>Upcoming Movie</h2>
      <Content className="details">
        {movies?.map((movie, i) => {
          return (
            <Card key={i}>
              <img
                src={
                  movie.poster_path ? URLPOSTER + movie.poster_path : noImage
                }
                alt={movie.title}
                width="156"
                height="237"
              />

              <div className="bottom">
                <span>{movie.title}</span>
                <span>{movie.release_date}</span>
              </div>
            </Card>
          );
        })}
      </Content>
    </Container>
  );
};

export default UpcomingContent;
