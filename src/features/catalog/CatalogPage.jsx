import { Link } from "react-router-dom";
import styles from "./CatalogPage.module.css";
import { useAlbums } from "./useAlbums";

export const CatalogPage = () => {
  const { albums, isLoading } = useAlbums();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.suptitle}>PERSONAL COLLECTION</div>
        <h1 className={`${styles.title} serif`}>Your Archive</h1>
        <div className={styles.stats}>
          {albums.length} albums • Updated today
        </div>
      </div>

      {isLoading ? (
        <div style={{ color: "white", marginTop: "20px" }}>
          Loading archive...
        </div>
      ) : (
        <div className={styles.grid}>
          {albums.map((album) => (
            <Link
              to="/album"
              key={album.id}
              className={styles.card}
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "block",
              }}
            >
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
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
