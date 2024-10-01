import styles from "../../pages/pagesCSS/Dashboard.module.css";
import useAuth from "../../hooks/useAuth";

function CWelcome() {
  const { session } = useAuth();
  return (
    <div className={styles.welcome}>
      <h1 style={{ fontWeight: "inherit" }}>
        Olá {session && session.user_name}!
      </h1>
      <h2 style={{ fontWeight: "inherit" }}>
        Seja bem-vindo(a) ao <span style={{ fontWeight: "bold" }}>FitHub!</span>
      </h2>
      <h4 style={{ fontWeight: "inherit" }}>
        O seu portal completo para gerenciar seus exercícios e encontrar os
        melhores locais para atividades físicas.
      </h4>
    </div>
  );
}

export default CWelcome;
