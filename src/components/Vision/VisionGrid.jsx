export default function VisionGrid({ tiles, onDelete }) {
  return (
    <div className="vision-grid">
      {tiles.map((tile, index) => (
        <div key={index} className="vision-tile">
          {tile}
          <button
            style={{
              marginLeft: 8,
              background: "transparent",
              border: "none",
              color: "#FF6B6B",
              fontWeight: 700,
            }}
            onClick={() => onDelete(index)}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
