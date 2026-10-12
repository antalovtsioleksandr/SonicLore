import { useNavigate } from "react-router-dom";
import styles from "./EditorPage.module.css";
import ethelCover from "../../assets/ethel.png";

export const EditorPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <span
        className={styles.backBtn}
        onClick={() => navigate("/album")}
        style={{ cursor: "pointer" }}
      >
        ← Back to Album
      </span>

      <div className={styles.context}>
        <div
          className={styles.tinyCover}
          style={{
            backgroundImage: `url(${ethelCover})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <span>Writing a review for: Ethel Cain - Preacher's Daughter</span>
      </div>

      <div className={styles.suptitle}>NEW ARTICLE</div>
      <input
        type="text"
        className={`${styles.titleInput} serif`}
        placeholder="Article Title"
      />

      <div className={styles.focusSection}>
        <div className={styles.focusLabel}>FOCUS</div>
        <div className={styles.tags}>
          <button className={`${styles.tag} ${styles.tagActive}`}>
            Vocals
          </button>
          <button className={styles.tag}>Theory</button>
          <button className={styles.tag}>Production</button>
          <button className={styles.tag}>Lyrics</button>
        </div>
      </div>

      <div className={styles.toolbar}>
        <button className={styles.toolBtn}>
          <b>B</b>
        </button>
        <button className={styles.toolBtn}>
          <i>I</i>
        </button>
        <button className={styles.toolBtn}>
          <u>U</u>
        </button>
      </div>

      <textarea
        className={styles.editor}
        placeholder="Write your article..."
      ></textarea>

      <div className={styles.footer}>
        <span className={styles.status}>• Draft saved just now</span>
        <button
          className={styles.publishBtn}
          onClick={() => navigate("/catalog")}
        >
          Publish
        </button>
      </div>
    </div>
  );
};
