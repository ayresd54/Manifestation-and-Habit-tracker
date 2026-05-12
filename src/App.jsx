import React, { useState, useEffect } from "react";
import COLORS from "./theme";

export default function App() {
  const [activeTab, setActiveTab] = useState("habits");

  // Vision Board State
  const [visionTiles, setVisionTiles] = useState([]);
  const [newVisionText, setNewVisionText] = useState("");

  // Load saved tiles
  useEffect(() => {
    const saved = localStorage.getItem("visionTiles");
    if (saved) setVisionTiles(JSON.parse(saved));
  }, []);

  // Save tiles
  useEffect(() => {
    localStorage.setItem("visionTiles", JSON.stringify(visionTiles));
  }, [visionTiles]);

  // Add tile
  const addVisionTile = () => {
    if (!newVisionText.trim()) return;

    const tile = {
      id: Date.now(),
      text: newVisionText.trim(),
      color: COLORS.visionColors[
        Math.floor(Math.random() * COLORS.visionColors.length)
      ],
    };

    setVisionTiles([...visionTiles, tile]);
    setNewVisionText("");
  };

  // Delete tile
  const deleteTile = (id) => {
    setVisionTiles(visionTiles.filter((t) => t.id !== id));
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: COLORS.background,
        color: COLORS.text,
        padding: 20,
        boxSizing: "border-box",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          fontSize: 26,
          fontWeight: 700,
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Manifestation & Habit Tracker
      </div>

      {/* TABS */}
      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 20,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {[
          { id: "habits", label: "Habits" },
          { id: "tasks", label: "Tasks" },
          { id: "journal", label: "Journal" },
          { id: "affirm", label: "Affirmations" },
          { id: "lifestyle", label: "Lifestyle" },
          { id: "vision", label: "Vision Board" },
          { id: "profile", label: "Profile" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "10px 16px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              backgroundColor:
                activeTab === tab.id ? COLORS.primary : COLORS.card,
              color: activeTab === tab.id ? "#fff" : COLORS.text,
              fontWeight: 600,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* CONTENT CONTAINER */}
      <div
        style={{
          backgroundColor: COLORS.card,
          padding: 20,
          borderRadius: 12,
          minHeight: 300,
        }}
      >
        {/* HABITS */}
        {activeTab === "habits" && (
          <div>
            <h2>Daily Habits</h2>
            <p>Track your consistency and build momentum.</p>
          </div>
        )}

        {/* TASKS */}
        {activeTab === "tasks" && (
          <div>
            <h2>Tasks</h2>
            <p>Stay organized and focused on what matters.</p>
          </div>
        )}

        {/* JOURNAL */}
        {activeTab === "journal" && (
          <div>
            <h2>Journal</h2>
            <p>Reflect, write, and grow.</p>
          </div>
        )}

        {/* AFFIRMATIONS */}
        {activeTab === "affirm" && (
          <div>
            <h2>Affirmations</h2>
            <p>Rewire your mindset with positive statements.</p>
          </div>
        )}

        {/* LIFESTYLE */}
        {activeTab === "lifestyle" && (
          <div>
            <h2>Lifestyle</h2>
            <p>Track routines, wellness, and personal growth.</p>
          </div>
        )}

        {/* PROFILE */}
        {activeTab === "profile" && (
          <div>
            <h2>Your Profile</h2>
            <p>Customize your experience and settings.</p>
          </div>
        )}

        {/* ⭐ VISION BOARD ⭐ */}
        {activeTab === "vision" && (
          <div>
            <h2>Vision Board</h2>
            <p>Create and visualize your future.</p>

            {/* Add Tile Input */}
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <input
                value={newVisionText}
                onChange={(e) => setNewVisionText(e.target.value)}
                placeholder="Add a vision tile..."
                style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 8,
                  border: "1px solid #ccc",
                }}
              />
              <button
                onClick={addVisionTile}
                style={{
                  padding: "10px 16px",
                  borderRadius: 8,
                  border: "none",
                  backgroundColor: COLORS.primary,
                  color: "#fff",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Add
              </button>
            </div>

            {/* Tile Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                gap: 12,
                marginTop: 20,
              }}
            >
              {visionTiles.map((tile) => (
                <div
                  key={tile.id}
                  style={{
                    backgroundColor: tile.color,
                    padding: 14,
                    borderRadius: 10,
                    minHeight: 100,
                    position: "relative",
                    color: "#fff",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  {tile.text}

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteTile(tile.id)}
                    style={{
                      position: "absolute",
                      top: 6,
                      right: 6,
                      background: "rgba(0,0,0,0.3)",
                      border: "none",
                      borderRadius: "50%",
                      width: 22,
                      height: 22,
                      color: "#fff",
                      cursor: "pointer",
                      fontSize: 12,
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
