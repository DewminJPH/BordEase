import React, { useEffect, useRef, useState } from "react";
import {
  API_URL,
  MAX_FILES,
  MAX_SIZE_MB,
  initialForm,
  numberOptions,
  distanceOptions,
} from "./constants.js";
import "./AdForm.css";

export default function AdForm({ editingAd, onSaved, onCancel, onError = () => {} }) {
  const [formData, setFormData] = useState(initialForm);
  const [images, setImages] = useState([]);       
  const [previews, setPreviews] = useState([]);   
  const [existingImages, setExistingImages] = useState([]); 
  const [submitting, setSubmitting] = useState(false);
  const nameInputRef = useRef(null);


  useEffect(() => () => previews.forEach((u) => URL.revokeObjectURL(u)), [previews]);

  useEffect(() => {
    if (editingAd) {
      setFormData({
        houseName: editingAd.houseName || "",
        location: editingAd.location || "",
        price: editingAd.price != null ? String(editingAd.price) : "",
        contact: editingAd.contact || "",
        bedrooms: editingAd.bedrooms != null ? String(editingAd.bedrooms) : "",
        bathrooms: editingAd.bathrooms != null ? String(editingAd.bathrooms) : "",
        rooms: editingAd.rooms != null ? String(editingAd.rooms) : "",
        persons: editingAd.persons != null ? String(editingAd.persons) : "",
        distance: editingAd.distance || "",
        notes: editingAd.notes || "",
      });
      setExistingImages(editingAd.images || []);
      setImages([]);
      setPreviews([]);
      setTimeout(() => nameInputRef.current?.focus(), 150);
    } else {
      resetLocal();
    }
  }, [editingAd]);

  const resetLocal = () => {
    previews.forEach((u) => URL.revokeObjectURL(u));
    setFormData(initialForm);
    setImages([]);
    setPreviews([]);
    setExistingImages([]);
  };

  const handleChange = (e) => {
    onError(null);
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const addFiles = (fileList) => {
    const remaining = MAX_FILES - (existingImages.length + images.length);
    if (remaining <= 0) {
      return onError(`You can upload up to ${MAX_FILES} photos.`);
    }
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

  const removeExistingImg = (url) => {
    setExistingImages((p) => p.filter((u) => u !== url));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onError(null);

    if (!formData.houseName.trim() || !formData.location.trim() || formData.price === "" || !formData.contact.trim()) {
      return onError("Please fill in house name, location, price and contact.");
    }

    try {
      setSubmitting(true);
      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
      images.forEach((f) => fd.append("images", f));

      const isEdit = Boolean(editingAd);
      const url = isEdit ? `${API_URL}/${editingAd._id}` : API_URL;
      const method = isEdit ? "PUT" : "POST";
      if (isEdit) fd.append("keepImages", JSON.stringify(existingImages));

      const res = await fetch(url, { method, body: fd });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.message || `Server error: ${res.status}`);
      }

      const saved = await res.json();
      alert(isEdit ? "Ad updated ✅" : "Ad posted 🎉");

      onSaved(saved, isEdit);

      resetLocal();
    } catch (err) {
      console.error(err);
      onError(err.message || "Failed to submit.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="ad-form" onSubmit={handleSubmit}>
      <h3 className="form-heading">{editingAd ? "Update the details" : "Fill the details"}</h3>

      <div className="form-layout">
        <div>
          {editingAd && existingImages.length > 0 && (
            <div className="existing-images">
              {existingImages.map((url) => (
                <div key={url} className="thumb">
                  <img src={url} alt="existing" />
                  <button
                    type="button"
                    className="thumb-remove"
                    onClick={() => removeExistingImg(url)}
                    aria-label="Remove image"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="uploader" onDragOver={(e) => e.preventDefault()} onDrop={onDrop}>
            <label className="uploader-drop">
              <div className="camera-emoji">📷</div>
              <div className="uploader-text">
                {editingAd ? "Drag & drop or click to add more photos" : "Drag & drop or click to upload"}
              </div>
              <div className="uploader-sub">
                {editingAd
                  ? `up to ${Math.max(0, MAX_FILES - existingImages.length)} photos total`
                  : `max: ${MAX_FILES} photos`}
              </div>
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
        </div>

        <div className="fields">
          <label>House name:</label>
          <input
            ref={nameInputRef}
            name="houseName"
            value={formData.houseName}
            onChange={handleChange}
            required
            disabled={submitting}
          />

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
        {editingAd && (
          <button type="button" className="btn" onClick={onCancel} disabled={submitting}>
            Cancel
          </button>
        )}
        <button type="submit" disabled={submitting}>
          {submitting ? (editingAd ? "Saving..." : "Submitting...") : (editingAd ? "Save changes" : "Submit")}
        </button>
      </div>
    </form>
  );
}