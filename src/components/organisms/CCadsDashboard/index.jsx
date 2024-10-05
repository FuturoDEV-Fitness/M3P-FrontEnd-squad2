import { Card } from "@mui/material";
import styles from "./styles.module.css";
import { useContext } from "react";
import { ExerciciosContext } from "../../../context/ExercicioContext";
import Map from "../../atoms/Map";
import MapIcon from '@mui/icons-material/Map';

function CCardsDashboard() {
    const { exercicios } = useContext(ExerciciosContext);

    return (
        <div className={styles.cards}>
            {exercicios.map((e, i) => (
                <Card
                    className={styles.card}
                    key={i}
                    sx={{
                        width: 345,
                        minHeight: 575,
                        backgroundColor: "#eff6e0",
                        color: "#01161E",
                        margin: "1rem",
                        boxShadow: "1px 1px 20px black"
                    }}>
                    <Map
                        zoom={14}
                        markers={[e]}
                        position={[Number(e.latitude), Number(e.longitude)]}
                        style={{ width: "345px", height: "210px" }}></Map>
                    <div className={styles.card_info}>
                        <div style={{ textAlign: "center" }}>
                            <h4>
                                {e.nome}
                            </h4>

                        </div>

                        <p>
                            <span className={styles.spanCard}>Localização:</span> {e.endereco}, Nº{" "}
                            {e.numero} {e.complemento != "" && e.complemento} - {e.cidade},{" "}
                            {e.estado} / {e.cep}
                        </p>
                        <p>
                            <span className={styles.spanCard}>Tipo:</span> {e.tipo}
                        </p>
                        <p>
                            <span className={styles.spanCard}>Por: </span>
                            {e.nome_usuario}
                        </p>
                        <p>
                            <span className={styles.spanCard}>Descricão:</span> {e.descricao}
                        </p>
                        <a href={`https://www.google.com/maps/search/?api=1&query=${e.latitude},${e.longitude}`} style={{ display: "flex", justifyContent: "end" }}>
                            <span className={styles.spanCard}> Ver no Maps</span>
                        </a>
                    </div>
                </Card>
            ))}
        </div>
    );
}

export default CCardsDashboard;