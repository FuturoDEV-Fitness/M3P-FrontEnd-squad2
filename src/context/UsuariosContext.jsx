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
const API_URL = import.meta.env.VITE_API_URL;;

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
  const [loading, setLoading] = useState(false);
  const [userAtivos, setUserAtivos] = useState([]);

  async function onSubmitFormCadastro(formCadastro, setError) {
    setLoading(true);
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
      const res = await fetch(`${API_URL}api/usuarios`, {
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
      setLoading(false);
      toast.success("Usuário cadastrado com sucesso!");
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Erro ao cadastrar usuário!");
      setLoading(false);
    }
  }

  const onSubmitFormLogin = async (formLogin) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}api/auth`, {
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

      setLoading(false);
      toast.success("Login efetuado com sucesso!");
      return true;
    } catch (error) {
      if (error.message === "Usuário não encontrado") {
        toast.error("E-mail ou senha incorreta");
        setLoading(false);
        return;
      }
      if (error.message !== "E-mail ou senha incorreta") {
        toast.error("Erro ao fazer login! Tente novamente mais tarde.");
        setLoading(false);
        return;
      }
      setLoading(false);
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      const res = await fetch(`${API_URL}api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenJWT}`,
        },
      })

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }

      toast.success("Logout efetuado com sucesso!");
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

      const res = await fetch(`${API_URL}api/usuarios/${session.id}`, {
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
        cpf: data.cpf ? limparCPF(data.cpf) : "",
        data_nascimento: data.data_nascimento
          ? limparData(data.data_nascimento)
          : "",
        endereco: {
          ...data.endereco,
          cep:
            data.endereco && data.endereco.cep
              ? limparCEP(data.endereco.cep)
              : "",
        },
      };

      return setUser(userData);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error.message);
    }
  };

  const getAllActiveUsers = async () => {
    try {
      const res = await fetch(`${API_URL}api/usuarios/ativos`, {
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
      setUserAtivos(data)
      return; 
    } catch (error) {
      console.error(error.message);
    }
  };

  const updateUser = async (form, setError) => {
    setLoading(true);
    const dataUser = {
      ...form,
      cpf: formatarCPF(form.cpf),
      data_nascimento: formatarData(form.data_nascimento),
      endereco: {
        ...form.endereco,
        cep: formatarCEP(form.endereco.cep),
      },
    };
    try {
      const res = await fetch(`${API_URL}api/usuarios/${session.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenJWT}`,
        },
        body: JSON.stringify(dataUser),
      });

      if (!res.ok) {
        const errorData = await res.json();
        if (errorData.mensagem === "Email já cadastrado por outro usuário") {
          setError("email", {
            type: "manual",
            message: errorData.mensagem,
          });
        }

        if (errorData.mensagem === "CPF já cadastrado por outro usuário") {
          setError("cpf", {
            type: "manual",
            message: errorData.mensagem,
          });
        }

        if(errorData.mensagem === "Senha inválida"){
          toast.error(errorData.mensagem);
        }
        throw new Error();
      }
      setLoading(false);
      toast.success("Usuário atualizado com sucesso!");
      return;
    } catch {
      setLoading(false);
      toast.error("Erro ao atualizar usuário!");
    }
  };

  const deleteUser = async (user_id) => {
    try {
      const res = await fetch(`${API_URL}api/usuarios/${user_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenJWT}`,
        },
      });
      if (!res.ok) {
        const errorData = await res.json();

        if (errorData.mensagem === "Não é possível excluir um usuário com locais associados.") {
          toast.error(errorData.mensagem);
        }
        throw new Error(errorData.message);
      }

      await clearSession();
      toast.success("Usuário excluído com sucesso!");
      window.location.href = "/";
      return;
    } catch {
      toast.error("Erro ao excluir usuário!");
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
        getAllActiveUsers,
        updateUser,
        deleteUser,
        user,
        userAtivos,
        options,
        loading,
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
};
