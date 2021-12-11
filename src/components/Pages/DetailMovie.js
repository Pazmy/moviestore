import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Instance, SERVER_URL } from "../../helper/axios";
import { calcTime, formatter } from "../../helper/formatter";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/cartRedux";
import Avatar from "@mui/material/Avatar";
import { useSnackbar } from "notistack";

const Container = styled.div``;
const Section1 = styled.div`
  padding: 20px 26px;
  background: ${(props) =>
    props.backdrop ? `url('${props.backdrop}')` : "#000"};
  background-size: cover;
  background-position: center;

  animation: animateMovieinfo 1s;
  @keyframes animateMovieinfo {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
const Content = styled.div`
  display: flex;
  max-width: 1280px;
  margin: 0 auto;
  background: rgb(0, 0, 0, 0.7);
  border-radius: 20px;
  @media screen and (max-width: 768px) {
    display: block;
    max-height: none;
  }
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  max-width: 320px;
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
const Text = styled.div`
  width: 100%;
  padding: 20px 40px;
  color: white;
  overflow: hidden;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
`;
const Section2 = styled.div`
  padding: 20px 26px;
`;
const ActorsWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
`;
const Actor = styled.div`
  margin: 10px 10px 0 0;
  display: flex;
  flex-flow: column wrap;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 138px;
  min-width: 138px;
  img {
    display: block;
    width: 100%;

    height: auto;
    object-fit: cover;
    border-radius: 10px 10px 0 0;
  }
  div {
    display: flex;
    flex-flow: wrap column;
    padding: 8px 12px;

    span.name {
      font-weight: 700;
      font-size: 18px;
    }
  }
`;
const Section3 = styled.div`
  padding: 20px 26px;
  margin: 20px 0;
`;
const UserRating = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
`;
const LeftRating = styled.div`
  display: flex;
  padding: 10px 0;
`;
const RightRating = styled.div``;
const LeftInfo = styled.div`
  padding: 0 16px;
  display: flex;
  flex-direction: column;
`;
const WriteReview = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background-color: #eee;
  padding: 12px 18px;
  margin: 12px 0;
  textarea {
    width: 300px;
    height: 200px;
  }
  .right {
    display: flex;
    flex-direction: column;
    form {
      display: inline-flex;
      flex-direction: column;
      align-items: flex-start;
      textarea {
        padding: 8px;
      }
      button {
        margin: 12px 0;
      }
    }
  }
`;
const AddToCart = styled.div`
  width: 100%;
  a {
    text-decoration: none;
    color: white;
  }
`;
const Trailer = styled.div`
  width: 100%;
  max-width: 780px;
  height: 432px;
  padding: 20px 26px;
  iframe {
    width: 100%;
    height: 100%;
  }
`;

const DetailMovie = ({ user }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [actors, setActors] = useState([]);
  const [rate, setRate] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [isReviewed, setIsReviewed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [checkout, setCheckout] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    Instance.get(`/movies/${id}`)
      .then((res) => {
        setMovie(res.data.result);
        let alreadyInCart = products.find((item) => {
          return item.id === res.data.result.id;
        });
        if (alreadyInCart) setCheckout(true);
        setActors(res.data.result.actors);
        setReviews(res.data.result.comments);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response?.data);
      });
  }, [id, products]);
  function handleSubmit(e) {
    e.preventDefault();
    Instance.post("/comments/add", {
      rate,
      comment: reviewText,
      MovieId: id,
      email: user.email,
    })
      .then((res) => {
        if (res.status === 201) {
          setIsReviewed(true);
        }
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
  function handleClick() {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(
        addProduct({
          product: movie,
          price: movie.price,
        })
      );
      enqueueSnackbar("Added to cart", { variant: "success" });
    }
    setCheckout(true);
  }
  if (loading)
    return (
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Loader style={{ width: "100px", height: "100px" }} />
      </div>
    );
  return (
    <Container>
      <Section1 backdrop={movie.image}>
        <Content>
          <Image src={movie.poster} alt={movie.title} />
          <Text>
            <h1>{movie.title}</h1>
            <h3>Overview</h3>
            <p>{movie.overview}</p>
            <h3>Release Date</h3>
            <span>{movie.release}</span>
            <h3>Genre</h3>
            <span>{movie.genres ? movie.genres.join(", ") : ""}</span>
            <h3>Status</h3>
            <span>{movie.status}</span>
            <h3>Vote Average</h3>
            <span>{movie.rate}</span>
            <h3>Popularity</h3>
            <span>{movie.views}</span>
            <h3>Runtime</h3>
            <span>{calcTime(movie.duration)}</span>
            <h3>Price</h3>
            <span style={{ marginBottom: "10px" }}>
              {formatter.format(movie.price)}
            </span>
            <AddToCart>
              {checkout ? (
                <Button variant="contained">
                  <Link to="/cart">Checkout Now</Link>
                </Button>
              ) : (
                <Button variant="contained" onClick={handleClick}>
                  Add To Cart <ShoppingCartIcon />
                </Button>
              )}
            </AddToCart>
          </Text>
        </Content>
      </Section1>
      {movie.trailer ? (
        <Trailer>
          <h2 style={{ marginBottom: "10px" }}>Trailer</h2>
          <iframe
            title={movie.name}
            src={movie.trailer}
            class="responsive-iframe"
          ></iframe>
        </Trailer>
      ) : (
        ""
      )}

      <Section2>
        <h2>Actors</h2>
        <ActorsWrapper>
          {actors.map((actor, i) => {
            return (
              <Actor key={i}>
                <Link to={`/actor/${actor.id}`}>
                  <img src={actor.image} alt={actor.name} />
                </Link>
                <div>
                  <span className="name">{actor.name}</span>
                  <span>{actor.character}</span>
                </div>
              </Actor>
            );
          })}
        </ActorsWrapper>
      </Section2>
      <Section3>
        <h3>Review</h3>
        {user ? (
          <WriteReview>
            <LeftRating>
              <Avatar
                alt={user.name}
                src={`${SERVER_URL}/${user?.avatarpath}`}
                sx={{ width: 40, height: 40 }}
              />
              <LeftInfo>{user.name}</LeftInfo>
            </LeftRating>
            <RightRating className="right">
              <Rating
                name="simple-controlled"
                value={rate}
                onChange={(event, rate) => {
                  setRate(rate);
                }}
              />
              <form onSubmit={handleSubmit}>
                <label>Write review</label>
                <textarea
                  type="text"
                  name="review"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                ></textarea>
                <Button type="input" variant="contained">
                  Write
                </Button>
              </form>
            </RightRating>
          </WriteReview>
        ) : (
          ""
        )}
        {reviews.map((review, i) => {
          return (
            <UserRating key={i}>
              <LeftRating>
                <Avatar
                  alt={review?.user}
                  src={`${SERVER_URL}/${review?.avatarpath}`}
                  sx={{ width: 40, height: 40 }}
                />

                <LeftInfo>
                  {review.user}
                  <span style={{ color: "rgba(0,0,0,0.5)" }}>
                    {review.date}
                  </span>
                </LeftInfo>
              </LeftRating>
              <RightRating>
                <Rating name="read-only" value={review.rate} readOnly />
                <p>{review.comment}</p>
              </RightRating>
            </UserRating>
          );
        })}
      </Section3>
    </Container>
  );
};

export default DetailMovie;
