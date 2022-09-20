interface Props {
  label: string;
  value: string;
  colorValue?: string;
}

export function DuoInfo({ label, value, colorValue = '#FFF' }: Props) {
  return (
    <div className="flex flex-col mb-4">
      <label className="text-zinc-400">
        {label}
      </label>
      <span className="font-bold text-white " style={{ color: colorValue }} >
        {value}
      </span>
    </div>
  );
}