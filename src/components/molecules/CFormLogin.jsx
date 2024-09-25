import CTextField from "../atoms/CTextField";
import CButton from "../atoms/CButton";
import styles from "../../pages/pagesCSS/Login.module.css";

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
//import { UsuariosContext } from "../../context/UsuariosContext";

function CFormLogin() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  //const { onSubmitFormLogin, senhaError, emailError, gotoRegister } = useContext(UsuariosContext);
  return (
    <form
      className={styles.form}
      // onSubmit={handleSubmit((formLogin) => onSubmitFormLogin(formLogin))}
    >
      <div className={styles.inputContainer}>
        <CTextField
          label="E-mail"
          variant="standard"
          type="email"
          fullWidth
          {...register("email", {
            required: "Email obrigatório",
          })}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        {/* emailError && <p className={styles.error}>{emailError}</p> */}
      </div>
      <div className={styles.inputContainer}>
        <CTextField
          label="Senha"
          variant="standard"
          type="password"
          fullWidth
          {...register("senha", {
            required: "Senha obrigatória",
            minLength: {
              value: 8,
              message: "Senha muito curta (8 caracteres)",
            },
            maxLength: {
              value: 16,
              message: "Senha muito longa (16 caracteres)",
            },
          })}
        />
        {errors.senha && <p className={styles.error}>{errors.senha.message}</p>}
        {/* senhaError && <p className={styles.error}>{senhaError}</p>} */}
      </div>
      <Link to={"/"}>Esqueceu a senha?</Link>
      <CButton


        // Ambiente de teste
        component={Link} 
        to="/" 
        // ......


        variant="contained"
        type="submit"
        sx={{
          backgroundColor: "#01161e",
          color: "#eff6e0",
          "&:hover": { backgroundColor: "#124559", color: "#eff6e0" },
        }}
      >
        Entrar
      </CButton>
      <CButton
        //onClick={() => gotoRegister()}
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
