import { useState, useEffect, useCallback } from "react";

interface UseAppwriteProps<T> {
  fn: () => Promise<T | null>;
}

export const useAppwrite = <T,>({ fn }: UseAppwriteProps<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await fn();
      setData(result);
    } catch (error) {
      console.error("❌ useAppwrite error:", error);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [fn]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, refetch: fetchData };
};
