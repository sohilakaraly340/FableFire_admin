import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

      toast.success("Deleted successfully!");
      return response.data;
    } catch (err) {
      setError(err);
      if (
        err.response.data.message === "jwt expired" ||
        err.response.data.message === "invalid signature"
      ) {
        toast.error("Session Expired! Please login again.");
        localStorage.clear();
        window.location.reload();
      } else {
        toast.error(`Error fetching : ${err.response.data.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return { deleteResource, loading, error };
}
