import { MenuItem } from "@mui/material";
import CButton from "../atoms/CButton";
import CTextField from "../atoms/CTextField";
import styles from "../../pages/pagesCSS/CadastroLocais.module.css";

import { useForm } from "react-hook-form";
import { useContext } from "react";
// import { ExerciciosContext } from "../../context/ExercicioContext";
import { CepContext } from "../../context/CepContext";
function CFormCadastroLocais() {
 const tipos = [
  "Caminhada",
  "Trilha",
  "Natação",
  "Musculação",
  "Surf",
  "Outro"
 ];

 const {
  register,
  handleSubmit,
  formState: { errors },
  setValue,
  getValues
 } = useForm();

//  const { usuarioLogado, cadastrarNovoLocal } = useContext(ExerciciosContext);
 const { buscarCep } = useContext(CepContext);
 return (
  <form
   className={styles.formCad}
   onSubmit={handleSubmit((formLocal) => {
    cadastrarNovoLocal(formLocal, setValue);
   })}
   style={{
    width: "90%",
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",
    paddingTop: "0.5rem",
    alignItems: "center"
   }}>
   <div className={styles.textFields}>
    <CTextField
     label="Nome do local"
     variant="outlined"
     type="text"
     fullWidth
     {...register("nome", {
      required: "Nome do local obrigatório",
      maxLength: {
       value: 50,
       message: "O nome do local deve ter no maximo 50 caracteres"
      }
     })}
    />
    <CTextField
     label="Tipo"
     variant="outlined"
     select
     defaultValue=""
     {...register("tipo", { required: "Tipo obrigatório" })}>
     {tipos.map((tipo, index) => (
      <MenuItem key={index} value={tipo}>
       {tipo}
      </MenuItem>
     ))}
    </CTextField>
   </div>
   <div>
    <div
     style={{
      fontSize: "10px",
      display: "flex",
      justifyContent: "space-around",
      width: "50vw"
     }}>
     {errors.nome && <p style={{ color: "red" }}>{errors.nome.message}</p>}
     {errors.tipo && <p style={{ color: "red" }}>{errors.tipo.message}</p>}
    </div>
   </div>
   {/* {Object.keys(usuarioLogado).length > 0 && (
    <div className={styles.textFields}>
     <CTextField
      label="Usuario"
      variant="outlined"
      type="text"
      fullWidth
      disabled
      defaultValue={usuarioLogado.nome}
      {...register("nome_usuario")}
     />
     <CTextField
      label="Id do usuario"
      variant="outlined"
      type="text"
      fullWidth
      defaultValue={usuarioLogado.id}
      disabled
      {...register("id_usuario")}
     />
    </div>
   )} */}
   <div className={styles.textFieldsCep}>
    <CTextField
     label="CEP"
     variant="outlined"
     type="number"
     fullWidth
     {...register("cep", {
      required: "Cep obrigatório",
      minLength: {
       value: 8,
       message: "Cep deve ter no minimo 8 digitos"
      },
      maxLength: {
       value: 8,
       message: "Cep deve ter no maximo 8 digitos"
      },
      onBlur: () => buscarCep(getValues, setValue)
     })}
    />
    <CTextField
     label="Logradouro"
     variant="outlined"
     type="text"
     fullWidth
     defaultValue=" "
     disabled
     {...register("endereco", { required: "Logradouro obrigatório" })}
    />
    <CTextField
     label="Cidade"
     variant="outlined"
     type="text"
     fullWidth
     defaultValue=" "
     disabled
     {...register("cidade", { required: "Cidade obrigatoria" })}
    />
    <CTextField
     label="Estado"
     variant="outlined"
     type="text"
     fullWidth
     defaultValue=" "
     disabled
     {...register("estado", { required: "Estado obrigatorio" })}
    />
   </div>
   <div className={styles.textFieldsCep2}>
    <CTextField
     label="Numero"
     variant="outlined"
     type="Number"
     fullWidth
     {...register("numero", { required: "Numero obrigatorio" })}
    />
    <CTextField
     label="Latitude"
     variant="outlined"
     type="text"
     fullWidth
     {...register("latitude", { required: "Latitude obrigatoria" })}
    />
    <CTextField
     label="Longitude"
     variant="outlined"
     type="text"
     fullWidth
     {...register("longitude", { required: "Longitude obrigatoria" })}
    />
   </div>
   <div style={{ fontSize: "10px" }}>
    {(errors.cep ||
     errors.endereco ||
     errors.cidade ||
     errors.estado ||
     errors.numero ||
     errors.latitude ||
     errors.longitude) && <p style={{ color: "red" }}>Endereço Obrigatório</p>}
   </div>
   <CTextField
    label="Descrição"
    variant="outlined"
    type="text"
    rows={1}
    fullWidth
    multiline
    {...register("descricao", {
     required: "Descrição obrigatoria",
     maxLength: {
      value: 293,
      message: "Maximo de 293 caracteres"
     },
     minLength: {
      value: 5,
      message: "Minimo de 5 caracteres"
     }
    })}
   />
   <div style={{ fontSize: "10px" }}>
    {errors.descricao && (
     <p style={{ color: "red" }}>{errors.descricao.message}</p>
    )}
   </div>
   <div className={styles.btn}>
    <CButton
     onClick={() => {
      setValue("id_usuario", usuarioLogado.id);
      setValue("nome_usuario", usuarioLogado.nome);
     }}
     variant="contained"
     type="submit"
     sx={{
      backgroundColor: "#01161e",
      width: "50%",
      "&:hover": { backgroundColor: "#124559", color: "#eff6e0" }
     }}>
     Cadastrar
    </CButton>
   </div>
  </form>
 );
}

export default CFormCadastroLocais;