import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./EditorPage.module.css";
import ethelCover from "../../assets/ethel.png";
import { usePublish } from "./usePublish";

export const EditorPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { publishArticle, isPublishing } = usePublish();

  const handlePublish = () => {
    if (!title || !content) return; // Проста валідація
    publishArticle({ title, content, albumId: 1 });
  };

  return (
    <div className={styles.container}>
      <Link
        to="/album"
        className={styles.backBtn}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        ← Back to Album
      </Link>

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
        value={title}
        onChange={(e) => setTitle(e.target.value)}
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
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

      <div className={styles.footer}>
        <span className={styles.status}>
          {title.length > 0 ? "Draft in progress..." : "Draft saved just now"}
        </span>
        <button
          className={styles.publishBtn}
          onClick={handlePublish}
          disabled={isPublishing}
        >
          {isPublishing ? "Publishing..." : "Publish"}
        </button>
      </div>
    </div>
  );
};
