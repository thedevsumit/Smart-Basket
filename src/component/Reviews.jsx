import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import styles from "./Reviews.module.css";
import { useSelector } from "react-redux";

const Reviews = ({ sidebar, setSidebar }) => {
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);

  const { username } = useSelector((store) => store.userName);

  const fetchReviews = async () => {
    const q = query(collection(db, "Reviews"), orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);
    const reviewsData = snapshot.docs.map((doc) => doc.data());
    setReviews(reviewsData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    await addDoc(collection(db, "Reviews"), {
      username,
      review: reviewText,
      timestamp: new Date(),
    });

    setReviewText("");
    fetchReviews();
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div
      className={styles.reviewContainer}
      onClick={() => {
        if (sidebar === 1) {
          setSidebar(0);
        }
      }}
    >
      <div className={styles.reviewBox}>
        <h2>User Reviews</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review here..."
            rows="3"
            required
          />
          <button type="submit">Submit</button>
        </form>

        <div className={styles.reviewList}>
          {reviews.length > 0 ? (
            reviews.map((rev, idx) => (
              <div key={idx} className={styles.reviewItem}>
                <strong>{rev.username}</strong>
                <p>{rev.review}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
