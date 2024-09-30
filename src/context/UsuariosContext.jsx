import { createContext, useContext } from "react";

import { CepContext } from "./CepContext";
import { formatarCPF } from "../validation/registrationValidationSchema"
import useAuth from "../hooks/useAuth";

export const UsuariosContext = createContext();
let url = "http://localhost:3333/api";

export const UsuariosContextProvider = ({ children }) => {

  const { endereco } = useContext(CepContext);
  const { saveToken, saveSession, decodeToken, clearSession } = useAuth()

  async function onSubmitFormCadastro(formCadastro, setError) {
    const cpfFormatado = formatarCPF(formCadastro.cpf);
    const dataForm = {
      nome: formCadastro.nome,
      email: formCadastro.email,
      password: formCadastro.password,
      confirmar_senha: formCadastro.confirmar_password,
      cpf: cpfFormatado,
      sexo: formCadastro.sexo,
      data_nascimento: formCadastro.data_nascimento,
      endereco: {
        rua: endereco.address,
        numero: formCadastro.endereco_numero,
        complemento: formCadastro.complemento || "",
        cidade: endereco.city,
        bairro: endereco.district,
        estado: endereco.state,
        cep: formCadastro.cep,
        latitude: endereco.lat,
        longitude: endereco.lng,
      },
    };

    try {
      const res = await fetch(`${url}/usuarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForm),
      });

      if (!res.ok) {
        const errorData = await res.json();
        if (errorData.mensagem === "Email já cadastrado") {
          setError("email", {
            type: "manual",
            message: errorData.mensagem,
          });
        }
        if (errorData.mensagem === "CPF já cadastrado") {
          setError("cpf", {
            type: "manual",
            message: errorData.mensagem,
          });
        }
        throw new Error(errorData.mensagem || "Erro na requisição");
      }

      const data = await res.json();
      console.log("Usuário cadastrado com sucesso:", data);
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error.message);
    }
  }

  const onSubmitFormLogin = async (formLogin) => {
    try {
      const res = await fetch(`${url}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formLogin),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Erro ao fazer login");
      }

      const { token } = await res.json();
      saveToken(token);
      saveSession(decodeToken(token));
      
      return true;
    } catch (error) {
      console.error("Erro:", error.message);
    }
  };

  const logout = async () => {
    try{
      clearSession();
      return true;
    } catch(error){
      console.error("Erro ao logout:", error.message);
    }
  }
  
  const options = [
    { label: "Masculino", value: "masculino" },
    { label: "Feminino", value: "feminino" },
    { label: "Outro", value: "outro" },
  ];

  return (
    <UsuariosContext.Provider
      value={{
        onSubmitFormCadastro,
        onSubmitFormLogin,
        logout,
        options
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
};
