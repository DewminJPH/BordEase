import React, { useEffect, useState } from "react";
import "./Dashboard.css";

const API_BASE = (process.env.REACT_APP_API_BASE_URL || "http://localhost:3001").replace(/\/+$/, "");
const API_URL = `${API_BASE}/api/ads`;

const MAX_FILES = 5;
const MAX_SIZE_MB = 5;

const initialForm = {
  houseName: "",
  location: "",
  price: "",
  contact: "",
  bedrooms: "",
  bathrooms: "",
  rooms: "",
  persons: "",
  distance: "",
  notes: "",
};

const numberOptions = Array.from({ length: 11 }, (_, i) => i);
const distanceOptions = ["< 500 m", "500 m - 1 km", "1 - 2 km", "2 - 5 km", "> 5 km"];

const pad2 = (n) => String(n ?? 0).padStart(2, "0");
const toCurrency = (v) => `Rs.${Number(v || 0).toLocaleString("en-LK")}/month`;
const mapLink = (loc) => {
  const s = String(loc || "").trim();
  return /^https?:\/\//i.test(s)
    ? s
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s)}`;
};
const timeAgo = (iso) => {
  if (!iso) return "";
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return "just now";
  const m = Math.floor(diff / 60);
  if (m < 60) return `${m} min ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} hour${h > 1 ? "s" : ""} ago`;
  const d = Math.floor(h / 24);
  return `${d} day${d > 1 ? "s" : ""} ago`;
};

function RatingStars({ value = 3 }) {
  const full = Math.max(0, Math.min(5, Math.floor(Number(value) || 0)));
  return (
    <div className="ad-stars" aria-label={`${full} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`star ${i < full ? "star--full" : "star--empty"}`}>★</span>
      ))}
    </div>
  );
}

function AdCard({ ad, onEdit, onDelete }) {
  const img = (Array.isArray(ad.images) && ad.images[0]) || "https://via.placeholder.com/160x120?text=No+Image";
  return (
    <div className="ad-card">
      <div className="ad-card-left">
        <img src={img} alt={ad.houseName} />
      </div>

      <div className="ad-card-right">
        <div className="ad-card-top">
          <h3 className="ad-card-title">{ad.houseName}</h3>
          <div className="ad-card-rail">
            <RatingStars value={ad.rating ?? 3} />
            <a className="ad-reviews-link" href="#" onClick={(e) => e.preventDefault()}>reviews</a>
            <div className="ad-actions">
              <button type="button" className="btn btn--edit" onClick={() => onEdit(ad)}>Edit</button>
              <button type="button" className="btn btn--delete" onClick={() => onDelete(ad)}>Delete</button>
            </div>
          </div>
        </div>

        <div className="ad-meta-row">
          <span>Bedrooms:<b>{pad2(ad.bedrooms)}</b></span>
          <span>Bathrooms:<b>{pad2(ad.bathrooms)}</b></span>
          <span>Persons:<b>{pad2(ad.persons)}</b></span>
        </div>

        <div className="ad-info-row">
          <span className="label">Location:</span>
          <a href={mapLink(ad.location)} target="_blank" rel="noreferrer">{ad.location}</a>
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
      </div>
    </div>
  );
}

