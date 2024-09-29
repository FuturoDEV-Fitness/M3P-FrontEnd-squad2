import CTextField from "../atoms/CTextField";
import CButton from "../atoms/CButton";
import styles from "../../pages/pagesCSS/Login.module.css";

import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { UsuariosContext } from "../../context/UsuariosContext";
import { validationSchemaLogin } from "../../validation/loginValidationSchema";

function CFormLogin() {
  const { onSubmitFormLogin } = useContext(UsuariosContext);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchemaLogin),
  });

  const onSubmit = (formData) => {
    onSubmitFormLogin(formData);
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles.inputContainer}>
        <CTextField
          label="E-mail"
          variant="standard"
          type="email"
          fullWidth
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
      </div>
      <div className={styles.inputContainer}>
        <CTextField
          label="Senha"
          variant="standard"
          type="password"
          fullWidth
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
      </div>
      <Link to={"/"}>Esqueceu a senha?</Link>
      <CButton
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: "#01161e",
          color: "#eff6e0",
          "&:hover": { backgroundColor: "#124559", color: "#eff6e0" },
        }}
      >
        Entrar
      </CButton>
      <CButton
        className={styles.link}
        variant="outlined"
        sx={{
          color: "#01161e",
          borderColor: "#01161e",
          "&:hover": { borderColor: "#AEC3B0" },
        }}
      >
        Cadastre-se
      </CButton>
    </form>
  );
}


export default CFormLogin;
