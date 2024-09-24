import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Login from '../pages/login'
import CadastroUsuario from '../pages/cadastroUsuario'
import Dashboard from '../pages/dashboard'
import Locais from '../pages/locais'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Dashboard />,
            },
            {
                path: '/locais-exercicios',
                element: <Locais />,
            }
        ]
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/cadastro-usuario',
        element: <CadastroUsuario />,
    }
])