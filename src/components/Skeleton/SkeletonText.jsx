import Skeleton from "./Skeleton.jsx";

const SIZES = {
  xs: "h-2",
  sm: "h-3",
  md: "h-4",
  lg: "h-5",
  xl: "h-7",
};

const widths = [
  "100%",
  "92%",
  "96%",
  "85%",
  "64%",
  "72%",
  "88%",
  "45%",
  "58%",
  "78%",
];

function widthAt(index) {
  return widths[index % widths.length];
}

function bodyLines(lines) {
  const result = [];
  for (let i = 0; i < lines; i += 1) {
    const isLast = i === lines - 1;
    result.push(
      <Skeleton
        key={i}
        height="0.75rem"
        width={isLast ? "60%" : "100%"}
        className="mt-2"
      />
    );
  }
  return result;
}

export default function SkeletonText({
  lines = 2,
  size = "md",
  className = "",
  skipShimmer = false,
}) {
  const results = [];
  const heightClass = SIZES[size] || SIZES.md;
  results.push(<Skeleton key="first" height={heightClass} width={widthAt(0)} skipShimmer={skipShimmer} />);
  for (let i = 1; i < lines; i += 1) {
    results.push(
      <Skeleton key={i} height={heightClass} width={widthAt(i)} className="mt-2.5" skipShimmer={skipShimmer} />
    );
  }
  return <div className={className} aria-hidden="true">{results}</div>;
}

export function SkeletonParagraph({
  lines = 3,
  className = "",
}) {
  return (
    <div className={className} aria-hidden="true">
      {bodyLines(lines)}
    </div>
  );
}