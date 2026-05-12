export default function TabBar({ active, setActive }) {
  const tabs = ["Habits", "Daily", "Weekly", "Vision"];

  return (
    <div className="tab-bar">
      {tabs.map((tab) => (
        <div
          key={tab}
          className={`tab ${active === tab ? "active" : ""}`}
          onClick={() => setActive(tab)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
}
