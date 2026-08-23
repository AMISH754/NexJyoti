import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/gallery.css";

// Curated starter events to ensure immediate visual excellence
const INITIAL_EVENTS = [
  {
    _docId: "sample-1",
    eventName: "National Youth Day Skill Conclave 2025",
    category: "Youth Skilling",
    date: "2025-01-12",
    description: "Empowering 300+ youth with digital readiness, resume drafting, and leadership workshops.",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1000&auto=format&fit=crop&q=80",
  },
  {
    _docId: "sample-2",
    eventName: "Free Health & Eye Checkup Camp",
    category: "Health & Wellness",
    date: "2024-11-20",
    description: "Conducted complete medical and vision screenings for over 450 school children and families in rural Ranchi.",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1000&auto=format&fit=crop&q=80",
  },
  {
    _docId: "sample-3",
    eventName: "Project Shiksha: School Kit Distribution",
    category: "Education & Learning",
    date: "2024-09-05",
    description: "Distributed stationery kits, textbooks, and backpacks to 500+ primary school students on Teachers' Day.",
    imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1000&auto=format&fit=crop&q=80",
  },
  {
    _docId: "sample-4",
    eventName: "Digital Literacy & Coding Bootcamp",
    category: "Education & Learning",
    date: "2024-08-15",
    description: "Hands-on computer basics and STEM introduction sessions for young enthusiastic minds.",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1000&auto=format&fit=crop&q=80",
  },
  {
    _docId: "sample-5",
    eventName: "Community Cleanliness & Tree Plantation Drive",
    category: "Community Outreach",
    date: "2024-06-05",
    description: "Over 80 volunteers joined hands on World Environment Day to plant 300 saplings across local communities.",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1000&auto=format&fit=crop&q=80",
  },
  {
    _docId: "sample-6",
    eventName: "Diwali of Smiles & Cultural Celebration",
    category: "Celebrations & Festivals",
    date: "2024-10-31",
    description: "Festive celebration bringing joy, cultural dance performances, and sweet distribution for orphan children.",
    imageUrl: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=1000&auto=format&fit=crop&q=80",
  },
];

const CATEGORIES = [
  "All Events",
  "Education & Learning",
  "Health & Wellness",
  "Youth Skilling",
  "Community Outreach",
  "Celebrations & Festivals",
];

export default function Gallery() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All Events");
  const [activeLightbox, setActiveLightbox] = useState(null);

  useEffect(() => {
    fetchGalleryEvents();
  }, []);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveLightbox(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const fetchGalleryEvents = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "gallery"));
      const data = querySnapshot.docs.map((docSnap) => ({
        _docId: docSnap.id,
        ...docSnap.data(),
      }));

      if (data.length > 0) {
        data.sort((a, b) => new Date(b.date || b.createdAt || 0) - new Date(a.date || a.createdAt || 0));
        setEvents(data);
      } else {
        // Use default starter sample events if no photos uploaded yet
        setEvents(INITIAL_EVENTS);
      }
    } catch (err) {
      console.warn("Could not fetch gallery from Firestore, falling back to starter events:", err);
      setEvents(INITIAL_EVENTS);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const filteredEvents = activeCategory === "All Events"
    ? events
    : events.filter((e) => e.category === activeCategory);

  return (
    <div className="gallery-page">
      {/* Hero Banner */}
      <section className="gallery-hero">
        <div className="container">
          <div className="gallery-hero-badge">
            Moments of Impact
          </div>
          <h1>Events &amp; Photo Gallery</h1>
          <p>
            Explore the meaningful milestones, community outreach drives, educational workshops,
            and joyful smiles created by NexJyoti Education Foundation.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="container">
        <div className="gallery-filter-wrap">
          <div className="gallery-filter-bar" role="tablist" aria-label="Event Categories">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                className={`gallery-filter-btn ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="gallery-empty">
            <div className="admin-spinner" style={{ margin: "0 auto 1rem", width: "40px", height: "40px" }}></div>
            <h3>Loading Event Photos...</h3>
            <p>Fetching memories from our community initiatives.</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="gallery-empty">
            <div className="gallery-empty-icon" style={{ color: "var(--text-muted)" }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <h3>No Photos Found in this Category</h3>
            <p>Check back soon or select "All Events" to view other event highlights.</p>
            <button
              onClick={() => setActiveCategory("All Events")}
              className="btn btn-primary btn-sm"
              style={{ marginTop: "1rem" }}
            >
              View All Events
            </button>
          </div>
        ) : (
          <div className="gallery-grid">
            {filteredEvents.map((item) => (
              <div
                key={item._docId}
                className="gallery-card"
                onClick={() => setActiveLightbox(item)}
                role="button"
                tabIndex={0}
                aria-label={`View photo of ${item.eventName}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setActiveLightbox(item);
                  }
                }}
              >
                <div className="gallery-card-img-wrap">
                  <img
                    src={item.imageUrl}
                    alt={item.eventName}
                    className="gallery-card-img"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80";
                    }}
                  />
                  <div className="gallery-card-overlay" />
                  <span className="gallery-card-badge">
                    {item.category || "Event"}
                  </span>
                  <div className="gallery-card-zoom-icon" title="Click to view full photo">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      <line x1="11" y1="8" x2="11" y2="14" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                  </div>
                  <div className="gallery-card-info">
                    {item.date && (
                      <div className="gallery-card-date">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "3px" }}>
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        {formatDate(item.date)}
                      </div>
                    )}
                    <h3 className="gallery-card-title">{item.eventName}</h3>
                    {item.description && (
                      <p className="gallery-card-desc">{item.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div
          className="gallery-lightbox-overlay"
          onClick={() => setActiveLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={activeLightbox.eventName}
        >
          <div
            className="gallery-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="gallery-lightbox-close"
              onClick={() => setActiveLightbox(null)}
              aria-label="Close photo preview"
            >
              ✕
            </button>

            <div className="gallery-lightbox-img-wrap">
              <img
                src={activeLightbox.imageUrl}
                alt={activeLightbox.eventName}
                className="gallery-lightbox-img"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80";
                }}
              />
            </div>

            <div className="gallery-lightbox-details">
              <div className="gallery-lightbox-meta">
                <span className="gallery-lightbox-cat">
                  {activeLightbox.category || "Event"}
                </span>
                {activeLightbox.date && (
                  <span className="gallery-lightbox-date">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle", marginRight: "4px" }}>
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    {formatDate(activeLightbox.date)}
                  </span>
                )}
              </div>
              <h2 className="gallery-lightbox-title">{activeLightbox.eventName}</h2>
              {activeLightbox.description && (
                <p className="gallery-lightbox-desc">{activeLightbox.description}</p>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
