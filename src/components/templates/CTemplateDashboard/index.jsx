import styles from "./styles.module.css";
import CWelcome from "../../molecules/CWelcome";
import CMapaContainer from "../../organisms/CMapCantainer";
import CTitleDashboard from "../../organisms/CTitleDashboard";
import CCardsDashboard from "../../organisms/CCadsDashboard";

function CTemplateDashboard() {
 return (
  <div className={styles.container}>
   <div className={styles.content}>
    <CWelcome />
    <CMapaContainer />
    <div className={styles.div_cards}>
     <div className={styles.title}>
      <h1 style={{ fontWeight: "inherit" }}>Locais</h1>
      <CTitleDashboard></CTitleDashboard>
     </div>
     <CCardsDashboard />
    </div>
   </div>
  </div>
 );
}

export default CTemplateDashboard;