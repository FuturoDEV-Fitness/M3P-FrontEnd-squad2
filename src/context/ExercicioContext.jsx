import { createContext, useState, useEffect } from "react";
import { toast } from 'react-toastify'
import { formatarCEP } from "../validation/registrationValidationSchema";

export const ExerciciosContext = createContext();

export const ExerciciosContextProvider = ({ children }) => {
    const API_URL = import.meta.env.VITE_API_URL;
    
    const [data, setData] = useState([]);
    const [locaisUsuario, setLocaisUsuario] = useState([]);
    const [positionMarker, setPositionMarker] = useState([]);

    const userSession = JSON.parse(localStorage.getItem('userSession'));
    const usuarioId = userSession?.decoded?.id;


    useEffect(() => {
        LerLocaisCadastrados();
    }, []); 


    function tranformarDadosEnvio(dados) {
        return {
            nome: dados.nome,
            pratica_esportiva: dados.tipo,
            descricao: dados.descricao,
            endereco: {
                logradouro: dados.logradouro ? dados.logradouro : dados.endereco,
                numero: dados.numero || "",
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
            const res = await fetch(`${API_URL}api/locais`, {
                method: "GET",
            });
            const data = await res.json();
            const dataFormatada = data.map(local => ({
                id: local.id,
                id_usuario: local.usuarioId,
                nome_usuario: local.usuario?.nome || "",
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
                (data.filter((exercicio) => exercicio.id_usuario === usuarioId) || []).reverse()
            );
        }
    }, [data]);


    async function cadastrarNovoLocal(formCadastro, setError) {
        const token = localStorage.getItem('tokenJWT');

        const dataForm = tranformarDadosEnvio(formCadastro)

        try {
            const res = await fetch(`${API_URL}api/locais`, {
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
        console.log(formRecadastro)
        const dataForm = tranformarDadosEnvio(formRecadastro)

        console.log('Data being sent to the API:', JSON.stringify(dataForm, null, 2));

        try {
            const res = await fetch(`${API_URL}api/locais/${formRecadastro.id}`, {
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


    async function deletarLocal(id) {
        const token = localStorage.getItem('tokenJWT');
        fetch(`${API_URL}api/locais/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(() => {
                LerLocaisCadastrados()
                toast.success("Local de exercício deletado com sucesso!");
            })
            .catch(() => {
                console.error(error);
                toast.error("Erro ao deletar local de exercício!");
            })
    }


    return (
        <ExerciciosContext.Provider
            value={{
                exercicios: data || [],
                locaisUsuario,
                positionMarker,
                cadastrarNovoLocal,
                atualizarLocais,
                deletarLocal
            }}>
            {children}
        </ExerciciosContext.Provider>
    );
};
