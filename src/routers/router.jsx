import { Navigate, createBrowserRouter, Outlet } from "react-router-dom";
import { useMemo } from "react";
import App from "../App";
import Login from "../pages/login";
import CadastroUsuario from "../pages/cadastroUsuario";
import Dashboard from "../pages/dashboard";
import Locais from "../pages/locais";
import CadastroLocais from "../pages/cadastroLocais";

// Componente PrivateRoute
const PrivateRoute = () => {
  const tokenJWT = useMemo(() => {
    return JSON.parse(localStorage.getItem("tokenJWT"));
  }, []);

  return tokenJWT ? <Outlet /> : <Navigate to="/login" />;
};

// Configuração das rotas
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        element: <PrivateRoute />, // Agrupamento das rotas privadas
        children: [
          {
            path: "/locais-exercicios",
            element: <Locais />,
          },
          {
            path: "/cadastro-locais",
            element: <CadastroLocais />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/cadastro-usuario",
    element: <CadastroUsuario />,
  },
]);
