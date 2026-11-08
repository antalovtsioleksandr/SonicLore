import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./AlbumPage.module.css";

const ReviewItem = ({ review }) => {
  const [userVote, setUserVote] = useState(0);
  const baseVotes = review.votes || 0;

  const handleUpvote = () => {
    setUserVote(userVote === 1 ? 0 : 1);
  };

  const handleDownvote = () => {
    setUserVote(userVote === -1 ? 0 : -1);
  };

  const currentVotes = baseVotes + userVote;

  return (
    <div className={styles.reviewCard}>
      <div className={styles.votes}>
        <button
          className={styles.voteBtn}
          onClick={handleUpvote}
          style={{ color: userVote === 1 ? "#e06853" : "inherit" }}
        >
          ▲
        </button>
        <span>{currentVotes}</span>
        <button
          className={styles.voteBtn}
          onClick={handleDownvote}
          style={{ color: userVote === -1 ? "#e06853" : "inherit" }}
        >
          ▼
        </button>
      </div>
      <div>
        <div className={styles.authorInfo}>
          <div
            className={styles.avatar}
            style={{ backgroundColor: "#e06853" }}
          ></div>
          <div>
            <div className={styles.authorName}>Anonymous Writer</div>
            <div className={styles.date}>{review.date || "Just now"}</div>
          </div>
        </div>
        <h3 className={`${styles.reviewTitle} serif`}>{review.title}</h3>
        <p className={styles.reviewText}>{review.text}</p>
      </div>
    </div>
  );
};

export const AlbumPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All notes");

  const filterTabs = [
    "All notes",
    "Storyline",
    "Vocals",
    "Production",
    "Theory",
    "Lyrics",
  ];

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/albums/${id}`);
        if (!response.ok) throw new Error("Альбом не знайдено");

        const data = await response.json();
        setAlbum(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlbum();
  }, [id]);

  if (isLoading)
    return (
      <div style={{ color: "white", padding: "20px" }}>
        Завантаження альбому...
      </div>
    );
  if (!album)
    return (
      <div style={{ color: "white", padding: "20px" }}>
        Помилка: Альбом не знайдено
      </div>
    );

  const displayedReviews =
    activeFilter === "All notes"
      ? album.reviews
      : album.reviews.filter(
          (review) => review.tags && review.tags.includes(activeFilter),
        );

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
            backgroundColor: "#2a2a30",
            backgroundImage: `url(${album.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <h1 className={`${styles.title} serif`}>{album.title}</h1>
        <div className={styles.artist}>{album.artist}</div>
        <div className={styles.stats}>
          ⭐ 4.8 · {album.year} · {album.type}
        </div>
        <p className={styles.description}>
          A masterpiece of {album.artist}'s discography.
        </p>

        <button
          className={styles.btn}
          onClick={() => navigate(`/editor/${album.id}`)}
        >
          ✎ Write Review
        </button>
      </aside>

      <main className={styles.main}>
        <div className={styles.mainSuptitle}>COMMUNITY LINER NOTES</div>
        <h2 className={`${styles.mainTitle} serif`}>{album.title}</h2>

        <div className={styles.tags}>
          {filterTabs.map((tab) => (
            <span
              key={tab}
              className={`${styles.tag} ${activeFilter === tab ? styles.tagActive : ""}`}
              onClick={() => setActiveFilter(tab)}
              style={{ cursor: "pointer" }}
            >
              {tab}
            </span>
          ))}
        </div>

        {displayedReviews && displayedReviews.length > 0 ? (
          displayedReviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))
        ) : (
          <p style={{ color: "gray", marginTop: "20px" }}>
            No reviews found for this category.
          </p>
        )}
      </main>
    </div>
  );
};
