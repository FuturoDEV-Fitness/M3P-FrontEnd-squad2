import * as Yup from "yup";

// Função para formatar o CPF
export const formatarCPF = (cpf) => {
    return cpf
        .replace(/\D/g, "") // Remove caracteres não numéricos
        .replace(/(\d{3})(\d)/, "$1.$2") // Adiciona o primeiro ponto
        .replace(/(\d{3})(\d)/, "$1.$2") // Adiciona o segundo ponto
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Adiciona o hífen
};

// Função para formatar o CEP
export const formatarCEP = (cep) => {
    return cep
        .replace(/\D/g, "") // Remove caracteres não numéricos
        .replace(/(\d{5})(\d)/, "$1-$2"); // Adiciona o hífen
}

// Função para formatar a data de AAAA/MM/DD para DD/MM/AAAA
export const formatarData = (data) => {
    const [ano, mes, dia] = data.split('-'); // Separar a data original por '-'
    // Retornar no formato DD/MM/AAAA
    return `${dia}/${mes}/${ano}`;
};

export const validationSchemaCadastro = Yup.object().shape({
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
        .min(6, "Senha muito pequena"),
    confirmar_password: Yup.string()
        .required("Confirme sua senha")
        .max(16, "Senha muito grande")
        .min(6, "Senha muito pequena")
        .oneOf([Yup.ref("password")], "As senhas devem ser iguais"),
});