import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function usePatch(url, headers = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const patchResource = async (id, data) => {
    const token = localStorage.getItem("token");
    setLoading(true);
    setError(null);
    try {
      const response = await axios.patch(`${url}/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          JWT: token,
          ...headers,
        },
      });

      toast.success("Updated successfully!");
      return response.data;
    } catch (err) {
      setError(err);
      toast.error(`Error Updating : ${err.response.data.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { patchResource, loading, error };
}
