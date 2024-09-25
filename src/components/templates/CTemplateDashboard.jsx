import CWelcome from "../molecules/CWelcome";
import CMapaContainer from "../organisms/CMapContainer";
import CTitleDashboard from "../organisms/CTitleDashboard";
import CCardsDashboard from "../organisms/CCardsDashboard";
import Loading from "../atoms/loading";
import styles from "../../pages/pagesCSS/Dashboard.module.css";
// import { useContext } from "react";
// import { ExerciciosContext } from "../../context/ExercicioContext";

function CTemplateDashboard() {
//  const { loading } = useContext(ExerciciosContext);

//  if (loading) {
//   return <Loading />;
//  }
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