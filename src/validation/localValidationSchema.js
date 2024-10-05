import * as Yup from "yup";

export const validationSchemaLocal = Yup.object().shape({
    nome: Yup.string()
        .required("Nome do local obrigatório")
        .max(30, "Nome do local muito grande")
        .min(3, "Nome do local muito pequeno"),
    cep: Yup.string()
        .required("CEP obrigatório")
        .length(8, "CEP deve ter 8 caracteres"),
    numero: Yup.string()
        .required("Numero obrigatório")
        .max(8, "Numero muito grande")
        .min(1, "Numero muito pequeno"),
    latitude: Yup.string()
        .required("Latitude obrigatória"),
    longitude: Yup.string()
        .required("Longitude obrigatória"),
    tipo: Yup.string()
         .required("Tipo obrigatório"),
    descricao: Yup.string()
        .required("Descrição obrigatória")
        .max(200, "Descrição muito grande")
        .min(5, "Descrição muito pequena"),
})