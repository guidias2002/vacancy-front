import { useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

interface UsePostResult<T, R> {
  data: R | null;
  error: string | null;
  loading: boolean;
  postData: (data: T) => void;
}

function usePost<T = unknown, R = unknown>(url: string): UsePostResult<T, R> {
  const [data, setData] = useState<R | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const postData = async (postData: T) => {
    setLoading(true);
    try {
      const response = await axios.post<R>(url, postData);
      setData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, postData };
}

export default usePost;
