import React, { useEffect, useState } from "react";
import { API_URL } from "./constants.js";
import AdForm from "./AdForm.js";
import AdCard from "./AdCard.js";
import "../dashboard_components/common.css";

export default function Dashboard() {
  const [ads, setAds] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [error, setError] = useState(null);
  const [editingAd, setEditingAd] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        setLoadingList(true);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();
        setAds(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch ads. Make sure your backend is running.");
      } finally {
        setLoadingList(false);
      }
    };
    fetchAds();
  }, []);

  const openEdit = (ad) => {
    setEditingAd(ad);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (ad) => {
    if (!window.confirm("Delete this ad?")) return;
    try {
      const res = await fetch(`${API_URL}/${ad._id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      setAds((prev) => prev.filter((x) => x._id !== ad._id));
      // alert("Ad deleted 🗑️"); // optional
    } catch (err) {
      console.error(err);
      setError("Failed to delete the ad.");
    }
  };

  // Called by AdForm after successful create/update
  const handleSaved = (saved, isEdit) => {
    if (isEdit) {
      setAds((prev) => prev.map((x) => (x._id === saved._id ? saved : x)));
    } else {
      setAds((prev) => [saved, ...prev]);
    }
    setEditingAd(null);
  };

  const cancelEdit = () => {
    setEditingAd(null);
  };

  return (
    <div className="dashboard-container">
      <h2 className="form-title">{editingAd ? "Edit Your AD" : "Post Your AD Here"}</h2>

      {error && <p className="error-message">{error}</p>}

      <AdForm
        editingAd={editingAd}
        onSaved={handleSaved}
        onCancel={cancelEdit}
        onError={setError}
      />

      <h2 className="ads-title">Your Posted ADs</h2>
      <div className="ads-list">
        {loadingList ? (
          <p>Loading ads…</p>
        ) : ads.length === 0 ? (
          <p className="no-ads">--There is no posted ADs--</p>
        ) : (
          ads.map((ad) => (
            <AdCard key={ad._id} ad={ad} onEdit={openEdit} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  );
}