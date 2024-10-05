import logo from "../../../assets/FitHubLogo.png";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UsuariosContext } from "../../../context/UsuariosContext";

import CButton from "../CButton";
import styles from "./styles.module.css";

function Header() {
  const { logout } = useContext(UsuariosContext);
  const { tokenJWT } = useAuth();

  const logoutAccess = async () => {
    const success = await logout();
    if (success) {
      window.location.href = "/";
    }
  };
  
  return (
    <div className={styles.navContainer}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
          <h1 onClick={() => (window.location.href = "/")}>FitHub!</h1>
        </div>
        {tokenJWT ? (
          <div className={styles.links}>
            <Link to="/locais-exercicios">Meus Locais</Link>
            <Link to="/cadastro-locais">Cadastrar Locais</Link>
            <Link to="/perfil">Perfil</Link>
            <CButton
              onClick={() => {
                logoutAccess();
              }}
              variant="outlined"
              sx={{
                color: "#EFF6E0",
                borderColor: "#EFF6E0",
                "&:hover": { backgroundColor: "#eff6e0", color: "#124559" },
              }}
            >
              Sair
            </CButton>
          </div>
        ) : (
          <div className={styles.links}>
            <CButton
              variant="outlined"
              component={Link}
              to="/login"
              sx={{
                color: "#EFF6E0",
                borderColor: "#EFF6E0",
                "&:hover": { backgroundColor: "#eff6e0", color: "#124559" },
              }}
            >
              Entrar
            </CButton>
            <CButton
              variant="outlined"
              component={Link}
              to="/cadastro-usuario"
              sx={{
                color: "#EFF6E0",
                borderColor: "#EFF6E0",
                "&:hover": { backgroundColor: "#eff6e0", color: "#124559" },
              }}
            >
              Cadastre-se
            </CButton>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Header;
