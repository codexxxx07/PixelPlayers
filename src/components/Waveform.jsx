export default function Waveform({ bars = 7, active = true, className = "" }) {
  return (
    <div className={`flex items-end gap-1.5 ${className}`} aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className={active ? "wave-bar" : ""}
          style={{
            width: "6px",
            height: `${11 + (i % 4) * 7}px`,
            background: "currentColor",
            borderRadius: "3px",
            animationDelay: `${i * 90}ms`,
            transformOrigin: "50% 100%",
          }}
        />
      ))}
    </div>
  );
}