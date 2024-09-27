import logo from "../../../assets/FitHubLogo.png";
import { Link } from "react-router-dom";

import CButton from "../CButton";
import styles from "./index.module.css";

function Header() {
  const tokenJWT = JSON.parse(localStorage.getItem("tokenJWT"));

  return (
    <div className={styles.navContainer}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
          <h1 onClick={() => (window.location.href = "/")}>FitHub!</h1>
        </div>
        {tokenJWT ? (
          <div className={styles.links}>
            <Link to="/lista-exercicios">Meus Locais</Link>
            <Link to="/cadastro-exercicios">Cadastrar Locais</Link>
            <Link to="/perfil">Perfil</Link>
            <CButton
              onClick={() => {
                logout(JSON.parse(localStorage.getItem("tokenJWT")));
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
