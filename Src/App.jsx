import React, { useState, useEffect } from "react";

// -----------------------------
// LIGHT MODE THEME (PASTEL LAVENDER + GOLD)
// -----------------------------
const COLORS = {
  bg: "#f7f5ff",
  text: "#1f2933",
  card: "#ffffff",
  border: "#e5e7eb",
  lavender: "#a78bfa",
  gold: "#fbbf24",
  mint: "#34d399",
};

// Category color mapping
const CAT = {
  mind: {
    bg: "rgba(167, 139, 250, 0.12)",
    border: "rgba(167, 139, 250, 0.6)",
    dot: "#8b5cf6",
  },
  action: {
    bg: "rgba(251, 191, 36, 0.12)",
    border: "rgba(251, 191, 36, 0.6)",
    dot: "#f59e0b",
  },
  energy: {
    bg: "rgba(52, 211, 153, 0.12)",
    border: "rgba(52, 211, 153, 0.6)",
    dot: "#10b981",
  },
};

// -----------------------------
// DATE HELPERS
// -----------------------------
const getTodayKey = () => {
  const d = new Date();
  return d.toISOString().split("T")[0]; // YYYY-MM-DD
};

const getWeekKey = () => {
  const d = new Date();
  const year = d.getFullYear();
  const oneJan = new Date(year, 0, 1);
  const numberOfDays = Math.floor((d - oneJan) / (24 * 60 * 60 * 1000));
  const week = Math.ceil((d.getDay() + 1 + numberOfDays) / 7);
  return `${year}-W${week}`;
};

// -----------------------------
// HABITS TAB ITEMS
// -----------------------------
const HABIT_ITEMS = [
  {
    id: "meditate",
    category: "energy",
    icon: "🧘",
    title: "Meditation",
    desc: "Sit in stillness for at least 5 minutes.",
  },
  {
    id: "stretch",
    category: "energy",
    icon: "🤸",
    title: "Stretch & Mobility",
    desc: "Open your hips, spine, and shoulders.",
  },
  {
    id: "move",
    category: "energy",
    icon: "🏃",
    title: "Movement / Exercise",
    desc: "Intentional movement session.",
  },
  {
    id: "hydrate",
    category: "energy",
    icon: "💧",
    title: "Hydration",
    desc: "Drink enough water to feel clear.",
  },
  {
    id: "sleep",
    category: "energy",
    icon: "😴",
    title: "Sleep Target",
    desc: "Aim for 7–9 hours tonight.",
  },
];

// -----------------------------
// DAILY ITEMS
// -----------------------------
const DAILY_ITEMS = [
  {
    id: "intention",
    category: "mind",
    icon: "✨",
    title: "Morning Intention",
    desc: "Set your focus for the day.",
  },
  {
    id: "gratitude",
    category: "mind",
    icon: "🙏",
    title: "Gratitude",
    desc: "Write 3 things you're grateful for.",
  },
  {
    id: "visualize",
    category: "mind",
    icon: "🌅",
    title: "Visualization",
    desc: "See your future self clearly.",
  },
  {
    id: "noclaim",
    category: "action",
    icon: "🚫",
    title: "No‑Complaint Window",
    desc: "Stay in alignment for 2 hours.",
  },
  {
    id: "evening",
    category: "mind",
    icon: "📝",
    title: "Evening Review",
    desc: "Reflect on your alignment.",
  },
];

// -----------------------------
// WEEKLY ITEMS
// -----------------------------
const WEEKLY_ITEMS = [
  {
    id: "vision",
    category: "mind",
    icon: "🌟",
    title: "Weekly Vision",
    desc: "Clarify your direction.",
  },
  {
    id: "board",
    category: "mind",
    icon: "🖼️",
    title: "Vision Board Update",
    desc: "Refresh your imagery.",
  },
  {
    id: "connect",
    category: "action",
    icon: "🤝",
    title: "High‑Value Connection",
    desc: "Reach out to someone meaningful.",
  },
  {
    id: "growth",
    category: "mind",
    icon: "📚",
    title: "Growth Input",
    desc: "Learn something that expands you.",
  },
  {
    id: "abundance",
    category: "action",
    icon: "💸",
    title: "Abundance Action",
    desc: "Do one thing that moves money.",
  },
  {
    id: "clutter",
    category: "action",
    icon: "🧹",
    title: "Clear Clutter",
    desc: "Remove something stagnant.",
  },
  {
    id: "belief",
    category: "mind",
    icon: "💭",
    title: "Belief Audit",
    desc: "Rewrite one limiting belief.",
  },
];

