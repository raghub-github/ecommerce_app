import './App.css';
import Home from './components/Home'
import About from './components/About'
import Products from './components/Products'
import Contact from './components/Contact'
import SingleProduct from './components/SingleProduct'
import Cart from './components/Cart'
import ErrorPage from './components/ErrorPage'
import { GlobalStyle } from './GlobalStyle';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import Header from './components/Header';

function App() {
  const theme = {
    colors: {
      heading: "rgb(24,24,29)",
      text: "rgba(29,29,29,.8)",
      white: "#fff",
      helper: "#8490ff",
      black: "#212529",
      bg: "#F6F8FA",
      footer_bg: "#0a1435",
      btn: "rbg(98,84,243)",
      border: "rgba(98,84,243, .5)",
      hr: "#ffffff",
      gradient: "linear-gradient(0deg, rgb(132,144,255) 0%, rgb(98,189,252)100%)",
      shadow: "rgba(0,0,0,0.02) 0px 1px 3px 0px, rgba(27,31,35, 0.15) 0px 0px 0px 1px; ",
      shadowSupport: "rgba(0,0,0,0.16) 1px 1px 4px",
    },
    media: { mobile: "768px", tab: "998px" }
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/about" element={<About />}></Route>
          <Route exact path="/products" element={<Products />}></Route>
          <Route exact path='/contact' element={<Contact />}></Route>
          <Route exact path='/singleproduct/:id' element={<SingleProduct />}></Route>
          <Route exact path='/cart' element={<Cart />}></Route>
          <Route exact path='*' element={<ErrorPage />}></Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
