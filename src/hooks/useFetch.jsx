import { useState, useEffect } from "react";

function useFetch(url, options) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(url, options)
      .then((res) => res.json())
      .then((value) => {
        setData(value);
      })
      .catch((error) => {
        alert("Ocorreu um erro ao carregar os dados: ");
        window.location.href = "/login"; 
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 1000);
      });

    return () => {
      setIsVisible(false);
    };
  }, [url]);

  return { data, loading, isVisible };
}

export default useFetch;
