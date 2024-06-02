import { useState } from "react";
import axios from "axios";

export default function usePost(url, headers = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postResource = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          JWT: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvaGlsYUBnbWFpbC5jb20iLCJpYXQiOjE3MTcyNzA0ODEsImV4cCI6MTcxNzM1Njg4MX0.Pei2vuy2vhbP1PxMHYlLERmeMxI4LOhAqlZEgI7qFss`,
          ...headers,
        },
      });

      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { postResource, loading, error };
}
