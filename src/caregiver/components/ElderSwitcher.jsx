import { useCare } from "../../context/CareContext";

export default function ElderSwitcher() {
  const { authorizedElders, selectedElderId, selectElder } = useCare();

  if (!authorizedElders.length) return null;

  return (
    <label className="flex items-center gap-2 min-w-0">
      <span className="text-[13px] font-bold text-(--cg-text-muted) sr-only xl:not-sr-only">
        Elders
      </span>
      <select
        className="cg-select !w-auto"
        value={selectedElderId ?? ""}
        onChange={(event) => selectElder(event.target.value)}
        aria-label="Select elder"
      >
        {authorizedElders.map((elder) => (
          <option key={elder.elderId} value={elder.elderId}>
            {elder.profile?.name || "Elder"}
          </option>
        ))}
      </select>
    </label>
  );
}