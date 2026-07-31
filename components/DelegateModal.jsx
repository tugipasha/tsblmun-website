"use client";

import { useState } from "react";
import {
  Field,
  TextArea,
  WordCountArea,
  CheckboxGroup,
  PathStepper,
  ApplicationModal,
  StepNav,
  SuccessPanel,
  COMMITTEE_OPTIONS,
  PersonalStep,
  personalDefaults,
  isPersonalValid,
  wordsIn,
} from "./ApplicationForm";

const STEPS = ["Personal Info", "Experience", "Committees"];

export default function DelegateModal({ open, onClose }) {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    ...personalDefaults(),
    experience: "",
    motivation: "",
    committees: [],
  });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target ? e.target.value : e }));

  const canNext =
    step === 1
      ? isPersonalValid(form)
      : step === 2
      ? form.experience.trim().length > 0 && wordsIn(form.motivation) >= 250
      : form.committees.length > 0;

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setDone(false);
      setForm({ ...personalDefaults(), experience: "", motivation: "", committees: [] });
    }, 300);
  };

  const handleNext = () => {
    if (step === STEPS.length) {
      setSubmitting(true);
      setTimeout(() => {
        setSubmitting(false);
        setDone(true);
      }, 900);
    } else {
      setStep((s) => s + 1);
    }
  };

  return (
    <ApplicationModal
      open={open}
      onClose={handleClose}
      roleTag="Delegate"
      footer={
        !done && (
          <StepNav
            step={step}
            total={STEPS.length}
            onBack={() => setStep((s) => Math.max(1, s - 1))}
            onNext={handleNext}
            canNext={canNext}
            submitting={submitting}
            isLast={step === STEPS.length}
          />
        )
      }
    >
      {done ? (
        <SuccessPanel roleLabel="a Delegate" onClose={handleClose} />
      ) : (
        <>
          <PathStepper steps={STEPS} current={step} />

          {step === 1 && <PersonalStep form={form} set={set} />}

          {step === 2 && (
            <div>
              <Field
                label="Experience List"
                required
                hint="List past MUN conferences, roles, awards, or relevant experience."
              >
                <TextArea
                  rows={5}
                  value={form.experience}
                  onChange={set("experience")}
                  placeholder="e.g. TSBL MUN 2025 — Delegate, Honorable Mention..."
                />
              </Field>
              <Field label="Motivation Letter" required hint="Minimum 250 words.">
                <WordCountArea
                  rows={9}
                  minWords={250}
                  value={form.motivation}
                  onChange={set("motivation")}
                  placeholder="Tell us why you want to be a delegate at TSBL MUN..."
                />
              </Field>
            </div>
          )}

          {step === 3 && (
            <div>
              <Field label="Committee Preference" required hint="Select up to 3 committees, in order of interest.">
                <CheckboxGroup
                  options={COMMITTEE_OPTIONS}
                  value={form.committees}
                  onChange={set("committees")}
                  max={3}
                />
              </Field>
            </div>
          )}
        </>
      )}
    </ApplicationModal>
  );
}
