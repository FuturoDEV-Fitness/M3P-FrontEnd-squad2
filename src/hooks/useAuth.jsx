import { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';

function useAuth() {
    const [tokenJWT, setTokenJWT] = useState(() => {
        return JSON.parse(localStorage.getItem("tokenJWT")) || null;
    });

    const [session, setSession] = useState(() => {
        return JSON.parse(localStorage.getItem("userSession")) || null;
    });

    useEffect(() => {
        if (tokenJWT) {
            try {
                const {decoded} = decodeToken(tokenJWT);

                if (decoded.exp * 1000 < Date.now()) {
                    clearSession();
                } else {
                    setSession(decoded); // Atualiza a sessão se o token for válido
                }

            } catch (error) {
                console.error("Erro ao decodificar o token:", error);
                clearSession();
            }
        } else {
            setSession(null); // Limpa a sessão se não houver token
        }

    }, [tokenJWT]);

    const decodeToken = (token) => {
        try {
            return { decoded: jwtDecode(token), valid: true };
        } catch (error) {
            console.error("Erro ao decodificar o token:", error);
            clearSession();
            return { decoded: null, valid: false }
        }
    };

    const saveToken = (token) => {
        localStorage.setItem("tokenJWT", JSON.stringify(token));
        setTokenJWT(token); // Atualiza o estado do token
    };

    const saveSession = (sessionData) => {
        localStorage.setItem("userSession", JSON.stringify(sessionData));
        setSession(sessionData); // Atualiza o estado da sessão
    };

    const clearSession = () => {
        localStorage.removeItem("tokenJWT");
        localStorage.removeItem("userSession");
        setTokenJWT(null); // Limpa o estado do token
        setSession(null); // Limpa o estado da sessão
    };

    return { session, decodeToken, saveToken, saveSession, clearSession };
}

export default useAuth;
