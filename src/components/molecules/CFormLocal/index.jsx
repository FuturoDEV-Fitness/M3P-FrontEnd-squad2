import { MenuItem } from "@mui/material";
import CTextField from "../../atoms/CTextField";
import CButton from "../../atoms/CButton";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { CepContext } from "../../../context/CepContext";
import { ExerciciosContext } from "../../../context/ExercicioContext";
import styles from "../../templates/CTemplateListaLocais/styles.module.css";

function CFormLocal({ local, onSubmit }) {
 let errorCep = "Endereço obrigatório";
 const {
  register,
  handleSubmit,
  getValues,
  setValue,
  reset,
  formState: { errors }
 } = useForm();
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
     {...register("nome", {
      required: "Nome do local obrigatório",
      maxLength: {
       value: 50,
       message: "O nome do local deve ter no maximo 50 caracteres"
      },
      minLength: {
       value: 3,
       message: "Nome do local deve ter no mínimo 3 caracteres"
      }
     })}
    />
    <CTextField
     label="CEP"
     variant="standard"
     fullWidth
     type="number"
     disabled={isDisabled}
     defaultValue={local.cep}
     {...register("cep", {
      required: "CEP obrigatório",
      maxLength: {
       value: 8,
       message: "CEP deve ter no máximo 8 digitos"
      },
      minLength: {
       value: 8,
       message: "CEP deve ter no mínimo 8 digitos"
      },
      onBlur: () => buscarCep(getValues, setValue)
     })}
    />
   </div>
   <div
    style={{
     color: "red",
     width: "100%",
     fontSize: "10px",
     marginTop: "10px",
     marginBottom: "10px"
    }}>
    {errors.nome && <p>{errors.nome.message}</p>}
   </div>

   <div className={styles.inputsEndereco}>
    <CTextField
     label="Logradouro"
     variant="standard"
     fullWidth
     type="text"
     disabled
     defaultValue={local.endereco}
     {...register("endereco", {
      required: "Logradouro obrigatório"
     })}
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
     {...register("numero", {
      required: "Numero obrigatorio"
     })}
    />
    <CTextField
     label="Latitude"
     variant="standard"
     disabled={isDisabled}
     fullWidth
     type="text"
     defaultValue={local.latitude}
     {...register("latitude", {
      required: "Latitude obrigatoria"
     })}
    />
    <CTextField
     label="Longitude"
     variant="standard"
     fullWidth
     disabled={isDisabled}
     type="text"
     defaultValue={local.longitude}
     {...register("longitude", {
      required: "Longitude obrigatoria"
     })}
    />
    <CTextField
     label="Tipo"
     variant="standard"
     select
     disabled={isDisabled}
     fullWidth
     defaultValue={local.tipo}
     {...register("tipo", { required: "Tipo obrigatorio" })}>
     {tipos.map((tipo) => (
      <MenuItem key={tipo} value={tipo}>
       {tipo}
      </MenuItem>
     ))}
    </CTextField>
    <div
     style={{
      color: "red",
      width: "200%",
      fontSize: "10px"
     }}>
     {(errors.cep || errors.numero || errors.latitude || errors.longitude) && (
      <p>{errorCep}</p>
     )}
    </div>
   </div>
   <CTextField
    label="Descrição"
    variant="standard"
    fullWidth
    type="text"
    disabled={isDisabled}
    multiline
    defaultValue={local.descricao}
    {...register("descricao", {
     required: "Descrição obrigatoria",
     maxLength: {
      value: 293,
      message: "Descricão muito grande (293 caracteres max)"
     },
     minLength: {
      value: 5,
      message: "Descricão muito pequena (5 caracteres min)"
     }
    })}
   />
   <div
    style={{
     color: "red",
     width: "100%",
     fontSize: "10px",
     marginTop: "10px"
    }}>
    {errors.descricao && <p>{errors.descricao.message}</p>}
   </div>
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