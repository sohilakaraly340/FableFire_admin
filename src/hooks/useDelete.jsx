import { useState } from "react";

export default function useDelete(url, headers = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteResource = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete resource");
      }

      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteResource, loading, error };
}
