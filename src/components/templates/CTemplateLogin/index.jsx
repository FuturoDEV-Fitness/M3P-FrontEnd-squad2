import styles from "./styles.module.css";
import CFormLoginContainer from "../../organisms/CFormLoginContainer";
function CTemplateLogin() {
 return (
  <div className={styles.container}>
   <div className={styles.imgLogin}></div>
   <CFormLoginContainer />
  </div>
 );
}
export default CTemplateLogin;