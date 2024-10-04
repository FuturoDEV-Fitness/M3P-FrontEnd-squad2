import stylesCadastro from "./styles.module.css";
import CTextField from "../../atoms/CTextField";
import CButton from "../../atoms/CButton";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { MenuItem } from "@mui/material";
import { useContext } from "react";
import { UsuariosContext } from "../../../context/UsuariosContext";
import { CepContext } from "../../../context/CepContext";
import { validationSchemaCadastro } from "../../../validation/registrationValidationSchema";

function CFormCadastroUsuario() {
  const navigate = useNavigate();
  const { onSubmitFormCadastro, options } =
    useContext(UsuariosContext);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchemaCadastro),
  });

  const { buscarCep } = useContext(CepContext);

  const handleSubmitForm = async (formCadastro) => {
    const success = await onSubmitFormCadastro(formCadastro, setError);
    if (success){
      navigate("/login")
    }
  }

  return (
    <form
      className={stylesCadastro.formCadastro}
      onSubmit={handleSubmit(handleSubmitForm)}      
    >
      <div className={stylesCadastro.textFields}>
        <CTextField
          variant="standard"
          label="Nome de usuário *"
          type="text"
          fullWidth
          {...register("nome")}
          error={!!errors.nome}
          helperText={errors.nome ? errors.nome.message : ""}
        />
        <CTextField
          variant="standard"
          label="E-mail *"
          type="email"
          fullWidth
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ""}
        />
      </div>
      <div className={stylesCadastro.textFields}>
        <CTextField
          variant="standard"
          label="CPF *"
          type="number"
          fullWidth
          {...register("cpf")}
          error={!!errors.cpf}
          helperText={errors.cpf ? errors.cpf.message : ""}
        />
        <CTextField
          variant="standard"
          label="Data de nascimento *"
          type="date"
          defaultValue="2024-01-01"
          fullWidth
          {...register("data_nascimento")}
          error={!!errors.data_nasc}
          helperText={errors.data_nasc ? errors.data_nasc.message : ""}
        />
      </div>
      <div className={stylesCadastro.textFields}>
        <CTextField
          id="standard-select-currency"
          variant="standard"
          label="Sexo *"
          select
          defaultValue=""
          fullWidth
          {...register("sexo")}
          error={!!errors.sexo}
          helperText={errors.sexo ? errors.sexo.message : ""}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </CTextField>
        <CTextField
          variant="standard"
          label="CEP *"
          type="number"
          fullWidth
          {...register("cep", {
            onBlur: () => buscarCep(getValues, setValue, setError),
          })}
          error={!!errors.cep}
          helperText={errors.cep ? errors.cep.message : ""}
        />
      </div>
      <div className={stylesCadastro.textFields}>
        <div className={stylesCadastro.textFieldsCep}>
          <CTextField
            disabled
            variant="standard"
            label="Endereço"
            type="text"
            defaultValue=" "
            fullWidth
            {...register("endereco")}
          />
          <CTextField
            disabled
            variant="standard"
            label="Cidade"
            type="text"
            defaultValue=" "
            {...register("cidade")}
          />
          <CTextField
            disabled
            variant="standard"
            label="UF"
            defaultValue=" "
            {...register("estado")}
          ></CTextField>
        </div>
      </div>
      <div className={stylesCadastro.textFields}>
        <CTextField
          type="number"
          variant="standard"
          label="Numero *"
          {...register("endereco_numero")}
          error={!!errors.endereco_numero}
          helperText={
            errors.endereco_numero ? errors.endereco_numero.message : ""
          }
          fullWidth
        ></CTextField>
        <CTextField
          type="text"
          variant="standard"
          label="Complemento"
          fullWidth
          {...register("complemento")}
          error={!!errors.complemento}
          helperText={errors.complemento ? errors.complemento.message : ""}
        ></CTextField>
      </div>
      <div className={stylesCadastro.textFields}>
        <CTextField
          variant="standard"
          label="Senha *"
          type="password"
          fullWidth
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ""}
        />
        <CTextField
          variant="standard"
          label="Confirmar Senha *"
          type="password"
          fullWidth
          {...register("confirmar_password")}
          error={!!errors.confirmar_password}
          helperText={
            errors.confirmar_password ? errors.confirmar_password.message : ""
          }
        />
      </div>
      <CButton
        className={stylesCadastro.button}
        type="submit"
        sx={{
          backgroundColor: "#01161e",
          color: "#eff6e0",
          "&:hover": { backgroundColor: "#124559", color: "#eff6e0" },
        }}
      >
        Cadastrar
      </CButton>
      <CButton
        onClick={() => (navigate("/login"))}
        variant="outlined"
        sx={{
          color: "#01161e",
          borderColor: "#01161e",
          "&:hover": { borderColor: "#AEC3B0" },
        }}
      >
        Já possui conta?
      </CButton>
    </form>
  );
}

export default CFormCadastroUsuario;
