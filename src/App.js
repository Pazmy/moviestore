import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Pages/Home";
import Login from "./components/Pages/Login";
import Signup from "./components/Pages/Signup";
import { ThemeProvider } from "@mui/system";
import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";
import Movies from "./components/Pages/Movies";
import DetailMovie from "./components/Pages/DetailMovie";
import Actor from "./components/Pages/Actor";
import { useSelector } from "react-redux";
import Cart from "./components/Pages/Cart";
import Order from "./components/Pages/Order";
import Footer from "./components/Footer/Footer";
import UserInfo from "./components/Pages/UserInfo";
import { SnackbarProvider } from "notistack";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  const theme = createTheme({
    palette: {
      primary: { main: "#c62828" },
      secondary: red,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
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
            <Route path="/user/info/:name" element={<UserInfo user={user} />} />
          </Routes>
          <Footer />
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
