import { useState, useEffect } from "react";
import ethelCover from "../../assets/ethel.png";
import rosaliaCover from "../../assets/rosalia.png";
import charliCover from "../../assets/charli.png";
import beyonceCover from "../../assets/beyonce.png";
import fkaCover from "../../assets/fka.png";
import tvgirlCover from "../../assets/tvgirl.png";
import segaCover from "../../assets/sega.png";
import tinasheCover from "../../assets/tinashe.png";

const MOCK_ALBUMS = [
  {
    id: 1,
    title: "Preacher's Daughter",
    artist: "Ethel Cain",
    year: "2022",
    type: "LP",
    image: ethelCover,
  },
  {
    id: 2,
    title: "LUX",
    artist: "Rosalía",
    year: "2025",
    type: "EP",
    image: rosaliaCover,
  },
  {
    id: 3,
    title: "Music, Fashion, Film",
    artist: "Charli XCX",
    year: "2024",
    type: "LP",
    image: charliCover,
  },
  {
    id: 4,
    title: "Lemonade",
    artist: "Beyoncé",
    year: "2026",
    type: "LP",
    image: beyonceCover,
  },
  {
    id: 5,
    title: "Caprisongs",
    artist: "FKA Twigs.",
    year: "2023",
    type: "LP",
    image: fkaCover,
  },
  {
    id: 6,
    title: "Who Really Cares",
    artist: "TV Girl",
    year: "2025",
    type: "EP",
    image: tvgirlCover,
  },
  {
    id: 7,
    title: "Romeo",
    artist: "Sega Bodega",
    year: "2022",
    type: "LP",
    image: segaCover,
  },
  {
    id: 8,
    title: "Popstar",
    artist: "Tinashe",
    year: "2024",
    type: "LP",
    image: tinasheCover,
  },
];

export const useAlbums = () => {
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/albums",
        );
        if (!response.ok) throw new Error("Помилка сервера");

        await new Promise((resolve) => setTimeout(resolve, 800));
        setAlbums(MOCK_ALBUMS);
      } catch (error) {
        console.error("Помилка завантаження:", error);
        setAlbums(MOCK_ALBUMS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  return { albums, isLoading };
};
