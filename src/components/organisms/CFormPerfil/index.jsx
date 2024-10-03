import styles from "./styles.module.css";
import CTextField from "../../atoms/CTextField";
import CButton from "../../atoms/CButton";
import Loading from "../../atoms/Loading";
import { MenuItem } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { UsuariosContext } from "../../../context/UsuariosContext";
import { CepContext } from "../../../context/CepContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemaPerfil } from "../../../validation/perfilValidationSchema";

function CFormPerfil() {
  const { buscarCep } = useContext(CepContext);

  const [isDisabled, setIsDisabled] = useState(true);

  const { getUser, user, options } = useContext(UsuariosContext);

  useEffect(() => {
    getUser();
  }, [user]);

  if (!user) {
    return <Loading />;
  }

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchemaPerfil),
  });
  return (
    <form
      onSubmit={handleSubmit((form) => console.log(form))}
      className={styles.perfil}
    >
      {Object.keys(user).length > 0 && (
        <div className={styles.divPerfil}>
          <div className={styles.inputs}>
            <CTextField
              label="Nome"
              variant="standard"
              fullWidth
              disabled={isDisabled}
              defaultValue={user.nome}
              type="text"
              error={errors.nome}
              helperText={errors.nome?.message}
              {...register("nome")}
            ></CTextField>

            <CTextField
              label="Email"
              variant="standard"
              fullWidth
              disabled={isDisabled}
              defaultValue={user.email}
              type="email"
              error={errors.email}
              helperText={errors.email?.message}
              {...register("email")}
            ></CTextField>
          </div>

          <div className={styles.inputs}>
            <CTextField
              label="CPF"
              variant="standard"
              fullWidth
              disabled={isDisabled}
              defaultValue={user.cpf}
              type="number"
              error={errors.cpf}
              helperText={errors.cpf?.message}
              {...register("cpf")}
            ></CTextField>

            <CTextField
              label="Data de Nascimento"
              variant="standard"
              fullWidth
              disabled={isDisabled}
              type="date"
              defaultValue={user.data_nascimento}
              error={errors.data_nascimento}
              helperText={errors.data_nascimento?.message}
              {...register("data_nascimento")}
            ></CTextField>

            <CTextField
              label="Sexo"
              variant="standard"
              fullWidth
              disabled={isDisabled}
              select
              type="text"
              defaultValue={user.sexo}
              error={errors.sexo}
              helperText={errors.sexo?.message}
              {...register("sexo")}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </CTextField>
          </div>

          <div className={styles.inputs}>
            <CTextField
              label="CEP"
              variant="standard"
              fullWidth
              disabled={isDisabled}
              defaultValue={user.endereco.cep}
              type="number"
              error={errors.cep}
              helperText={errors.cep?.message}
              {...register("cep", {
                onBlur: () => buscarCep(getValues, setValue),
              })}
            ></CTextField>

            <CTextField
              label="Endereço"
              variant="standard"
              fullWidth
              disabled
              defaultValue={user.endereco.logradouro}
              type="text"
              error={errors.endereco}
              helperText={errors.endereco?.message}
              {...register("endereco")}
            ></CTextField>

            <CTextField
              label="Cidade"
              variant="standard"
              fullWidth
              disabled
              defaultValue={user.endereco.cidade}
              type="text"
              error={errors.cidade}
              helperText={errors.cidade?.message}
              {...register("cidade")}
            ></CTextField>
          </div>
          
          <div className={styles.inputs}>
            <CTextField
              label="Estado"
              variant="standard"
              fullWidth
              disabled
              defaultValue={user.endereco.estado}
              type="text"
              error={errors.estado}
              helperText={errors.estado?.message}
              {...register("estado")}
            ></CTextField>

            <CTextField
              label="Número"
              variant="standard"
              fullWidth
              disabled={isDisabled}
              defaultValue={user.endereco.numero}
              type="number"
              error={errors.endereco_numero}
              helperText={errors.endereco_numero?.message}
              {...register("endereco_numero")}
            ></CTextField>

            <CTextField
              label="Complemento"
              variant="standard"
              fullWidth
              disabled={isDisabled}
              defaultValue={user.endereco.complemento}
              type="text"
              error={errors.complemento}
              helperText={errors.complemento?.message}
              {...register("complemento")}
            ></CTextField>
          </div>

          <div className={styles.buttons}>
            <CButton
              variant="contained"
              type="submit"
              onClick={
                isDisabled
                  ? (e) => {
                      e.preventDefault();
                      setIsDisabled(!isDisabled);
                      reset({
                        nome: user.nome,
                        email: user.email,
                        cpf: user.cpf,
                        data_nascimento: user.data_nascimento,
                        sexo: user.sexo,
                        cep: user.endereco.cep,
                        endereco_numero: user.endereco.numero,
                        complemento: user.endereco.complemento,
                      });
                    }
                  : () => {
                      let nome = getValues("nome");
                      let email = getValues("email");
                      let cpf = getValues("cpf");
                      let data_nasc = getValues("data_nascimento");
                      let sexo = getValues("sexo");
                      let cep = getValues("cep");
                      let numero = getValues("endereco_numero");

                      // Validações
                      if (
                        nome.length < 3 ||
                        nome.length > 50 ||
                        email.length < 3 ||
                        email.length > 50 ||
                        cpf.length !== 11 ||
                        !data_nasc ||
                        !sexo ||
                        cep.length < 8 ||
                        cep.length > 8 ||
                        numero === ""
                      ) {
                        return;
                      }

                      setIsDisabled(!isDisabled);
                    }
              }
              sx={
                isDisabled
                  ? {
                      backgroundColor: "#01161e",
                      color: "#eff6e0",
                      "&:hover": {
                        backgroundColor: "#124559",
                        color: "#eff6e0",
                      },
                    }
                  : {
                      backgroundColor: "#649000",
                      color: "#eff6e0",
                      "&:hover": {
                        backgroundColor: "#324800",
                        color: "#eff6e0",
                      },
                    }
              }
            >
              {isDisabled ? "Editar" : "Salvar"}
            </CButton>

            <CButton
              variant="outlined"
              onClick={() => excluirUsuario(user.id)}
              sx={{
                color: "#990000",
                borderColor: "#990000",
                "&:hover": {
                  backgroundColor: "#990000",
                  color: "white",
                },
              }}
            >
              Excluir Perfil
            </CButton>
          </div>
        </div>
      )}
    </form>
  );
}

export default CFormPerfil;
