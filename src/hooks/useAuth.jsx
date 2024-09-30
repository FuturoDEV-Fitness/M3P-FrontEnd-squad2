import { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';

function useAuth() {
    const [tokenJWT, setTokenJWT] = useState(() => {
        return localStorage.getItem("tokenJWT") || null;
    });

    const [session, setSession] = useState(() => {
        return localStorage.getItem("userSession") || null;
    });

    const [error, setError] = useState(null); // Para exibir erros de autenticação

    // Verifica o token a cada 1 minuto para garantir que ele ainda é válido
    useEffect(() => {
        const checkTokenExpiration = () => {
            if (tokenJWT) {
                const { decoded } = decodeToken(tokenJWT);
                if (decoded && decoded.exp * 1000 < Date.now()) {
                    clearSession(); // Limpa se o token expirou
                }
            }
        };

        const intervalId = setInterval(checkTokenExpiration, 60000); // Verifica a cada 1 minuto

        return () => clearInterval(intervalId); // Limpa o intervalo ao desmontar
    }, [tokenJWT]);

    // Atualiza o estado se o token/session no localStorage mudar
    useEffect(() => {
        const handleStorageChange = () => {
            const updatedToken = localStorage.getItem("tokenJWT");
            setTokenJWT(updatedToken);
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    // Verifica o token ao carregar ou quando o tokenJWT mudar
    useEffect(() => {
        if (tokenJWT) {
            try {
                const { decoded } = decodeToken(tokenJWT);

                if (decoded.exp * 1000 < Date.now()) {
                    clearSession(); // Se o token expirou, limpa a sessão
                } else {
                    setSession(decoded); // Atualiza a sessão se o token for válido
                }

            } catch  {
                setError("Sua sessão expirou. Faça login novamente."); // Define mensagem de erro;
                clearSession();
            }
        } else {
            setSession(null); // Limpa a sessão se não houver token
        }
    }, [tokenJWT]);

    // Função para decodificar o token
    const decodeToken = (token) => {
        try {
            return { decoded: jwtDecode(token), valid: true };
        } catch {
            clearSession(); // Limpa a sessão se houver erro
            return { decoded: null, valid: false };
        }
    };

    // Salva o token no localStorage e no estado
    const saveToken = (token) => {
        localStorage.setItem("tokenJWT", token); // Armazena diretamente o token
        setTokenJWT(token); // Atualiza o estado do token
    };

    // Salva a sessão no localStorage e no estado
    const saveSession = (sessionData) => {
        localStorage.setItem("userSession", JSON.stringify(sessionData)); // Armazena diretamente a sessão
        setSession(sessionData); // Atualiza o estado da sessão
    };

    // Limpa a sessão e o token
    const clearSession = () => {
        localStorage.removeItem("tokenJWT");
        localStorage.removeItem("userSession");
        setTokenJWT(null); // Limpa o estado do token
        setSession(null); // Limpa o estado da sessão
        setError(null); // Limpa o erro
    };

    return { session, tokenJWT, error, decodeToken, saveToken, saveSession, clearSession };
}

export default useAuth;
