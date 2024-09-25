import { createContext } from "react";

export const CepContext = createContext();

export const CepContextProvider = ({ children }) => {
 const buscarCep = async (getValues, setValue, index) => {
  let cep = getValues("cep");

  if (cep.length === 8) {
   try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    if (!data.erro) {
     alterarValues(data, setValue, index);
    } else {
     alert("CEP não encontrado");
    }
   } catch (error) {
    alert(error);
   }
  }
 };

 const alterarValues = (data, setValue, index) => {
  setValue("endereco", data.logradouro || "");
  setValue("cidade", data.localidade || "");
  setValue("estado", data.uf || "");
 };

 return (
  <CepContext.Provider value={{ buscarCep }}>{children}</CepContext.Provider>
 );
};