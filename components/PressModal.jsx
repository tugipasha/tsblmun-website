"use client";

import { useState } from "react";
import {
  Field,
  TextInput,
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

const STEPS = ["Personal Info", "Camera & Experience", "Motivation"];

export default function PressModal({ open, onClose }) {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    ...personalDefaults(),
    cameraModel: "",
    experience: "",
    motivation: "",
  });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target ? e.target.value : e }));

  const canNext =
    step === 1
      ? isPersonalValid(form)
      : step === 2
      ? form.cameraModel.trim().length > 0 && form.experience.trim().length > 0
      : wordsIn(form.motivation) >= 150;

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setDone(false);
      setForm({ ...personalDefaults(), cameraModel: "", experience: "", motivation: "" });
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
    <ApplicationModal open={open} onClose={handleClose} roleTag="Press">
      {done ? (
        <SuccessPanel roleLabel="Press" onClose={handleClose} />
      ) : (
        <>
          <PathStepper steps={STEPS} current={step} />

          {step === 1 && <PersonalStep form={form} set={set} />}

          {step === 2 && (
            <div>
              <Field label="Camera Model" required hint="Example: Canon EOS 600D">
                <TextInput
                  value={form.cameraModel}
                  onChange={set("cameraModel")}
                  placeholder="e.g. Canon EOS 600D"
                />
              </Field>
              <Field
                label="Experience List"
                required
                hint="List past photography/videography, press, or media experience."
              >
                <TextArea
                  rows={5}
                  value={form.experience}
                  onChange={set("experience")}
                  placeholder="e.g. TSBL MUN 2025 — Press Team..."
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
                  placeholder="Tell us why you want to join the Press team at TSBL MUN..."
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
