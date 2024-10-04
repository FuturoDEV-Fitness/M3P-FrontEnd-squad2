import { createContext, useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { toast } from 'react-toastify'

export const ExerciciosContext = createContext();

import { formatarCEP } from "../validation/registrationValidationSchema";

export const ExerciciosContextProvider = ({ children }) => {
    const API_URL_BACK = "http://localhost:3333/api/locais";
    //const API_URL = "http://localhost:3000/exercicios";

    const [data, setData] = useState([]);
    const [locaisUsuario, setLocaisUsuario] = useState([]);
    const [positionMarker, setPositionMarker] = useState([]);



    //const { data, loading, isVisible } = useFetch(API_URL_BACK);
    const userSession = JSON.parse(localStorage.getItem('userSession'));
    const usuarioId = userSession?.decoded?.id;
    //const usuarioId = JSON.parse(localStorage.getItem("userId"));



    //const locaisUsuario = data?.filter((exercicio) => exercicio.user_id === usuarioId) || [];
    //const positionMarker = data?.map(({ latitude, longitude }) => ({ latitude, longitude })) || [];

    function tranformarDadosEnvio(dados) {
        return {
            nome: dados.nome,
            pratica_esportiva: dados.tipo,
            descricao: dados.descricao,
            endereco: {
                logradouro: dados.endereco,
                numero: dados.numero,
                //bairro: dados.district,
                cidade: dados.cidade,
                estado: dados.estado,
                latitude: dados.latitude,
                longitude: dados.longitude,
                cep: formatarCEP(dados.cep),
                complemento: dados.complemento || ""
            }
        }
    }


    async function LerLocaisCadastrados() {
        try {
            const res = await fetch(`${API_URL_BACK}`, {
                method: "GET",
            });
            const data = await res.json();
            const dataFormatada = data.map(local => ({
                id: local.id,
                id_usuario: local.user_id,
                nome: local.nome || "",
                tipo: local.pratica_esportiva || "",
                descricao: local.descricao || "",
                cep: local.endereco?.cep?.replace('-', '') || "",
                endereco: local.endereco?.logradouro || "",
                cidade: local.endereco?.cidade || "",
                complemento: local.endereco?.complemento || "",
                estado: local.endereco?.estado || "",
                numero: local.endereco?.numero || "",
                latitude: parseFloat(local.endereco?.latitude) || 0,
                longitude: parseFloat(local.endereco?.longitude) || 0
            }));
            setData(dataFormatada);

        } catch (error) {
            console.error(error);
            toast.error("Erro ao ler os locais cadastrados");
        }
    }


    useEffect(() => {
        LerLocaisCadastrados()
        if (data) {
            setPositionMarker(() => {
                return data.map((exercicio) => {
                    return {
                        latitude: exercicio.latitude,
                        longitude: exercicio.longitude
                    };
                });
            });

            setLocaisUsuario(
                data.filter((exercicio) => exercicio.id_usuario === usuarioId) || []
            );
        }
    }, [data]);


    async function cadastrarNovoLocal(formCadastro, setError) {
        const token = localStorage.getItem('tokenJWT');

        const dataForm = tranformarDadosEnvio(formCadastro)

        console.log('Data being sent to the API:', JSON.stringify(dataForm, null, 2));

        try {
            const res = await fetch(`${API_URL_BACK}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(dataForm),
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.log(errorData)
                throw new Error(errorData.mensagem || "Erro na requisição");
            }
            LerLocaisCadastrados()
            toast.success("Local de exercício cadastrado com sucesso!");
            return true;
        } catch (error) {
            console.error(error);
            toast.error("Erro ao cadastrar seu local de exercício!");
        }
    }


    async function atualizarLocais(formRecadastro) {
        const token = localStorage.getItem('tokenJWT');
        const dataForm = tranformarDadosEnvio(formRecadastro)

        console.log('Data being sent to the API:', JSON.stringify(dataForm, null, 2));

        try {
            const res = await fetch(`${API_URL_BACK}/${formRecadastro.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(dataForm),
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.log(errorData)
                throw new Error(errorData.mensagem || "Erro na requisição");
            }
            LerLocaisCadastrados()
            toast.success("Local de exercício atualizado com sucesso!");
            return true;
        } catch (error) {
            console.error(error);
            toast.error("Erro ao atualizar seu local de exercício!");
        }
    }


    

    return (
        <ExerciciosContext.Provider
            value={{
                exercicios: data || [],
                //isVisible,
                //loading,
                locaisUsuario,
                positionMarker,
                cadastrarNovoLocal,
                atualizarLocais
            }}>
            {children}
        </ExerciciosContext.Provider>
    );
};
