import { useState } from "react";
import { request } from "../utils/request";

export const useCreateLecture = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createLecture = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      await request.createLecture(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { createLecture, isLoading, error };
};

