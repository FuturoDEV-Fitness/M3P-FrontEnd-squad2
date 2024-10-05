import LocalForm from "../../organisms/LocalForm";
import { useContext } from "react";
import { ExerciciosContext } from "../../../context/ExercicioContext";
import styles from "./styles.module.css";
import CButton from "../../atoms/CButton";
import { Link } from "react-router-dom";

function CTemplateListaLocais() {
 const { locaisUsuario, atualizarLocais } = useContext(ExerciciosContext);

 const atualizarLocal = (data) => {
  atualizarLocais(data);
 };

 return (
  <div className={styles.container}>
   <div className={styles.titleContainer}>
    <h1 style={{ fontWeight: "inherit" }} className={styles.title}>
     Meus Locais
    </h1>
    <Link to="/cadastro-locais">
     <CButton
      variant="contained"
      sx={{
       backgroundColor: "#01161e",
       color: "#eff6e0",
       width: "100%",
       fontSize: "12px",
       "&:hover": { backgroundColor: "#124559", color: "#eff6e0" }
      }}>
      Cadastrar novo local
     </CButton>
    </Link>
   </div>
   {locaisUsuario.length === 0 ? (
    <div className={styles.semLocais}>
     <h1 style={{ fontWeight: "inherit" }}>
      Você ainda não possui locais cadastrados.
     </h1>
    </div>
   ) : (
    locaisUsuario.map((local, index) => (
     <div key={local.id} className={styles.cardContainer}>
      <LocalForm local={local} onSubmit={atualizarLocal} />
     </div>
    ))
   )}
  </div>
 );
}

export default CTemplateListaLocais;