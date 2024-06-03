import { useState } from "react";
import axios from "axios";

export default function usePost(url, headers = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postResource = async (data, isFormData = false) => {
    const token = localStorage.getItem("token");
    setLoading(true);
    setError(null);
    try {
      const contentType = "multipart/form-data";

      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": contentType,
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

  return { postResource, loading, error };
}
