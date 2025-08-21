import React, { useState } from "react";
import RatingStars from "./ratingstars.js";
import { pad2, toCurrency, mapLink, timeAgo } from "./format.js";
import "./AdCard.css";

export default function AdCard({ ad, onEdit, onDelete }) {
  const [isHovered, setIsHovered] = useState(false);
  const img = (Array.isArray(ad.images) && ad.images[0]) || "https://via.placeholder.com/160x120?text=No+Image";

  return (
    <div
      className="ad-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="ad-card-left">
        <img src={img} alt={ad.houseName} />
      </div>

      <div className="ad-card-right">
        <div className="ad-card-top">
          <h3 className="ad-card-title">{ad.houseName}</h3>
          <div className="ad-card-rail">
            <RatingStars value={ad.rating ?? 3} />
            <a className="ad-reviews-link" href="#" onClick={(e) => e.preventDefault()}>
              reviews
            </a>
          </div>
        </div>

        <div className="ad-meta-row">
          <span>Bedrooms:<b>{pad2(ad.bedrooms)}</b></span>
          <span>Bathrooms:<b>{pad2(ad.bathrooms)}</b></span>
          <span>Persons:<b>{pad2(ad.persons)}</b></span>
        </div>

        <div className="ad-info-row">
          <span className="label">Location:</span>
          <a href={mapLink(ad.location)} target="_blank" rel="noreferrer">
            {ad.location}
          </a>
        </div>

        <div className="ad-info-row">
          <span className="label">Contact no:</span>
          <span>{ad.contact}</span>
        </div>

        {ad.notes && (
          <div className="ad-info-row">
            <span className="label">Additional notes:</span>
            <span>{ad.notes}</span>
          </div>
        )}

        <div className="ad-price-row">
          <span className="ad-price">{toCurrency(ad.price)}</span>
          <span className="ad-timeago">{ad.createdAt ? timeAgo(ad.createdAt) : ""}</span>
        </div>

        {isHovered && (
          <div className="ad-actions-hover">
            <button type="button" className="btn btn--edit" onClick={() => onEdit(ad)}>
              Edit
            </button>
            <button type="button" className="btn btn--delete" onClick={() => onDelete(ad)}>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}