// -----------------------------
// STREAK LOGIC (DAILY + HABITS)
// -----------------------------
const getStreak = (key) => {
  return parseInt(localStorage.getItem(key) || "0", 10);
};

const setStreak = (key, value) => {
  localStorage.setItem(key, value.toString());
};

// -----------------------------
// MAIN APP COMPONENT
// -----------------------------
export default function App() {
  const [tab, setTab] = useState("habits"); // C: Habits → Daily → Weekly → Vision
  const todayKey = getTodayKey();
  const weekKey = getWeekKey();

  // Track streaks
  const [dailyStreak, setDailyStreakState] = useState(getStreak("dailyStreak"));
  const [habitStreak, setHabitStreakState] = useState(getStreak("habitStreak"));

  // Check if an item is completed
  const isChecked = (id) => {
    const key =
      tab === "weekly"
        ? `${weekKey}_weekly_${id}`
        : tab === "habits"
        ? `${todayKey}_habits_${id}`
        : `${todayKey}_daily_${id}`;
    return localStorage.getItem(key) === "1";
  };

  // Toggle completion
  const toggle = (id) => {
    const key =
      tab === "weekly"
        ? `${weekKey}_weekly_${id}`
        : tab === "habits"
        ? `${todayKey}_habits_${id}`
        : `${todayKey}_daily_${id}`;

    const newVal = isChecked(id) ? "0" : "1";
    localStorage.setItem(key, newVal);
    forceUpdate();
  };

  // Force re-render
  const [, update] = useState(0);
  const forceUpdate = () => update((x) => x + 1);

  // Determine items for current tab
  let items = [];
  if (tab === "habits") items = HABIT_ITEMS;
  else if (tab === "daily") items = DAILY_ITEMS;
  else if (tab === "weekly") items = WEEKLY_ITEMS;

  const completedCount = items.filter((h) => isChecked(h.id)).length;
  const pct = items.length
    ? Math.round((completedCount / items.length) * 100)
    : 0;

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", paddingBottom: 80 }}>
      {/* Tab Bar */}
      <div style={{ display: "flex", gap: 8, padding: 16 }}>
        {[
          ["habits", "Habits"],
          ["daily", "Daily"],
          ["weekly", "Weekly"],
          ["vision", "Vision"],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              flex: 1,
              padding: "10px 0",
              borderRadius: 12,
              border: tab === key ? "none" : `1px solid ${COLORS.border}`,
              background: tab === key ? COLORS.lavender : COLORS.card,
              color: tab === key ? "#fff" : COLORS.text,
              fontFamily: "Georgia, serif",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            {label}
          </button>
        ))}
            {/* MAIN CONTENT WRAPPER */}
      <div style={{ padding: "0 16px 32px" }}>
        {/* HEADER */}
        <div
          style={{
            background: "linear-gradient(135deg, #fef3c7, #e9d5ff)",
            borderRadius: 24,
            padding: 16,
            marginBottom: 16,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Soft orbs */}
          <div
            style={{
              position: "absolute",
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "rgba(167, 139, 250, 0.35)",
              top: -40,
              right: -30,
              filter: "blur(4px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 90,
              height: 90,
              borderRadius: "50%",
              background: "rgba(251, 191, 36, 0.35)",
              bottom: -30,
              left: -20,
              filter: "blur(4px)",
            }}
          />

          <div style={{ position: "relative" }}>
            <div
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 18,
                color: COLORS.text,
                marginBottom: 4,
              }}
            >
              Manifest Your
            </div>
            <div
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 22,
                fontWeight: "bold",
                color: COLORS.text,
                marginBottom: 12,
              }}
            >
              Embodied Reality
            </div>

            {/* Quote */}
            <div
              style={{
                fontSize: 12,
                color: "#4b5563",
                backgroundColor: "rgba(255,255,255,0.7)",
                borderRadius: 12,
                padding: 8,
                marginBottom: 10,
              }}
            >
              “Your habits, thoughts, and actions are all casting votes for the
              future you.”
            </div>

            {/* Date + streaks */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: 11,
                color: "#374151",
              }}
            >
              <div>{todayKey}</div>
              <div style={{ display: "flex", gap: 8 }}>
                <div
                  style={{
                    padding: "4px 8px",
                    borderRadius: 999,
                    backgroundColor: "rgba(255,255,255,0.8)",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <span>🔥</span>
                  <span>Daily: {dailyStreak}</span>
                </div>
                <div
                  style={{
                    padding: "4px 8px",
                    borderRadius: 999,
                    backgroundColor: "rgba(255,255,255,0.8)",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <span>💪</span>
                  <span>Habits: {habitStreak}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PROGRESS BAR (for Habits / Daily / Weekly) */}
        {tab !== "vision" && (
          <div
            style={{
              backgroundColor: COLORS.card,
              borderRadius: 16,
              padding: 12,
              marginBottom: 16,
              border: `1px solid ${COLORS.border}`,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 6,
                fontSize: 12,
                color: COLORS.text,
              }}
            >
              <span>
                {tab === "habits"
                  ? "Embodiment Progress"
                  : tab === "daily"
                  ? "Daily Alignment"
                  : "Weekly Alignment"}
              </span>
              <span>
                {completedCount}/{items.length} • {pct}%
              </span>
            </div>
            <div
              style={{
                width: "100%",
                height: 8,
                borderRadius: 999,
                backgroundColor: "#e5e7eb",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${pct}%`,
                  height: "100%",
                  borderRadius: 999,
                  background:
                    "linear-gradient(90deg, #a78bfa, #fbbf24, #34d399)",
                  transition: "width 0.25s ease-out",
                }}
              />
            </div>
          </div>
        )}

        {/* CHECKLIST SECTION (Habits / Daily / Weekly) */}
        {(tab === "habits" || tab === "daily" || tab === "weekly") && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {items.map((item) => {
              const cat = CAT[item.category] || CAT.mind;
              const checked = isChecked(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    toggle(item.id);

                    // Handle streaks when all items completed
                    const afterCompleted = items.filter((h) =>
                      h.id === item.id ? !checked : isChecked(h.id)
                    ).length;
                    const allDone = afterCompleted === items.length;

                    if (allDone) {
                      if (tab === "daily") {
                        const current = getStreak("dailyStreak");
                        const next = current + 1;
                        setStreak("dailyStreak", next);
                        setDailyStreakState(next);
                      } else if (tab === "habits") {
                        const current = getStreak("habitStreak");
                        const next = current + 1;
                        setStreak("habitStreak", next);
                        setHabitStreakState(next);
                      }
                    }
                  }}
                  style={{
                    textAlign: "left",
                    borderRadius: 16,
                    padding: 12,
                    border: `1px solid ${
                      checked ? cat.border : "rgba(229,231,235,1)"
                    }`,
                    backgroundColor: checked ? cat.bg : COLORS.card,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    cursor: "pointer",
                  }}
                >
                  {/* Checkbox */}
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      border: `2px solid ${checked ? cat.dot : "#d1d5db"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: checked ? cat.dot : "transparent",
                      color: checked ? "#fff" : "transparent",
                      fontSize: 14,
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </div>

                  {/* Icon */}
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 999,
                      backgroundColor: "rgba(255,255,255,0.9)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 16,
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>

                  {/* Text */}
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: COLORS.text,
                        textDecoration: checked ? "line-through" : "none",
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "#6b7280",
                        marginTop: 2,
                      }}
                    >
                      {item.desc}
                    </div>
                  </div>

                  {/* Category dot */}
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: cat.dot,
                      flexShrink: 0,
                    }}
                  />
                </button>
              );
            })}
          </div>
        )}

        {/* VISION TAB CONTENT STARTS IN PART 3 */}
      </div>
    </div>
  );
}
