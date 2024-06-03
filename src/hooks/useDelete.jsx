import { useState } from "react";
import axios from "axios";

export default function useDelete(url, headers = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteResource = async (id) => {
    const token = localStorage.getItem("token");
    setLoading(true);
    setError(null);
    try {
      const response = await axios.delete(`${url}/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          JWT: token,
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

  return { deleteResource, loading, error };
}
