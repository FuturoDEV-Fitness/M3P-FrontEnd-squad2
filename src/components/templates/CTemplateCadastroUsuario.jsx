import styles from "../../pages/pagesCSS/Login.module.css";
import CFormCadastroUsuarioContainer from "../organisms/CFomrCadastroUsuarioContainer";

function CTemplateCadastroUsuario() {
 return (
  <div className={styles.container}>
   <div className={styles.imgLogin}></div>
   <CFormCadastroUsuarioContainer />
  </div>
 );
}

export default CTemplateCadastroUsuario;