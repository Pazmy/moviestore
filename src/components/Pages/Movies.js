import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Instance } from "../../helper/axios";
import { formatter } from "../../helper/formatter";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Container = styled.div`
  padding: 20px 26px;
`;
const Content = styled.div`
  display: flex;
`;
const Left = styled.div`
  min-width: 180px;
  max-width: 250px;
  display: flex;
  flex-direction: column;
`;
const Right = styled.div`
  flex: 1;
  margin-left: 20px;
  /* display: grid;
  grid-template-columns: repeat(auto-fill, minmax(156px, 156px));
  grid-column-gap: 8px;
  grid-row-gap: 16px;
  grid-template-rows: repeat(auto-fill, 1fr); */
  display: flex;
  /* justify-content: space-between; */
  flex-wrap: wrap;
  gap: 15px 20px;
`;
const Card = styled.div`
  display: flex;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  height: auto;
  max-height: 350px;
  max-width: 159px;
  flex-direction: column;
  img {
    border-radius: 10px 10px 0 0;
    width: 100%;
  }
  .bottom {
    /* flex: 1; */
    width: 100%;
    /* display: flex;
    flex-wrap: wrap; */
    display: grid;
    grid-template-rows: repeat(auto-fill, 1fr);
    overflow: hidden;
    row-gap: 5px;
    padding: 8px 12px;

    span:first-child {
      width: 100%;
      font-weight: 700;
      overflow: hidden;
      text-overflow: ellipsis;
      overflow-wrap: break-word;
    }
    span:last-child {
      color: rgba(0, 0, 0, 0.5);
    }
  }
`;
const FilterContainer = styled.div`
  padding: 12px 16px;
  margin-bottom: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
const GenreContainer = styled.div`
  ul {
    display: flex;
    flex-wrap: wrap;
  }
  li {
    list-style: none;
  }
`;
const Genreitem = styled.div`
  display: inline-block;
  border-radius: 10px 10px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  cursor: pointer;
  text-align: center;
  padding: 6px 10px;
  margin: 8px 6px 0 0;
  &:hover {
    background-color: #000;
    color: #bb0a12;
  }
  &.active {
    background-color: #000;
    color: #bb0a12;
  }
`;
const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  // const [disabled, setDisabled] = useState(true);
  const [activeGenre, setActiveGenre] = useState([]);
  // const [noResult, setNoResult] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);
  const [hidePgn, setHidePgn] = useState(false);

  useEffect(() => {
    Instance.get(`/movies/?page=${page}&limit=10`)
      .then((res) => {
        setMovies(res.data.results);
        setTotalPage(res.data.totalPage);
      })
      .catch((err) => console.log(err.response?.data));
    Instance.get("/genres/")
      .then((res) => {
        setGenres(res.data.results);
      })
      .catch((err) => console.log(err.response?.data));
    setLoading(false);
  }, [page]);

  function handlerPickGenre(e, genre) {
    //pick only one genre for now
    e.target.classList.toggle("active");
    console.log(e.target.classList.contains("active"));
    let flag = e.target.classList.contains("active");
    if (flag) {
      setActiveGenre(activeGenre.concat(genre));
    } else {
      let temp = activeGenre.filter((data) => data !== genre);
      setActiveGenre(temp);
    }
    // console.log(activeGenre);
    // if (activeGenre.length > 0) {
    //   setDisabled(false);
    // } else if (activeGenre.length === 0) {
    //   setDisabled(false);
    // } else {
    //   setDisabled(false);
    // }
  }
  function handlerFilterSearch() {
    if (activeGenre.length === 0) {
      Instance.get(`/movies/?page=${page}&limit=10`)
        .then((res) => {
          setMovies(res.data.results);
        })
        .catch((err) => console.log(err.response?.data));
      setHidePgn(false);
    } else {
      setLoading(true);
      console.log(activeGenre);
      if (activeGenre.length > 0) {
        Instance.post(`/genres/filter`, {
          genres: activeGenre,
        })
          .then((res) => {
            let results = res.data.results;
            if (results.length > 0) {
              setMovies(res.data.results);
            } else {
              console.log("gak ada");
              // setNoResult("No result found");
            }
            setLoading(false);
          })
          .catch((err) => console.log(err.response));
      }
      setLoading(false);
      setHidePgn(true);
    }
  }
  function handlePage(e, value) {
    setPage(value);
  }
  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Loader style={{ width: "100px", height: "100px" }} />
      </div>
    );
  } else {
    return (
      <Container>
        <Content>
          <Left>
            <FilterContainer>
              <div className="top">
                <span>Filter</span>
                <IconButton>
                  <KeyboardArrowRightIcon />
                </IconButton>
              </div>
              <GenreContainer>
                <h3>Genres</h3>
                <ul>
                  {genres?.map((genre, i) => {
                    return (
                      <li key={i}>
                        <Genreitem
                          onClick={(e) => handlerPickGenre(e, genre.name)}
                        >
                          {genre.name}
                        </Genreitem>
                      </li>
                    );
                  })}
                </ul>
              </GenreContainer>
            </FilterContainer>
            <Button
              // disabled={disabled}
              variant="contained"
              onClick={handlerFilterSearch}
            >
              Search
            </Button>
          </Left>
          <Right>
            {movies?.map((movie, i) => {
              return (
                <Card key={i}>
                  <Link
                    to={`/movie/detail/${movie?.id}`}
                    style={{ display: "block" }}
                  >
                    <img
                      src={movie?.poster}
                      alt={movie?.title}
                      width="156"
                      height="237"
                    />
                  </Link>
                  <div className="bottom">
                    <span className="title">{movie?.title}</span>
                    <span>{formatter.format(movie?.price)}</span>
                  </div>
                </Card>
              );
            })}
          </Right>
        </Content>
        <Stack
          spacing={2}
          direction="row"
          sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
        >
          {hidePgn ? (
            ""
          ) : (
            <Pagination count={totalPage} page={page} onChange={handlePage} />
          )}
        </Stack>
      </Container>
    );
  }
};

export default Movies;
