import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Login from '../pages/login'
import CadastroUsuario from '../pages/cadastroUsuario'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
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