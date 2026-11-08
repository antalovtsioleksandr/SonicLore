import { useState, useEffect } from "react";

export const useAlbums = () => {
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/albums");
        if (!response.ok) throw new Error("Помилка сервера");

        const data = await response.json();

        await new Promise((resolve) => setTimeout(resolve, 800));
        setAlbums(data);
      } catch (error) {
        console.error("Помилка завантаження:", error);
        setAlbums([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  return { albums, isLoading };
};
