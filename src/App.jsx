import { Outlet } from "react-router-dom";

import Header from "./components/atoms/header";
import Footer from "./components/atoms/footer";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
