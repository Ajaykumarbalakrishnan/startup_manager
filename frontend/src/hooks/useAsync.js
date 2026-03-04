import { useState, useCallback } from "react";

/**
 * Custom hook for handling async API calls with loading and error states
 * @param {Function} asyncFn - Async function to execute
 * @returns {Object} { execute, loading, error, clearError }
 */
export function useAsync(asyncFn) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      setError("");
      try {
        return await asyncFn(...args);
      } catch (e) {
        const errorMsg = String(e.message || e);
        setError(errorMsg);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [asyncFn]
  );

  const clearError = useCallback(() => setError(""), []);

  return { execute, loading, error, clearError };
}
