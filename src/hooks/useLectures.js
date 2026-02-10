import { useState, useEffect } from "react";
import { request } from "../utils/request";

export const useLectures = () => {
  const [lectures, setLectures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllLectures = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await request.getAllLectures();
      setLectures(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSingleLecture = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const lecture = await request.getSingleLecture(id);
      if (!lecture) {
        throw new Error(`No lecture found with ID ${id}`);
      }
      return lecture;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllLectures();
  }, []);

  return { lectures, isLoading, error, fetchAllLectures, fetchSingleLecture };
};