export default function Dashboard() {

  const [formData, setFormData] = useState(initialForm);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);


  const [ads, setAds] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  const [editOpen, setEditOpen] = useState(false);
  const [editAd, setEditAd] = useState(null);
  const [editForm, setEditForm] = useState(initialForm);
  const [editKeepImages, setEditKeepImages] = useState([]); 
  const [editFiles, setEditFiles] = useState([]);           
  const [editPreviews, setEditPreviews] = useState([]);     


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

  useEffect(() => () => previews.forEach((u) => URL.revokeObjectURL(u)), [previews]);
  useEffect(() => () => editPreviews.forEach((u) => URL.revokeObjectURL(u)), [editPreviews]);

  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  const addFiles = (fileList) => {
    const remaining = MAX_FILES - images.length;
    if (remaining <= 0) return setError(`You can upload up to ${MAX_FILES} photos.`);
    const selected = Array.from(fileList)
      .filter((f) => f.type.startsWith("image/") && f.size <= MAX_SIZE_MB * 1024 * 1024)
      .slice(0, remaining);
    const urls = selected.map((f) => URL.createObjectURL(f));
    setImages((p) => [...p, ...selected]);
    setPreviews((p) => [...p, ...urls]);
  };
  const onFileInput = (e) => { addFiles(e.target.files); e.target.value = ""; };
  const onDrop = (e) => { e.preventDefault(); addFiles(e.dataTransfer.files); };
  const removeImage = (i) => {
    URL.revokeObjectURL(previews[i]);
    setImages((p) => p.filter((_, idx) => idx !== i));
    setPreviews((p) => p.filter((_, idx) => idx !== i));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); setSuccess("");
    if (!formData.houseName.trim() || !formData.location.trim() || formData.price === "" || !formData.contact.trim()) {
      return setError("Please fill in house name, location, price and contact.");
    }
    try {
      setSubmitting(true);
      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
      images.forEach((f) => fd.append("images", f));
      const res = await fetch(API_URL, { method: "POST", body: fd });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.message || `Server error: ${res.status}`);
      }
      const newAd = await res.json();
      setAds((prev) => [newAd, ...prev]);
      setFormData(initialForm);
      previews.forEach((u) => URL.revokeObjectURL(u));
      setImages([]); setPreviews([]);
      setSuccess("Ad posted 🎉");
    } catch (err) {
      console.error(err); setError(err.message || "Failed to post ad.");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete
  const handleDelete = async (ad) => {
    if (!window.confirm("Delete this ad?")) return;
    try {
      const res = await fetch(`${API_URL}/${ad._id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      setAds((prev) => prev.filter((x) => x._id !== ad._id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete the ad.");
    }
  };

  // Edit modal open/close
  const openEdit = (ad) => {
    setEditAd(ad);
    setEditForm({
      houseName: ad.houseName || "",
      location: ad.location || "",
      price: ad.price != null ? String(ad.price) : "",
      contact: ad.contact || "",
      bedrooms: ad.bedrooms != null ? String(ad.bedrooms) : "",
      bathrooms: ad.bathrooms != null ? String(ad.bathrooms) : "",
      rooms: ad.rooms != null ? String(ad.rooms) : "",
      persons: ad.persons != null ? String(ad.persons) : "",
      distance: ad.distance || "",
      notes: ad.notes || "",
    });
    setEditKeepImages(ad.images || []);
    setEditFiles([]);
    setEditPreviews([]);
    setEditOpen(true);
  };
  const closeEdit = () => {
    editPreviews.forEach((u) => URL.revokeObjectURL(u));
    setEditOpen(false);
    setEditAd(null);
  };

  // Edit form handlers
  const handleEditChange = (e) => setEditForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const addEditFiles = (fileList) => {
    const remaining = MAX_FILES - (editKeepImages.length + editFiles.length);
    if (remaining <= 0) return setError(`You can upload up to ${MAX_FILES} photos.`);
    const selected = Array.from(fileList)
      .filter((f) => f.type.startsWith("image/") && f.size <= MAX_SIZE_MB * 1024 * 1024)
      .slice(0, remaining);
    const urls = selected.map((f) => URL.createObjectURL(f));
    setEditFiles((p) => [...p, ...selected]);
    setEditPreviews((p) => [...p, ...urls]);
  };
  const onEditFileInput = (e) => { addEditFiles(e.target.files); e.target.value = ""; };
  const removeExistingImg = (url) => setEditKeepImages((p) => p.filter((u) => u !== url));
  const removeNewImg = (i) => {
    URL.revokeObjectURL(editPreviews[i]);
    setEditFiles((p) => p.filter((_, idx) => idx !== i));
    setEditPreviews((p) => p.filter((_, idx) => idx !== i));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editAd) return;
    setError(null); setSuccess("");
    try {
      const fd = new FormData();
      Object.entries(editForm).forEach(([k, v]) => fd.append(k, v));
      fd.append("keepImages", JSON.stringify(editKeepImages));
      editFiles.forEach((f) => fd.append("images", f));

      const res = await fetch(`${API_URL}/${editAd._id}`, { method: "PUT", body: fd });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.message || `Server error: ${res.status}`);
      }
      const updated = await res.json();
      setAds((prev) => prev.map((x) => (x._id === updated._id ? updated : x)));
      closeEdit();
      setSuccess("Ad updated ✅");
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to update the ad.");
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="form-title">Post Your AD Here</h2>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <form className="ad-form" onSubmit={handleSubmit}>
        <h3 className="form-heading">Fill the details</h3>
        <div className="form-layout">
          <div className="uploader" onDragOver={(e) => e.preventDefault()} onDrop={onDrop}>
            <label className="uploader-drop">
              <div className="camera-emoji">📷</div>
              <div className="uploader-text">Drag & drop or click to upload</div>
              <div className="uploader-sub">max: 5 photos</div>
              <input type="file" accept="image/*" multiple onChange={onFileInput} hidden />
            </label>
            {previews.length > 0 && (
              <div className="thumbs">
                {previews.map((src, i) => (
                  <div key={i} className="thumb">
                    <img src={src} alt={`upload-${i}`} />
                    <button type="button" className="thumb-remove" onClick={() => removeImage(i)}>×</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="fields">
            <label>House name:</label>
            <input name="houseName" value={formData.houseName} onChange={handleChange} required disabled={submitting} />
            <label>Location:</label>
            <input name="location" value={formData.location} onChange={handleChange} required disabled={submitting} />
            <label>Price:</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required disabled={submitting} min="0" step="1" />
            <label>Contact no:</label>
            <input name="contact" value={formData.contact} onChange={handleChange} required disabled={submitting} />
          </div>
        </div>

        <div className="compact-grid">
          <label> No of bedrooms:
            <select name="bedrooms" value={formData.bedrooms} onChange={handleChange} disabled={submitting}>
              <option value="">—</option>
              {numberOptions.map((n) => <option key={`bed-${n}`} value={n}>{n}</option>)}
            </select>
          </label>
          <label> No of bathrooms:
            <select name="bathrooms" value={formData.bathrooms} onChange={handleChange} disabled={submitting}>
              <option value="">—</option>
              {numberOptions.map((n) => <option key={`bath-${n}`} value={n}>{n}</option>)}
            </select>
          </label>
          <label> No of rooms :
            <select name="rooms" value={formData.rooms} onChange={handleChange} disabled={submitting}>
              <option value="">—</option>
              {numberOptions.map((n) => <option key={`room-${n}`} value={n}>{n}</option>)}
            </select>
          </label>
          <label> Required persons:
            <select name="persons" value={formData.persons} onChange={handleChange} disabled={submitting}>
              <option value="">—</option>
              {numberOptions.map((n) => <option key={`persons-${n}`} value={n}>{n}</option>)}
            </select>
          </label>
          <label> Distance to Faculty:
            <select name="distance" value={formData.distance} onChange={handleChange} disabled={submitting}>
              <option value="">—</option>
              {distanceOptions.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </label>
        </div>

        <label className="addnotes">Additional notes:</label>
        <textarea name="notes" value={formData.notes} onChange={handleChange} rows={4} disabled={submitting} />
        <div className="submit-row">
          <button type="submit" disabled={submitting}>{submitting ? "Submitting..." : "Submit"}</button>
        </div>
      </form>

      {/* List */}
      <h2 className="ads-title">Your Posted ADs</h2>
      <div className="ads-list">
        {loadingList ? <p>Loading ads…</p> : ads.length === 0 ? <p className="no-ads">--There is no posted ADs--</p> : ads.map((ad) => (
          <AdCard key={ad._id} ad={ad} onEdit={openEdit} onDelete={handleDelete} />
        ))}
      </div>

      {editOpen && (
        <div className="modal open">
          <div className="modal-backdrop" onClick={closeEdit} />
          <div className="modal-card">
            <div className="modal-header">
              <h3>Edit Ad</h3>
              <button type="button" className="modal-close" onClick={closeEdit}>×</button>
            </div>

            <form onSubmit={handleUpdate}>
              <div className="form-layout">
                <div>
                  <div className="existing-images">
                    {(editKeepImages || []).map((url) => (
                      <div key={url} className="thumb">
                        <img src={url} alt="existing" />
                        <button type="button" className="thumb-remove" onClick={() => removeExistingImg(url)}>×</button>
                      </div>
                    ))}
                  </div>

                  <div className="uploader" onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); addEditFiles(e.dataTransfer.files); }}>
                    <label className="uploader-drop">
                      <div className="camera-emoji">📷</div>
                      <div className="uploader-text">Add more photos</div>
                      <div className="uploader-sub">up to {MAX_FILES - editKeepImages.length} more</div>
                      <input type="file" accept="image/*" multiple onChange={onEditFileInput} hidden />
                    </label>
                    {editPreviews.length > 0 && (
                      <div className="thumbs">
                        {editPreviews.map((src, i) => (
                          <div key={i} className="thumb">
                            <img src={src} alt={`new-${i}`} />
                            <button type="button" className="thumb-remove" onClick={() => removeNewImg(i)}>×</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Fields */}
                <div className="fields">
                  <label>House name:</label>
                  <input name="houseName" value={editForm.houseName} onChange={handleEditChange} required />

                  <label>Location:</label>
                  <input name="location" value={editForm.location} onChange={handleEditChange} required />

                  <label>Price:</label>
                  <input type="number" name="price" value={editForm.price} onChange={handleEditChange} required min="0" step="1" />

                  <label>Contact no:</label>
                  <input name="contact" value={editForm.contact} onChange={handleEditChange} required />
                </div>
              </div>

              <div className="compact-grid">
                <label> No of bedrooms:
                  <select name="bedrooms" value={editForm.bedrooms} onChange={handleEditChange}>
                    <option value="">—</option>
                    {numberOptions.map((n) => <option key={`e-bed-${n}`} value={n}>{n}</option>)}
                  </select>
                </label>
                <label> No of bathrooms:
                  <select name="bathrooms" value={editForm.bathrooms} onChange={handleEditChange}>
                    <option value="">—</option>
                    {numberOptions.map((n) => <option key={`e-bath-${n}`} value={n}>{n}</option>)}
                  </select>
                </label>
                <label> No of rooms:
                  <select name="rooms" value={editForm.rooms} onChange={handleEditChange}>
                    <option value="">—</option>
                    {numberOptions.map((n) => <option key={`e-room-${n}`} value={n}>{n}</option>)}
                  </select>
                </label>
                <label> Required persons:
                  <select name="persons" value={editForm.persons} onChange={handleEditChange}>
                    <option value="">—</option>
                    {numberOptions.map((n) => <option key={`e-person-${n}`} value={n}>{n}</option>)}
                  </select>
                </label>
                <label> Distance to Faculty:
                  <select name="distance" value={editForm.distance} onChange={handleEditChange}>
                    <option value="">—</option>
                    {distanceOptions.map((d) => <option key={`e-dist-${d}`} value={d}>{d}</option>)}
                  </select>
                </label>
              </div>

              <label>Additional notes:</label>
              <textarea name="notes" value={editForm.notes} onChange={handleEditChange} rows={6} />

              <div className="modal-actions">
                <button type="button" className="btn" onClick={closeEdit}>Cancel</button>
                <button type="submit" className="btn btn--save">Save changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}   