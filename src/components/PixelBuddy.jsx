const PALETTE = {
  B: "#134e4a",
  F: "#ffe9d6",
  E: "#402a18",
};

const PATTERNS = {
  idle: [
    ".BBBBBBBB.",
    "BBBBBBBBBB",
    "BFFFFFFFFB",
    "BFEEFFEEFB",
    "BFEEFFEEFB",
    "BFFFFFFFFB",
    "BFFFFFFFFB",
    "BFFFEEEEFB",
    "BBBBBBBBBB",
  ],
  listening: [
    ".BBBBBBBB.",
    "BBBBBBBBBB",
    "BFFFFFFFFB",
    "BFEEFFEEFB",
    "BFEEFFEEFB",
    "BFEEFFEEFB",
    "BFFFFFFFFB",
    "BFFFEEFFFB",
    "BBBBBBBBBB",
  ],
  thinking: [
    ".BBBBBBBB.",
    "BBBBBBBBBB",
    "BFEEFFEEFB",
    "BFEEFFEEFB",
    "BFFFFFFFFB",
    "BFFFFFFFFB",
    "BFFFFFFFFB",
    "BFFFEEFFFB",
    "BBBBBBBBBB",
  ],
};

export default function PixelBuddy({ state = "idle", className = "", animate = true }) {
  const rows = PATTERNS[state] || PATTERNS.idle;

  return (
    <div
      className={`grid grid-cols-10 ${animate ? "animate-buddy-float" : ""} ${className}`}
      role="img"
      aria-label="Memory Buddy pixel friend"
    >
      {rows.map((row, y) =>
        row.split("").map((cell, x) =>
          cell === "." ? (
            <span key={`${y}-${x}`} />
          ) : (
            <span
              key={`${y}-${x}`}
              className="rounded-[1px]"
              style={{
                background: PALETTE[cell],
                boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.16)",
              }}
            />
          )
        )
      )}
    </div>
  );
}