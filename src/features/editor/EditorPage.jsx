import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./EditorPage.module.css";
import { usePublish } from "./usePublish";

export const EditorPage = () => {
  const { albumId } = useParams();
  const [album, setAlbum] = useState(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const availableTags = [
    "Vocals",
    "Theory",
    "Production",
    "Lyrics",
    "Storyline",
  ];

  const { publishArticle, isPublishing } = usePublish();

  useEffect(() => {
    fetch(`http://localhost:5000/api/albums/${albumId}`)
      .then((res) => res.json())
      .then((data) => setAlbum(data))
      .catch((err) => console.error(err));
  }, [albumId]);

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handlePublish = () => {
    if (!title || !content) return;

    publishArticle({
      title,
      text: content,
      albumId,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      tags: selectedTags,
    });
  };

  return (
    <div className={styles.container}>
      <Link
        to={`/catalog/${albumId}`}
        className={styles.backBtn}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        ← Back to Album
      </Link>

      <div className={styles.context}>
        <div
          className={styles.tinyCover}
          style={{
            backgroundColor: "#2a2a30",
            backgroundImage: album ? `url(${album.image})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <span>
          Writing a review for:{" "}
          {album ? `${album.artist} - ${album.title}` : "Loading..."}
        </span>
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
          {availableTags.map((tag) => (
            <button
              key={tag}
              className={`${styles.tag} ${selectedTags.includes(tag) ? styles.tagActive : ""}`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </button>
          ))}
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
