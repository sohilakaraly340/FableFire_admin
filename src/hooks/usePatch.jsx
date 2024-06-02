import { useState } from "react";
import axios from "axios";

export default function usePatch(url, headers = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const patchResource = async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.patch(`${url}/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          JWT: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvaGlsYUBnbWFpbC5jb20iLCJpYXQiOjE3MTczNTc4NTIsImV4cCI6MTcxNzQ0NDI1Mn0.hPNvnvYp_2CpKJ7H97D9CqomDxTl4Xn6vZRrgVRsI1w`,
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

  return { patchResource, loading, error };
}
