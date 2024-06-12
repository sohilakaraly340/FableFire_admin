import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        if (err.response.data.message === "jwt expired") {
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

    fetchData();
  }, []);

  return { data, loading, error };
}
