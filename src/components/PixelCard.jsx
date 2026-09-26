const variants = {
  default: "bg-white border border-gray-200 shadow-sm shadow-teal-900/5",
  inset: "bg-gray-50 border border-gray-200 shadow-inner shadow-gray-200/50",
  elevated: "bg-white border border-gray-100 shadow-sm shadow-teal-900/5",
};

export default function PixelCard({
  children,
  className = "",
  variant = "default",
  pixel = false,
  hover = false,
  ...rest
}) {
  return (
    <div
      {...rest}
      className={`relative rounded-2xl transition-all duration-300 flex flex-col skeuo-card-pad ${variants[variant]} ${
        hover
          ? "hover:shadow-md hover:shadow-teal-900/10 hover:-translate-y-0.5 hover:border-teal-200"
          : ""
      } ${className}`}
    >
      {pixel && (
        <>
          <div className="absolute top-0 right-0 w-3 h-3 bg-teal-400 rounded-bl-sm" />
          <div className="absolute top-0 right-3.5 w-2 h-2 bg-amber-400 rounded-bl-sm" />
          <div className="absolute top-3.5 right-0 w-2 h-2 bg-teal-300 rounded-bl-sm" />
        </>
      )}
      {children}
    </div>
  );
}
