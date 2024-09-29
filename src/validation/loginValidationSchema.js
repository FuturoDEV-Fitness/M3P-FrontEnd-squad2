import * as Yup from "yup";

export const validationSchemaLogin = Yup.object().shape({
    email: Yup.string()
      .required("E-mail obrigatório")
      .email("E-mail inválido")
      .max(60, "E-mail muito grande")
      .min(5, "E-mail muito pequeno"),
    password: Yup.string()
      .required("Senha obrigatória")
      .max(16, "Senha muito grande")
      .min(8, "Senha muito pequena"),
  });