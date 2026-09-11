import claraImg from "../assets/Clara.png";

const SIZE_CLASSES = {
  xs: "w-8 h-8",
  sm: "w-10 h-10",
  md: "w-12 h-12",
  lg: "w-14 h-14",
  xl: "w-16 h-16",
};

export default function ClaraAvatar({ size = "md", className = "" }) {
  const hasExplicitSize = /\bw-(full|\d+)\b/.test(className) && /\bh-(full|\d+)\b/.test(className);
  const sizeClass = hasExplicitSize ? "" : SIZE_CLASSES[size] || SIZE_CLASSES.md;

  return (
    <div
      className={`rounded-full overflow-hidden aspect-square border-2 border-teal-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] ${sizeClass} ${className}`}
    >
      <img
        src={claraImg}
        alt="Clara"
        className="w-full h-full object-cover"
        draggable={false}
      />
    </div>
  );
}