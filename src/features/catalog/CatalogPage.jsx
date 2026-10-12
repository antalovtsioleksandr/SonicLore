import styles from "./CatalogPage.module.css";

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
    artist: "FKA Twigs",
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

export const CatalogPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.suptitle}>PERSONAL COLLECTION</div>
        <h1 className={`${styles.title} serif`}>Your Archive</h1>
        <div className={styles.stats}>
          48 albums • 31 artists • Updated today
        </div>
      </div>

      <div className={styles.grid}>
        {MOCK_ALBUMS.map((album) => (
          <div key={album.id} className={styles.card}>
            <div
              className={styles.cover}
              style={{
                backgroundImage: `url(${album.image})`,
                backgroundColor: "#2a2a30",
              }}
            ></div>

            <div className={styles.cardHeader}>
              <h3 className={`${styles.albumTitle} serif`}>{album.title}</h3>
              <span className={styles.moreBtn}>•••</span>
            </div>

            <div className={styles.cardFooter}>
              <span>{album.artist}</span>
              <span>
                {album.year} · {album.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
