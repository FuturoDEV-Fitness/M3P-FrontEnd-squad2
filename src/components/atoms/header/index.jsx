import logo from "../../../assets/FitHubLogo.png";

import CButton from "../CButton";

import styles from "./index.module.css";

function Header() {
  return (
    <div className={styles.navContainer}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
          <h1 onClick={() => (window.location.href = "/")}>FitHub!</h1>
        </div>

        {/* Precisa ser feito uma condicional para saber se o usuário esta logado */}
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
      </nav>
    </div>
  );
}

export default Header;
