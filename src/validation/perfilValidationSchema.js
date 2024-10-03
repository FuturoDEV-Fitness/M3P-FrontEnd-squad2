import * as Yup from "yup";

export function limparCPF(cpf) {
    return cpf.replace(/[.\-]/g, ""); // Remove pontos e hífen
}

export function limparCEP(cep) {
    return cep.replace(/[-]/g, ""); // Remove hífen
}

export function limparData(data) {
    const partes = data.split("T")[0].split("-"); // Divide pela letra "T" e depois pelo hífen
    const ano = partes[0];
    const mes = partes[1];
    const dia = partes[2];

    return `${ano}-${mes}-${dia}`; // Retorna no formato dd/mm/aaaa
}

export const validationSchemaPerfil = Yup.object().shape({
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
});