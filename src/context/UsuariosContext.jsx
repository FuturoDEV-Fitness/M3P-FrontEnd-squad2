import { createContext, useContext } from "react";
import { CepContext } from "./CepContext";
import * as Yup from "yup";

export const UsuariosContext = createContext();
let url = "http://localhost:3333/api/usuarios";

// Função para formatar o CPF
const formatarCPF = (cpf) => {
  return cpf
    .replace(/\D/g, "") // Remove caracteres não numéricos
    .replace(/(\d{3})(\d)/, "$1.$2") // Adiciona o primeiro ponto
    .replace(/(\d{3})(\d)/, "$1.$2") // Adiciona o segundo ponto
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Adiciona o hífen
};

export const UsuariosContextProvider = ({ children }) => {

  const { endereco } = useContext(CepContext);

  const validationSchema = Yup.object().shape({
    nome: Yup.string()
      .required("Nome de usuário obrigatório")
      .max(30, "Nome de usuário muito grande")
      .min(5, "Nome de usuário muito pequeno"),
    email: Yup.string()
      .required("E-mail obrigatório")
      .email("E-mail inválido")
      .max(60, "E-mail muito grande")
      .min(5, "E-mail muito pequeno"),
    cpf: Yup.string()
      .required("CPF obrigatório")
      .length(11, "CPF deve ter 11 caracteres"),
    data_nascimento: Yup.string()
      .required("Data de nascimento obrigatória")
      .max(10, "Data de nascimento inválida")
      .min(10, "Data de nascimento inválida"),
    sexo: Yup.string().required("Sexo obrigatório"),
    cep: Yup.string()
      .required("CEP obrigatório")
      .length(8, "CEP deve ter 8 caracteres"),
    endereco_numero: Yup.string()
      .required("Número obrigatório")
      .max(8, "Número muito grande")
      .min(1, "Número muito pequeno"),
    complemento: Yup.string()
      .max(20, "Complemento muito grande"),
    password: Yup.string()
      .required("Senha obrigatória")
      .max(16, "Senha muito grande")
      .min(8, "Senha muito pequena"),
    confirmar_password: Yup.string()
      .required("Confirme sua senha")
      .max(16, "Senha muito grande")
      .min(8, "Senha muito pequena")
      .oneOf([Yup.ref("password")], "As senhas devem ser iguais"),
  });

  async function onSubmitFormCadastro(formCadastro, setError) {
    const cpfFormatado = formatarCPF(formCadastro.cpf);
    const dataForm = {
      nome: formCadastro.nome,
      email: formCadastro.email,
      password: formCadastro.password,
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
      const res = await fetch(url, {
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

  const options = [
    { label: "Masculino", value: "masculino" },
    { label: "Feminino", value: "feminino" },
    { label: "Outro", value: "outro" },
  ];

  return (
    <UsuariosContext.Provider
      value={{
        validationSchema,
        onSubmitFormCadastro,
        options,
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
};
