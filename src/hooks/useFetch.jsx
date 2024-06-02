import { useState, useEffect } from "react";
import axios from "axios";

export default function useGet(url, headers = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "multipart/form-data",
            JWT: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvaGlsYUBnbWFpbC5jb20iLCJpYXQiOjE3MTcyNzA0ODEsImV4cCI6MTcxNzM1Njg4MX0.Pei2vuy2vhbP1PxMHYlLERmeMxI4LOhAqlZEgI7qFss`,
            ...headers,
          },
        });

        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
