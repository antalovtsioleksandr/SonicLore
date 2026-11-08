import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../editor/EditorPage.module.css";

export const AddAlbumPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    year: "",
    type: "LP",
    image: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!formData.title || !formData.artist || !formData.year) {
      setError("Title, Artist, and Year are required!");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/albums", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Помилка сервера");
      }

      navigate(`/catalog/${data.album.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <Link
        to="/catalog"
        className={styles.backBtn}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        ← Back to Archive
      </Link>

      <div className={styles.suptitle}>ADD TO ARCHIVE</div>

      <input
        type="text"
        className={`${styles.titleInput} serif`}
        placeholder="Album Title (e.g. LUX)"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />

      <input
        type="text"
        className={`${styles.titleInput} serif`}
        style={{ fontSize: "24px", marginTop: "10px" }}
        placeholder="Artist Name"
        value={formData.artist}
        onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
      />

      <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
        <input
          type="number"
          className={`${styles.titleInput} serif`}
          style={{ fontSize: "20px", flex: 1 }}
          placeholder="Release Year (e.g. 2026)"
          value={formData.year}
          onChange={(e) => setFormData({ ...formData, year: e.target.value })}
        />

        <select
          className={`${styles.titleInput} serif`}
          style={{
            fontSize: "20px",
            flex: 1,
            backgroundColor: "transparent",
            color: "white",
            cursor: "pointer",
          }}
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        >
          <option value="LP" style={{ color: "black" }}>
            LP (Full Album)
          </option>
          <option value="EP" style={{ color: "black" }}>
            EP (Mini Album)
          </option>
          <option value="Single" style={{ color: "black" }}>
            Single
          </option>
        </select>
      </div>

      <input
        type="text"
        className={`${styles.titleInput} serif`}
        style={{ fontSize: "20px", marginTop: "10px" }}
        placeholder="Cover Image URL (https://...)"
        value={formData.image}
        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
      />

      {error && (
        <div
          style={{ color: "#e06853", marginTop: "20px", fontWeight: "bold" }}
        >
          {error}
        </div>
      )}

      <div className={styles.footer} style={{ marginTop: "40px" }}>
        <button
          className={styles.publishBtn}
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Album"}
        </button>
      </div>
    </div>
  );
};
