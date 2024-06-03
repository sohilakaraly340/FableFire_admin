import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

      toast.success("Added successfully!");
      return response.data;
    } catch (err) {
      setError(err);
      toast.error(`Error Adding : ${err.response.data.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { postResource, loading, error };
}
