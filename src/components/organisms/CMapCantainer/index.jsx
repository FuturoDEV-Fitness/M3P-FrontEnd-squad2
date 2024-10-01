import styles from "./styles.module.css";
import Map from "../../atoms/Map";
import { useContext } from "react";
import { ExerciciosContext } from "../../../context/ExercicioContext";

function CMapaContainer(props) {
 const { positionMarker } = useContext(ExerciciosContext);
 const positionFixed = [-14.235, -51.9253];

 return (
  <div className={styles.leafletContainer}>
   <Map
    zoom={3.5}
    position={positionFixed}
    markers={positionMarker}
    style={{
     width: "600px",
     height: "385px",
     boxShadow: "1px 1px 10px black"
    }}></Map>
   <div className={styles.description}>
    <h2 style={{ fontWeight: "inherit" }}>
     Descubra uma nova maneira de se exercitar e se manter saudável!{" "}
    </h2>
    <h4 style={{ fontWeight: "inherit" }}>
     Sua solução completa para organizar seus treinos e descobrir os melhores
     espaços para se exercitar.
    </h4>
   </div>
  </div>
 );
}

export default CMapaContainer;