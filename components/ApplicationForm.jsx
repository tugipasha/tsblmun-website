"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/* ---------- field primitives ---------- */

export function Field({ label, required, children, hint }) {
  return (
    <label className="block mb-[1.2rem]">
      <span className="block font-sans text-[0.7rem] tracking-[0.14em] uppercase text-muted mb-[0.45rem]">
        {label}
        {required && <span className="text-gold ml-1">*</span>}
      </span>
      {children}
      {hint && (
        <span className="block mt-[0.35rem] font-sans text-[0.66rem] text-muted">{hint}</span>
      )}
    </label>
  );
}

const inputBase =
  "w-full rounded-[0.65rem] border border-[rgba(243,250,246,0.16)] bg-[rgba(243,250,246,0.04)] px-[0.85rem] py-[0.75rem] md:py-[0.7rem] text-[1rem] md:text-[0.88rem] text-paper placeholder:text-[rgba(243,250,246,0.32)] outline-none transition-colors duration-200 focus:border-gold focus:bg-[rgba(243,250,246,0.07)]";

export function TextInput(props) {
  return <input {...props} className={inputBase} />;
}

export function TextArea(props) {
  return <textarea {...props} className={`${inputBase} resize-none`} />;
}

export function WordCountArea({ value, onChange, minWords, ...rest }) {
  const words = value.trim() ? value.trim().split(/\s+/).length : 0;
  const ok = words >= minWords;
  return (
    <div>
      <textarea value={value} onChange={onChange} className={`${inputBase} resize-none`} {...rest} />
      <div className="flex justify-end mt-[0.35rem]">
        <span className={`font-sans text-[0.66rem] tracking-[0.06em] ${ok ? "text-[#2aae8b]" : "text-muted"}`}>
          {words} / {minWords} words min
        </span>
      </div>
    </div>
  );
}

export function RadioGroup({ options, value, onChange }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-[0.5rem] md:gap-[0.55rem]">
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            type="button"
            key={opt}
            onClick={() => onChange(opt)}
            className={`rounded-[0.6rem] border px-[0.85rem] py-[0.75rem] md:py-[0.6rem] text-[0.82rem] md:text-[0.8rem] tracking-[0.02em] text-left transition-all duration-200 ${
              active
                ? "border-gold bg-[rgba(217,166,86,0.12)] text-paper"
                : "border-[rgba(243,250,246,0.14)] bg-[rgba(243,250,246,0.03)] text-muted hover:border-[rgba(243,250,246,0.3)] active:border-[rgba(243,250,246,0.3)]"
            }`}
          >
            <span
              className={`inline-block h-[8px] w-[8px] rounded-full mr-[0.5rem] align-middle border ${
                active ? "bg-gold border-gold" : "border-[rgba(243,250,246,0.4)]"
              }`}
            />
            {opt}
          </button>
        );
      })}
    </div>
  );
}

