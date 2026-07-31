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

const STEPS = ["Personal Info", "Experience", "Committee & Questions"];

export default function ChairboardModal({ open, onClose }) {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    ...personalDefaults(),
    experience: "",
    motivation: "",
    finalDocuments: "",
    aiUse: "",
    conflict: "",
    directive: "",
    gaProcedure: "",
    committees: [],
  });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target ? e.target.value : e }));

  const canNext =
    step === 1
      ? isPersonalValid(form)
      : step === 2
      ? form.experience.trim().length > 0 && wordsIn(form.motivation) >= 250
      : form.committees.length > 0 && form.aiUse.trim().length > 0 && form.conflict.trim().length > 0;

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setDone(false);
      setForm({
        ...personalDefaults(),
        experience: "",
        motivation: "",
        finalDocuments: "",
        aiUse: "",
        conflict: "",
        directive: "",
        gaProcedure: "",
        committees: [],
      });
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
      roleTag="Chairboard"
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
        <SuccessPanel roleLabel="Chairboard" onClose={handleClose} />
      ) : (
        <>
          <PathStepper steps={STEPS} current={step} />

          {step === 1 && <PersonalStep form={form} set={set} />}

          {step === 2 && (
            <div>
              <Field
                label="Experience List"
                required
                hint="List past MUN conferences, chairing experience, roles, or awards."
              >
                <TextArea
                  rows={5}
                  value={form.experience}
                  onChange={set("experience")}
                  placeholder="e.g. TSBL MUN 2025 — Chair, WHO Committee..."
                />
              </Field>
              <Field label="Motivation Letter" required hint="Minimum 250 words.">
                <WordCountArea
                  rows={9}
                  minWords={250}
                  value={form.motivation}
                  onChange={set("motivation")}
                  placeholder="Tell us why you want to be part of the Chairboard at TSBL MUN..."
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
              <Field
                label="Final documents"
                hint="Write and explain the different types of final documents in detail. If you chose a crisis committee, you may skip this question."
              >
                <TextArea
                  rows={4}
                  value={form.finalDocuments}
                  onChange={set("finalDocuments")}
                  placeholder="Resolutions, communiqués, press releases..."
                />
              </Field>
              <Field label="AI use during committee" required>
                <TextArea
                  rows={4}
                  value={form.aiUse}
                  onChange={set("aiUse")}
                  placeholder="What would you do if you saw delegates using AI during the conference, especially if it affected their own research and speeches?"
                />
              </Field>
              <Field label="Handling conflict" required>
                <TextArea
                  rows={4}
                  value={form.conflict}
                  onChange={set("conflict")}
                  placeholder="What would you do if a serious argument or conflict started between delegates during the committee session?"
                />
              </Field>
              <Field
                label="Writing a directive"
                hint="How should a directive be written, and what are the most important points to consider? If you chose a general assembly committee, you may skip this question."
              >
                <TextArea
                  rows={4}
                  value={form.directive}
                  onChange={set("directive")}
                  placeholder="Key components, structure, crisis relevance..."
                />
              </Field>
              <Field
                label="General Assembly procedure"
                hint="How does the General Assembly procedure work, and what are the main steps? If you chose a crisis committee, you may skip this question."
              >
                <TextArea
                  rows={4}
                  value={form.gaProcedure}
                  onChange={set("gaProcedure")}
                  placeholder="Roll call, setting the agenda, speakers' list, moderated/unmoderated caucus..."
                />
              </Field>
            </div>
          )}
        </>
      )}
    </ApplicationModal>
  );
}
