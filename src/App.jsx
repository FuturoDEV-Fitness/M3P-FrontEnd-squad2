import { Outlet } from "react-router-dom";
import { ExerciciosContextProvider } from "./context/ExercicioContext";
import Header from "./components/atoms/header";
import Footer from "./components/atoms/footer";
import "./App.css";

function App() {
  return (
    <>
      <ExerciciosContextProvider>
        <Header />
        <Outlet />
        <Footer />
      </ExerciciosContextProvider>
    </>
  );
}

export default App;
