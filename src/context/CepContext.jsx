import { createContext, useState } from "react";

export const CepContext = createContext();

export const CepContextProvider = ({ children }) => {

  const [endereco, setEndereco] = useState(null);

  const buscarCep = async (getValues, setValue) => {
    let cep = getValues("cep");

    if (cep.length === 8) {
      try {
        const response = await fetch(
          `https://cep.awesomeapi.com.br/json/${cep}`
        );
        const data = await response.json();
        if (!data.code && !data.message) {
          alterarValues(data, setValue);
        } else {
          alert("CEP não encontrado");
        }
      } catch (error) {
        alert(error);
      }
    }
  };

const alterarValues = (data, setValue) => {
    setEndereco(data);
    setValue("endereco", data.address || "");
    setValue("cidade", data.city || "");
    setValue("estado", data.state || "");
  };

  return (
    <CepContext.Provider value={{ buscarCep, endereco }}>{children}</CepContext.Provider>
  );
};
