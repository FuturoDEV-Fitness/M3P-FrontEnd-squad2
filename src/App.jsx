import { Outlet } from "react-router-dom";
import { ExerciciosContextProvider } from "./context/ExercicioContext";
import { useContext } from "react";
import { ExerciciosContext } from "./context/ExercicioContext";
import Header from "./components/atoms/header";
import Footer from "./components/atoms/footer";
import Loading from "./components/atoms/Loading";
import "./App.css";

function App() {
  return (
    <ExerciciosContextProvider>
      <AppContent />
    </ExerciciosContextProvider>
  );
}

function AppContent() {
  const { loading } = useContext(ExerciciosContext);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
