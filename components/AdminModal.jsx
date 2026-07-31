"use client";

import { useState } from "react";
import {
  Field,
  TextArea,
  WordCountArea,
  PathStepper,
  ApplicationModal,
  StepNav,
  SuccessPanel,
  PersonalStep,
  personalDefaults,
  isPersonalValid,
  wordsIn,
} from "./ApplicationForm";

const STEPS = ["Personal Info", "Experience", "Motivation"];

export default function AdminModal({ open, onClose }) {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    ...personalDefaults(),
    experience: "",
    motivation: "",
  });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target ? e.target.value : e }));

  const canNext =
    step === 1
      ? isPersonalValid(form)
      : step === 2
      ? form.experience.trim().length > 0
      : wordsIn(form.motivation) >= 150;

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setDone(false);
      setForm({ ...personalDefaults(), experience: "", motivation: "" });
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
    <ApplicationModal open={open} onClose={handleClose} roleTag="Admin">
      {done ? (
        <SuccessPanel roleLabel="an Administrative Staff member" onClose={handleClose} />
      ) : (
        <>
          <PathStepper steps={STEPS} current={step} />

          {step === 1 && <PersonalStep form={form} set={set} />}

          {step === 2 && (
            <div>
              <Field
                label="Experience List"
                required
                hint="List past MUN conferences, admin/organizing experience, or relevant skills."
              >
                <TextArea
                  rows={7}
                  value={form.experience}
                  onChange={set("experience")}
                  placeholder="e.g. TSBL MUN 2025 — Administrative Staff..."
                />
              </Field>
            </div>
          )}

          {step === 3 && (
            <div>
              <Field label="Motivation Letter" required hint="Minimum 150 words.">
                <WordCountArea
                  rows={11}
                  minWords={150}
                  value={form.motivation}
                  onChange={set("motivation")}
                  placeholder="Tell us why you want to join the Administrative Staff at TSBL MUN..."
                />
              </Field>
            </div>
          )}

          <StepNav
            step={step}
            total={STEPS.length}
            onBack={() => setStep((s) => Math.max(1, s - 1))}
            onNext={handleNext}
            canNext={canNext}
            submitting={submitting}
            isLast={step === STEPS.length}
          />
        </>
      )}
    </ApplicationModal>
  );
}
