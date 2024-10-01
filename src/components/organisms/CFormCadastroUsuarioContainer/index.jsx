// import styles from "../../../pages/pagesCSS/Login.module.css";
import styles from "./styles.module.css";
import CFitHubLogo from "../../atoms/CFitHubLogo";
import CFormCadastroUsuario from "../../molecules/CFormCadastroUsuario";

function CFormCadastroUsuarioContainer() {
 return (
  <div className={styles.formLogin}>
   <CFitHubLogo className={styles.logo} />
   <h1>
    Conheça o <span className={styles.name}>FitHub!</span>
   </h1>
   <CFormCadastroUsuario />
  </div>
 );
}

export default CFormCadastroUsuarioContainer;