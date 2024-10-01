import styles from "./styles.module.css";
import CFormCadastroLocais from "../../organisms/CFormCadastroLocais";
function CTemplateCadastroLocais() {
 return (
  <div className={styles.container} style={{ height: "80vh" || auto }}>
   <div
    className={styles.title}
    style={{
     textAlign: "start",
     width: "100%"
    }}>
    <h1 style={{ fontWeight: "inherit" }}>
     Cadastre novos locais de exercícios
    </h1>
   </div>
   <div className={styles.formCadastro}>
    <CFormCadastroLocais />
   </div>
  </div>
 );
}

export default CTemplateCadastroLocais;