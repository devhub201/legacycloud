import { ReactNode } from "react";
import { ICON_NAMES, TONES } from "@/lib/icons";

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

const base = "w-full bg-secondary rounded-xl px-3.5 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary";

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={base} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${base} min-h-[90px]`} />;
}

export function Select({ options, ...props }: { options: string[] } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={base}>
      {options.map((o) => (
        <option key={o} value={o}>{o || "default"}</option>
      ))}
    </select>
  );
}

export function IconSelect(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <Select options={ICON_NAMES} {...props} />;
}

export function ToneSelect(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <Select options={TONES} {...props} />;
}

export function Toggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <div className="flex items-center justify-between text-sm gap-3">
      <span>{label}</span>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`w-12 h-6 rounded-full transition relative shrink-0 ${value ? "grad-btn" : "bg-secondary"}`}
        aria-label={label}
      >
        <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-foreground transition-all ${value ? "left-6" : "left-0.5"}`} />
      </button>
    </div>
  );
}
