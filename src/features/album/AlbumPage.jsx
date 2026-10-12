import { useNavigate } from "react-router-dom";
import styles from "./AlbumPage.module.css";
import ethelCover from "../../assets/ethel.png";

export const AlbumPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.topNav}>
          <span className="serif" style={{ color: "white", fontSize: "20px" }}>
            SonicLore
          </span>
          <span
            onClick={() => navigate("/catalog")}
            style={{ cursor: "pointer" }}
          >
            ← Archive
          </span>
        </div>

        <div
          className={styles.cover}
          style={{
            backgroundImage: `url(${ethelCover})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <h1 className={`${styles.title} serif`}>Preacher's Daughter</h1>
        <div className={styles.artist}>Ethel Cain</div>
        <div className={styles.stats}>⭐ 4.8 · 312 listener essays</div>
        <p className={styles.description}>
          A Southern Gothic epic of faith, family, escape, and the long shadow
          of home.
        </p>

        <button className={styles.btn} onClick={() => navigate("/editor")}>
          ✎ Write Review
        </button>
      </aside>

      <main className={styles.main}>
        <div className={styles.mainSuptitle}>COMMUNITY LINER NOTES</div>
        <h2 className={`${styles.mainTitle} serif`}>Preacher's Daughter</h2>

        <div className={styles.tags}>
          <span className={`${styles.tag} ${styles.tagActive}`}>All notes</span>
          <span className={styles.tag}>Storyline</span>
          <span className={styles.tag}>Vocals</span>
          <span className={styles.tag}>Production</span>
        </div>

        <div className={styles.reviewCard}>
          <div className={styles.votes}>
            <button className={styles.voteBtn}>▲</button>
            <span>188</span>
            <button className={styles.voteBtn}>▼</button>
          </div>
          <div>
            <div className={styles.authorInfo}>
              <div className={styles.avatar}></div>
              <div>
                <div className={styles.authorName}>Sofia Laurent</div>
                <div className={styles.date}>September 28, 2026</div>
              </div>
            </div>
            <h3 className={`${styles.reviewTitle} serif`}>
              The doomed American dream at the heart of the record
            </h3>
            <p className={styles.reviewText}>
              Preacher's Daughter unfolds like a Southern Gothic novel: memory,
              faith, desire, and violence blur together as Ethel searches for a
              way beyond the life she inherited...
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
