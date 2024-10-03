import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

import { CepContext } from "./CepContext";
import {
  formatarCPF,
  formatarCEP,
  formatarData,
} from "../validation/registrationValidationSchema";
import {
  limparCPF,
  limparCEP,
  limparData,
} from "../validation/perfilValidationSchema";
import useAuth from "../hooks/useAuth";

export const UsuariosContext = createContext();
let url = "http://localhost:3333/api";

export const UsuariosContextProvider = ({ children }) => {
  const { endereco } = useContext(CepContext);
  const {
    saveToken,
    saveSession,
    decodeToken,
    clearSession,
    session,
    tokenJWT,
  } = useAuth();

  const [user, setUser] = useState({});

  async function onSubmitFormCadastro(formCadastro, setError) {
    const dataForm = {
      nome: formCadastro.nome,
      email: formCadastro.email,
      password: formCadastro.password,
      cpf: formatarCPF(formCadastro.cpf),
      sexo: formCadastro.sexo,
      data_nascimento: formatarData(formCadastro.data_nascimento),
      endereco: {
        logradouro: endereco.address,
        numero: formCadastro.endereco_numero,
        bairro: endereco.district,
        cidade: endereco.city,
        estado: endereco.state,
        cep: formatarCEP(formCadastro.cep),
        complemento: formCadastro.complemento || "",
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
      toast.success("Usuário cadastrado com sucesso!");
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Erro ao cadastrar usuário!");
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

      toast.success("Login efetuado com sucesso!");
      return true;
    } catch (error) {
      if (error.message === "Usuário não encontrado") {
        toast.error("E-mail ou senha incorreta");
        return;
      }
      if (error.message !== "E-mail ou senha incorreta") {
        toast.error("Erro ao fazer login! Tente novamente mais tarde.");
        return;
      }
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      clearSession();
      return true;
    } catch (error) {
      console.error("Erro ao logout:", error.message);
    }
  };

  const getUser = async () => {
    try {
      if (!session?.id) {
        return setUser({});
      }

      const res = await fetch(`${url}/usuarios/${session.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenJWT}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }

      const data = await res.json();
      const userData = {
        ...data,
        cpf: data.cpf ? limparCPF(data.cpf) : "", // Valida se o CPF existe antes de limpar
        data_nascimento: data.data_nascimento
          ? limparData(data.data_nascimento)
          : "", // Valida se a data de nascimento existe
        endereco: {
          ...data.endereco, // Mantém o restante do objeto endereco
          cep: data.endereco && data.endereco.cep ? limparCEP(data.endereco.cep) : "", // Valida se o endereço e o CEP existem
        },
      };
      

      return setUser(userData);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error.message);
    }
  };

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
        getUser,
        user,
        options,
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
};
