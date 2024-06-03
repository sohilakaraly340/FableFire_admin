import { useState, useEffect } from "react";
import axios from "axios";

export default function useGet(url, headers = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "multipart/form-data",
            JWT: token,
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
