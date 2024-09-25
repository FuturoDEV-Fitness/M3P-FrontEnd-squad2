import CFormLogin from "../molecules/CFormLogin";
import styles from "../../pages/pagesCSS/Login.module.css";
import CFitHubLogo from "../atoms/CFitHubLogo";

function CFormLoginContainer() {
    return (
        <div className={styles.formLogin}>
            <CFitHubLogo className={styles.logo} />
            <h1>
                Bem-vindo(a) ao <span className={styles.name}>FitHub!</span>
            </h1>
            <p>Faça o login para prosseguir</p>
            <div className={styles.formContainer}>
                <CFormLogin />
            </div>
        </div>
    );
}

export default CFormLoginContainer;