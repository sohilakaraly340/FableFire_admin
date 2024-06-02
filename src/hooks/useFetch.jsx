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
            JWT: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvaGlsYUBnbWFpbC5jb20iLCJpYXQiOjE3MTczNTc4NTIsImV4cCI6MTcxNzQ0NDI1Mn0.hPNvnvYp_2CpKJ7H97D9CqomDxTl4Xn6vZRrgVRsI1w`,
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
