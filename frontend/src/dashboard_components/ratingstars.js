import React from "react";

export default function RatingStars({ value = 3 }) {
  const full = Math.max(0, Math.min(5, Math.floor(Number(value) || 0)));
  return (
    <div className="ad-stars" aria-label={`${full} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`star ${i < full ? "star--full" : "star--empty"}`}>★</span>
      ))}
    </div>
  );
}