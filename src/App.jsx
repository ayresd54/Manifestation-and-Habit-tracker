import { useState, useEffect } from "react";
import "./global.css";
import theme from "./theme";

import TabBar from "./components/UI/TabBar";
import Card from "./components/UI/Card";
import Button from "./components/UI/Button";
import ProgressBar from "./components/UI/ProgressBar";
import Modal from "./components/UI/Modal";
import VisionGrid from "./components/Vision/VisionGrid";

export default function App() {
  const [activeTab, setActiveTab] = useState("Habits");

  // HABITS
  const [habits, setHabits] = useState([
    { name: "Meditate", done: false },
    { name: "Read 10 minutes", done: false },
    { name: "Drink 2L water", done: false },
  ]);

  const [habitStreak, setHabitStreak] = useState(
    Number(localStorage.getItem("habitStreak")) || 0
  );

  useEffect(() => {
    localStorage.setItem("habitStreak", habitStreak);
  }, [habitStreak]);

  const toggleHabit = (index) => {
    const updated = [...habits];
    updated[index].done = !updated[index].done;
    setHabits(updated);

    const allDone = updated.every((h) => h.done);
    if (allDone) setHabitStreak((s) => s + 1);
  };

  const resetHabits = () => {
    setHabits(habits.map((h) => ({ ...h, done: false })));
  };

  const habitProgress =
    (habits.filter((h) => h.done).length / habits.length) * 100;

  // DAILY TASKS
  const [daily, setDaily] = useState([
    { name: "Journal", done: false },
    { name: "Affirmations", done: false },
    { name: "10-minute walk", done: false },
  ]);

  const dailyProgress =
    (daily.filter((d) => d.done).length / daily.length) * 100;

  const toggleDaily = (index) => {
    const updated = [...daily];
    updated[index].done = !updated[index].done;
    setDaily(updated);
  };

  const resetDaily = () => {
    setDaily(daily.map((d) => ({ ...d, done: false })));
  };

  // WEEKLY TASKS
  const [weekly, setWeekly] = useState([
    { name: "Plan week", done: false },
    { name: "Clean workspace", done: false },
    { name: "Review goals", done: false },
  ]);

  const weeklyProgress =
    (weekly.filter((w) => w.done).length / weekly.length) * 100;

  const toggleWeekly = (index) => {
    const updated = [...weekly];
    updated[index].done = !updated[index].done;
    setWeekly(updated);
  };

  const resetWeekly = () => {
    setWeekly(weekly.map((w) => ({ ...w, done: false })));
  };

  // VISION BOARD
  const [visionTiles, setVisionTiles] = useState(
    JSON.parse(localStorage.getItem("visionTiles")) || []
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [newTile, setNewTile] = useState("");

  useEffect(() => {
    localStorage.setItem("visionTiles", JSON.stringify(visionTiles));
  }, [visionTiles]);

  const addTile = () => {
    if (!newTile.trim()) return;
    setVisionTiles([...visionTiles, newTile]);
    setNewTile("");
    setModalOpen(false);
  };

  const deleteTile = (index) => {
    const updated = [...visionTiles];
    updated.splice(index, 1);
    setVisionTiles(updated);
  };

  return (
    <div className="app-container">
      <TabBar active={activeTab} setActive={setActiveTab} />

      {/* HABITS TAB */}
      {activeTab === "Habits" && (
        <>
          <Card>
            <h2>Daily Habits</h2>
            <ProgressBar value={habitProgress} />
            <p className="streak">🔥 Streak: {habitStreak} days</p>

            {habits.map((habit, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 12,
                }}
              >
                <span>{habit.name}</span>
                <input
                  type="checkbox"
                  checked={habit.done}
                  onChange={() => toggleHabit(index)}
                />
              </div>
            ))}

            <Button onClick={resetHabits}>Reset Habits</Button>
          </Card>
        </>
      )}

      {/* DAILY TAB */}
      {activeTab === "Daily" && (
        <Card>
          <h2>Daily Checklist</h2>
          <ProgressBar value={dailyProgress} />

          {daily.map((task, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 12,
              }}
            >
              <span>{task.name}</span>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleDaily(index)}
              />
            </div>
          ))}

          <Button onClick={resetDaily}>Reset Daily</Button>
        </Card>
      )}

      {/* WEEKLY TAB */}
      {activeTab === "Weekly" && (
        <Card>
          <h2>Weekly Checklist</h2>
          <ProgressBar value={weeklyProgress} />

          {weekly.map((task, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 12,
              }}
            >
              <span>{task.name}</span>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleWeekly(index)}
              />
            </div>
          ))}

          <Button onClick={resetWeekly}>Reset Weekly</Button>
        </Card>
      )}

      {/* VISION BOARD TAB */}
      {activeTab === "Vision" && (
        <>
          <Card>
            <h2>Vision Board</h2>
            <Button onClick={() => setModalOpen(true)}>Add Tile</Button>
          </Card>

          <VisionGrid tiles={visionTiles} onDelete={deleteTile} />

          <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
            <h3>Add Vision Tile</h3>
            <input
              value={newTile}
              onChange={(e) => setNewTile(e.target.value)}
              placeholder="Enter text"
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 12,
                border: "1px solid #E6E2F5",
                marginTop: 12,
              }}
            />
            <Button onClick={addTile}>Add</Button>
          </Modal>
        </>
      )}
    </div>
  );
}
