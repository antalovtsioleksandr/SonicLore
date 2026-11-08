import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const usePublish = () => {
  const [isPublishing, setIsPublishing] = useState(false);
  const navigate = useNavigate();

  const publishArticle = async (articleData) => {
    setIsPublishing(true);
    try {
      const response = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(articleData),
      });

      if (!response.ok) throw new Error("Помилка збереження");

      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/catalog");
    } catch (error) {
      console.error("Помилка:", error);
      navigate("/catalog");
    } finally {
      setIsPublishing(false);
    }
  };

  return { publishArticle, isPublishing };
};
