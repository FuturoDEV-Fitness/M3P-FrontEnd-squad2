import { MenuItem } from "@mui/material";
import CButton from "../../atoms/CButton";
import CTextField from "../../atoms/CTextField";
import styles from "./styles.module.css";

import { useForm } from "react-hook-form";
import { useContext } from "react";
import { ExerciciosContext } from "../../../context/ExercicioContext";
import { CepContext } from "../../../context/CepContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemaLocal } from "../../../validation/localValidationSchema";
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
  } = useForm({
    resolver : yupResolver(validationSchemaLocal),
  });

  const { cadastrarNovoLocal } = useContext(ExerciciosContext);
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
        gap: ".4rem",
        paddingTop: "0.5rem",
        alignItems: "center"
      }}>
      <div className={styles.textFields}>
        <CTextField
          label="Nome do local *"
          variant="outlined"
          type="text"
          fullWidth
          errors={errors.nome?.message}
          helperText={errors.nome?.message}
          {...register("nome")}
        />

      </div>
      <div className={styles.textFields2}>

      <CTextField
          label="Tipo *"
          variant="outlined"
          select
          defaultValue=""
          fullWidth
          errors={errors.tipo?.message}
          helperText={errors.tipo?.message}
          {...register("tipo")}>

          {tipos.map((tipo, index) => (
            <MenuItem key={index} value={tipo}>
              {tipo}
            </MenuItem>
          ))}

        </CTextField>

        <CTextField
          label="CEP *"
          variant="outlined"
          type="number"
          fullWidth
          errors={errors.cep?.message}
          helperText={errors.cep?.message}
          {...register("cep", {
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
          {...register("logradouro")}
        />

        <CTextField
          label="Cidade"
          variant="outlined"
          type="text"
          fullWidth
          defaultValue=" "
          disabled
          {...register("cidade")}
        />

      </div>
      <div className={styles.textFields2}>

      <CTextField
          label="Estado"
          variant="outlined"
          type="text"
          fullWidth
          defaultValue=" "
          disabled
          {...register("estado")}
        />

        <CTextField
          label="Numero *"
          variant="outlined"
          type="text"
          fullWidth
          errors={errors.numero?.message}
          helperText={errors.numero?.message}
          {...register("numero")}
        />

        <CTextField
          label="Latitude *"
          variant="outlined"
          defaultValue=" "
          type="text"
          fullWidth
          errors={errors.latitude?.message}
          helperText={errors.latitude?.message}
          {...register("latitude")}
        />

        <CTextField
          label="Longitude *"
          variant="outlined"
          defaultValue=" "
          type="text"
          fullWidth
          errors={errors.longitude?.message}
          helperText={errors.longitude?.message}
          {...register("longitude")}
        />

      </div>

      <CTextField
        label="Descrição *"
        variant="outlined"
        type="text"
        rows={1}
        fullWidth
        multiline
        errors={errors.descricao?.message}
        helperText={errors.descricao?.message}
        {...register("descricao")}
      />
      
      <div className={styles.btn}>
        <CButton
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