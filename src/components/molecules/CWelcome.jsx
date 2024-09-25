import styles from "../../pages/pagesCSS/Dashboard.module.css";
import { useContext } from "react";
import { ExerciciosContext } from "../../context/ExercicioContext";

function CWelcome() {
 //  const nomeUsuario = JSON.parse(localStorage.getItem("userNome"));
 const { usuarioLogado } = useContext(ExerciciosContext);
 return (
  <div className={styles.welcome}>
   <h1 style={{ fontWeight: "inherit" }}>
    Olá {usuarioLogado && usuarioLogado.nome}!
   </h1>
   <h2 style={{ fontWeight: "inherit" }}>
    Seja bem-vindo(a) ao <span style={{ fontWeight: "bold" }}>FitHub!</span>
   </h2>
   <h4 style={{ fontWeight: "inherit" }}>
    O seu portal completo para gerenciar seus exercícios e encontrar os melhores
    locais para atividades físicas.
   </h4>
  </div>
 );
}

export default CWelcome;