export function CheckboxGroup({ options, value, onChange, max }) {
  const toggle = (opt) => {
    if (value.includes(opt)) {
      onChange(value.filter((v) => v !== opt));
    } else {
      if (max && value.length >= max) return;
      onChange([...value, opt]);
    }
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[0.5rem] md:gap-[0.55rem]">
      {options.map((opt) => {
        const active = value.includes(opt);
        const disabled = !active && max && value.length >= max;
        return (
          <button
            type="button"
            key={opt}
            disabled={disabled}
            onClick={() => toggle(opt)}
            className={`flex items-center gap-[0.55rem] rounded-[0.6rem] border px-[0.85rem] py-[0.75rem] md:py-[0.6rem] text-[0.82rem] md:text-[0.8rem] tracking-[0.01em] text-left transition-all duration-200 ${
              active
                ? "border-gold bg-[rgba(217,166,86,0.12)] text-paper"
                : disabled
                ? "border-[rgba(243,250,246,0.08)] bg-transparent text-[rgba(243,250,246,0.3)] cursor-not-allowed"
                : "border-[rgba(243,250,246,0.14)] bg-[rgba(243,250,246,0.03)] text-muted hover:border-[rgba(243,250,246,0.3)] active:border-[rgba(243,250,246,0.3)]"
            }`}
          >
            <span
              className={`flex-shrink-0 inline-flex items-center justify-center h-[15px] w-[15px] rounded-[4px] border ${
                active ? "bg-gold border-gold" : "border-[rgba(243,250,246,0.4)]"
              }`}
            >
              {active && (
                <svg width="9" height="7" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="#0e342e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            {opt}
          </button>
        );
      })}
      {max && (
        <p className="col-span-full font-sans text-[0.66rem] text-muted mt-[0.1rem]">
          {value.length} / {max} selected
        </p>
      )}
    </div>
  );
}

/* ---------- horizontal "road" path stepper ---------- */

export function PathStepper({ steps, current }) {
  return (
    <div className="flex items-start w-full mb-[1.6rem] md:mb-[2.2rem]">
      {steps.map((label, i) => {
        const idx = i + 1;
        const done = idx < current;
        const active = idx === current;
        return (
          <div key={label} className="flex items-start flex-1 last:flex-none min-w-0">
            <div className="flex flex-col items-center flex-shrink-0 w-[52px] md:w-[64px]">
              <div
                className={`flex items-center justify-center h-[28px] w-[28px] md:h-[34px] md:w-[34px] rounded-full border text-[0.68rem] md:text-[0.72rem] font-sans transition-all duration-300 ${
                  done
                    ? "bg-gold border-gold text-ink"
                    : active
                    ? "border-gold text-gold bg-[rgba(217,166,86,0.1)]"
                    : "border-[rgba(243,250,246,0.25)] text-muted"
                }`}
              >
                {done ? (
                  <svg width="11" height="9" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="#0e342e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  idx
                )}
              </div>
              <span
                className={`mt-[0.4rem] font-sans text-[0.54rem] md:text-[0.66rem] leading-[1.25] tracking-[0.04em] md:tracking-[0.08em] uppercase text-center break-words ${
                  active ? "text-paper" : "text-muted"
                }`}
              >
                {label}
              </span>
            </div>
            {idx < steps.length && (
              <div className="flex-1 h-[2px] mx-[0.3rem] md:mx-[0.8rem] mt-[13px] md:mt-[17px] rounded-full overflow-hidden bg-[rgba(243,250,246,0.14)]">
                <div
                  className="h-full bg-gold transition-all duration-500 ease-out"
                  style={{ width: done ? "100%" : "0%" }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ---------- modal window shell ---------- */

export function ApplicationModal({ open, onClose, roleTag, children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!open) return;

    // iOS Safari fix: the page uses `position: sticky` sections, and with
    // those present, `overflow: hidden` alone on <body> doesn't reliably
    // stop background scroll — touch events can "leak" into the sticky
    // ancestors instead of the modal's own scroll container, making the
    // form appear unscrollable. Locking the body via `position: fixed`
    // (freezing it at the current scroll offset) avoids that.
    const scrollY = window.scrollY;
    const { style } = document.body;
    style.position = "fixed";
    style.top = `-${scrollY}px`;
    style.left = "0";
    style.right = "0";
    style.overflow = "hidden";

    return () => {
      style.position = "";
      style.top = "";
      style.left = "";
      style.right = "";
      style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center md:items-center md:p-[2rem]">
      <div
        className="absolute inset-0 bg-[rgba(6,18,17,0.72)] backdrop-blur-sm animate-[fadeIn_0.25s_ease]"
        onClick={onClose}
      />
      <div
        className="relative z-[1] flex w-full max-w-[680px] flex-col overflow-hidden rounded-t-[1.2rem] md:rounded-[1.4rem] border border-[rgba(243,250,246,0.14)] bg-[#0f2725] [box-shadow:0_60px_120px_-40px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.05)] max-h-[100svh] md:max-h-[92svh] h-[100svh] md:h-auto animate-[slideUp_0.3s_cubic-bezier(0.22,1,0.36,1)]"
      >
        <div className="flex items-center justify-between shrink-0 border-b border-[rgba(243,250,246,0.08)] bg-[#0f2725] px-[1.1rem] py-[0.9rem] md:px-[2.2rem] md:py-[1.4rem] md:border-b-0 [padding-top:max(0.9rem,env(safe-area-inset-top))]">
          <span className="inline-flex items-center h-[24px] rounded-full px-[0.7rem] font-sans text-[0.58rem] font-medium tracking-[0.14em] uppercase text-gold border border-[rgba(217,166,86,0.4)] bg-[rgba(217,166,86,0.08)]">
            {roleTag}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center h-[34px] w-[34px] md:h-[30px] md:w-[30px] rounded-full border border-[rgba(243,250,246,0.2)] text-paper text-[1rem] md:text-[0.9rem] hover:bg-paper hover:text-ink active:bg-paper active:text-ink transition-colors duration-200"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div
          data-lenis-prevent
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch] [touch-action:pan-y] px-[1.1rem] pt-[1.1rem] md:px-[2.2rem] md:pt-[2.2rem] [padding-bottom:max(1.6rem,env(safe-area-inset-bottom))] md:pb-[2.2rem]"
        >
          {children}
        </div>
      </div>
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(18px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>,
    document.body
  );
}

export function StepNav({ step, total, onBack, onNext, canNext, submitting, isLast }) {
  return (
    <div className="sticky bottom-0 left-0 right-0 z-[1] mt-[1.6rem] -mx-[1.1rem] md:mx-0 md:static border-t border-[rgba(243,250,246,0.08)] md:border-t-0 bg-[#0f2725] md:bg-transparent px-[1.1rem] md:px-0 pt-[0.9rem] md:pt-0 pb-[calc(0.9rem+env(safe-area-inset-bottom))] md:pb-0 flex items-center justify-between gap-[0.7rem] md:gap-[1rem]">
      <button
        type="button"
        onClick={onBack}
        disabled={step === 1}
        className={`inline-flex items-center justify-center gap-[0.4em] rounded-full border px-[1.1rem] py-[0.8rem] md:py-[0.65rem] text-[0.76rem] tracking-[0.06em] uppercase transition-colors duration-200 shrink-0 ${
          step === 1
            ? "border-[rgba(243,250,246,0.08)] text-[rgba(243,250,246,0.25)] cursor-not-allowed"
            : "border-[rgba(243,250,246,0.25)] text-paper hover:bg-paper hover:text-ink active:bg-paper active:text-ink"
        }`}
      >
        ← Back
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={!canNext || submitting}
        className={`flex-1 md:flex-none inline-flex items-center justify-center gap-[0.5em] rounded-full px-[1.4rem] py-[0.8rem] md:py-[0.75rem] text-[0.8rem] tracking-[0.04em] transition-all duration-200 whitespace-nowrap ${
          canNext && !submitting
            ? "bg-paper text-ink hover:-translate-y-[1px] [box-shadow:0_0_0_1px_rgba(217,166,86,0.4),0_16px_36px_-16px_rgba(217,166,86,0.4)]"
            : "bg-[rgba(243,250,246,0.1)] text-[rgba(243,250,246,0.35)] cursor-not-allowed"
        }`}
      >
        {submitting ? "Submitting…" : isLast ? "Submit application" : "Continue"}
        <span>{isLast ? "" : "→"}</span>
      </button>
    </div>
  );
}

export function SuccessPanel({ roleLabel, onClose }) {
  return (
    <div className="flex flex-col items-center text-center py-[2rem]">
      <div className="h-[56px] w-[56px] rounded-full border border-gold flex items-center justify-center mb-[1.3rem]">
        <svg width="22" height="17" viewBox="0 0 26 20" fill="none">
          <path d="M2 10L9.5 17.5L24 2" stroke="#d9a656" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 className="font-serif font-normal text-[clamp(1.3rem,3.6vw,1.8rem)] leading-[1.1] tracking-[-0.01em] mb-[0.7rem]">
        Application received.
      </h2>
      <p className="font-sans text-[0.84rem] leading-[1.6] text-muted max-w-[380px] mb-[1.6rem]">
        Thank you for applying to TSBL MUN as {roleLabel}. Our team will review your submission
        and reach out via the Gmail address you provided.
      </p>
      <button
        type="button"
        onClick={onClose}
        className="inline-flex items-center gap-[0.5em] rounded-full bg-paper px-[1.4rem] py-[0.8rem] text-[0.82rem] text-ink transition-transform duration-300 hover:-translate-y-[1px] [box-shadow:0_0_0_1px_rgba(217,166,86,0.4),0_20px_50px_-20px_rgba(217,166,86,0.35)]"
      >
        Close
      </button>
    </div>
  );
}

export const GRADE_OPTIONS = ["Freshman", "Sophomore", "Junior", "Senior", "Other"];
export const COMMITTEE_OPTIONS = [
  "WHO (World Health Organization)",
  "UNEP (United Nations Environment Programme)",
  "UNCOPUOS (Historical United Nations Committee on the Peaceful Uses of Outer Space)",
  "H-AIA (Historical Aerospace Industries Association)",
  "FKK (Fantastik Kriz Komitesi)",
  "JCC (Joint Crisis Committee)",
];

export function personalDefaults() {
  return {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    idNumber: "",
    school: "",
    grade: "",
  };
}

export function PersonalStep({ form, set }) {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[1rem]">
        <Field label="First Name" required>
          <TextInput value={form.firstName} onChange={set("firstName")} placeholder="e.g. Ada" />
        </Field>
        <Field label="Last Name" required>
          <TextInput value={form.lastName} onChange={set("lastName")} placeholder="e.g. Lovelace" />
        </Field>
      </div>
      <Field label="Gmail Address" required>
        <TextInput type="email" value={form.email} onChange={set("email")} placeholder="you@gmail.com" />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[1rem]">
        <Field label="Phone Number" required>
          <TextInput type="tel" value={form.phone} onChange={set("phone")} placeholder="+90 5xx xxx xx xx" />
        </Field>
        <Field label="ID Number" required>
          <TextInput value={form.idNumber} onChange={set("idNumber")} placeholder="National / Student ID" />
        </Field>
      </div>
      <Field label="School Name" required>
        <TextInput value={form.school} onChange={set("school")} placeholder="Your school" />
      </Field>
      <Field label="Grade" required>
        <RadioGroup options={GRADE_OPTIONS} value={form.grade} onChange={set("grade")} />
      </Field>
    </div>
  );
}

export function isPersonalValid(form) {
  return (
    form.firstName &&
    form.lastName &&
    form.email &&
    form.phone &&
    form.idNumber &&
    form.school &&
    form.grade
  );
}

export function wordsIn(text) {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}
