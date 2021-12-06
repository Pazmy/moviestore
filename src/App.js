import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Pages/Home";
import Login from "./components/Pages/Login";
import Signup from "./components/Pages/Signup";
import { ThemeProvider } from "@mui/system";
import { createTheme } from "@mui/material";
import { green } from "@mui/material/colors";
import Movies from "./components/Pages/Movies";
import DetailMovie from "./components/Pages/DetailMovie";
import Actor from "./components/Pages/Actor";
import { useSelector } from "react-redux";
import Cart from "./components/Pages/Cart";
import Order from "./components/Pages/Order";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  const theme = createTheme({
    palette: {
      primary: { main: "#04aa6d" },
      secondary: green,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/movies" element={<Movies />} />
          <Route
            path="/movie/detail/:id"
            element={<DetailMovie user={user} />}
          />
          <Route path="/actor/:id" element={<Actor />} />
          <Route path="/cart" element={<Cart user={user} />} />
          <Route path="/order" element={<Order user={user} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
