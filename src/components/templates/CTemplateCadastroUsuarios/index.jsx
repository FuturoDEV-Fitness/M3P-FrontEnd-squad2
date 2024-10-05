import styles from "./styles.module.css";
import CFormCadastroUsuarioContainer from "../../organisms/CFormCadastroUsuarioContainer";

function CTemplateCadastroUsuario() {
 return (
  <div className={styles.container}>
   <div className={styles.imgLogin}></div>
   <CFormCadastroUsuarioContainer />
  </div>
 );
}

export default CTemplateCadastroUsuario;