import { MenuItem } from "@mui/material";
import CTextField from "../../atoms/CTextField";
import CButton from "../../atoms/CButton";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { CepContext } from "../../../context/CepContext";
import { ExerciciosContext } from "../../../context/ExercicioContext";
import styles from "./styles.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemaLocal } from "../../../validation/localValidationSchema";

function CFormLocal({ local, onSubmit }) {
 let errorCep = "Endereço obrigatório";
 const {
  register,
  handleSubmit,
  getValues,
  setValue,
  reset,
  formState: { errors }
 } = useForm({
  resolver: yupResolver(validationSchemaLocal),
 });
 const { buscarCep } = useContext(CepContext);
 const { deletarLocal } = useContext(ExerciciosContext);
 const [isDisabled, setIsDisabled] = useState(true);

 const tipos = [
  "Caminhada",
  "Trilha",
  "Natação",
  "Musculação",
  "Surf",
  "Outro"
 ];
 return (
  <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
   <div className={styles.inputs}>
    <CTextField
     label="Nome do Local"
     variant="standard"
     fullWidth
     type="text"
     disabled={isDisabled}
     defaultValue={local.nome}
     error={!!errors.nome}
     helperText={errors.nome ? errors.nome.message : ""}
     {...register("nome")}
    />

    <CTextField
     label="CEP"
     variant="standard"
     fullWidth
     type="number"
     disabled={isDisabled}
     defaultValue={local.cep}
     error={!!errors.cep}
     helperText={errors.cep ? errorCep : ""}
     {...register("cep", {
      onBlur: () => buscarCep(getValues, setValue)
    })}
    />
   </div>

   <div className={styles.inputsEndereco}>
    <CTextField
     label="Logradouro"
     variant="standard"
     fullWidth
     type="text"
     disabled
     defaultValue={local.endereco}
     {...register("endereco")}
    />

    <CTextField
     label="Cidade"
     variant="standard"
     fullWidth
     type="text"
     disabled
     defaultValue={local.cidade}
     {...register("cidade")}
    />

    <CTextField
     label="Estado"
     variant="standard"
     fullWidth
     type="text"
     disabled
     defaultValue={local.estado}
     {...register("estado")}
    />

   </div>

   <div className={styles.inputsQuadruplo}>
    <CTextField
     label="Numero"
     variant="standard"
     disabled={isDisabled}
     fullWidth
     type="number"
     defaultValue={local.numero}
     error={!!errors.numero}
     helperText={errors.numero ? errors.numero.message : ""}
     {...register("numero")}
    />

    <CTextField
     label="Latitude"
     variant="standard"
     disabled={isDisabled}
     fullWidth
     type="text"
     defaultValue={local.latitude}
     error={!!errors.latitude}
     helperText={errors.latitude ? errors.latitude.message : ""}
     {...register("latitude")}
    />

    <CTextField
     label="Longitude"
     variant="standard"
     fullWidth
     disabled={isDisabled}
     type="text"
     defaultValue={local.longitude}
     error={!!errors.longitude}
     helperText={errors.longitude ? errors.longitude.message : ""}
     {...register("longitude")}
    />
    <CTextField
     label="Tipo"
     variant="standard"
     select
     disabled={isDisabled}
     fullWidth
     defaultValue={local.tipo}
     error={!!errors.tipo}
     helperText={errors.tipo ? errors.tipo.message : ""}
     {...register("tipo")}>

     {tipos.map((tipo) => (
      <MenuItem key={tipo} value={tipo}>
       {tipo}
      </MenuItem>
     ))}

    </CTextField>

   </div>
   <CTextField
    label="Descrição"
    variant="standard"
    fullWidth
    type="text"
    disabled={isDisabled}
    multiline
    defaultValue={local.descricao}
    error={!!errors.descricao}
    helperText={errors.descricao ? errors.descricao.message : ""}
    {...register("descricao")}
   />

   <div className={styles.buttons}>
    <CButton
     type="submit"
     onClick={
      isDisabled
       ? (e) => {
          e.preventDefault();
          setIsDisabled(!isDisabled);
          reset(local);
         }
       : () => {
          let nome = getValues("nome");
          let cep = getValues("cep");
          let numero = getValues("numero");
          let latitude = getValues("latitude");
          let longitude = getValues("longitude");
          let descricao = getValues("descricao");

          nome.length > 50 || nome.length < 3
           ? null
           : cep.length > 8 || cep.length < 8
           ? null
           : latitude.length === 0 ||
             longitude.length === 0 ||
             numero.length === 0
           ? null
           : descricao.length > 293 || descricao.length < 5
           ? null
           : setIsDisabled(!isDisabled);
         }
     }
     variant="contained"
     sx={
      isDisabled
       ? {
          backgroundColor: "#01161e",
          color: "#eff6e0",
          "&:hover": { backgroundColor: "#124559", color: "#eff6e0" }
         }
       : {
          backgroundColor: "#649000",
          color: "#eff6e0",
          "&:hover": { backgroundColor: "#324800", color: "#eff6e0" }
         }
     }>
     {isDisabled ? "Editar" : "Salvar"}
    </CButton>
    <CButton
     onClick={() => deletarLocal(local.id)}
     variant="outlined"
     sx={{
      color: "#990000",
      borderColor: "#990000",
      "&:hover": {
       backgroundColor: "#990000",
       color: "white"
      }
     }}>
     Excluir
    </CButton>
   </div>
  </form>
 );
}

export default CFormLocal;