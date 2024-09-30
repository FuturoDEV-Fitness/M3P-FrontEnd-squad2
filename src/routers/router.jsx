import { Navigate, createBrowserRouter, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import App from "../App";
import Login from "../pages/login";
import CadastroUsuario from "../pages/cadastroUsuario";
import Dashboard from "../pages/dashboard";
import Locais from "../pages/locais";
import CadastroLocais from "../pages/cadastroLocais";

// Componente PrivateRoute
const PrivateRoute = () => {
  const { decodeToken, tokenJWT } = useAuth();
  try {
    if (!tokenJWT) return <Navigate to="/login" />;

    const { valid } = decodeToken(tokenJWT);
    if (!valid) return <Navigate to="/login" />;

    return <Outlet />;
  } catch (error) {
    return <Navigate to="/login" />;
  }

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
