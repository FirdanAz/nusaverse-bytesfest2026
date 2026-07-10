"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { PreparationStep } from "@/types";

interface PreparationTimelineProps {
  steps: PreparationStep[];
}

export default function PreparationTimeline({ steps }: PreparationTimelineProps) {
  const { currentLang } = useLanguage();

  return (
    <div className="culinary-timeline-container">
      <div className="culinary-timeline-flex">
        {steps.map((step, idx) => (
          <React.Fragment key={step.step}>
            {/* Step Node */}
            <div className="timeline-node-card">
              
              {/* Step Circle Header */}
              <div className="timeline-node-circle">
                {step.step}
              </div>

              {/* Title & Description */}
              <h4 className="timeline-node-title">
                {currentLang === "id" ? step.title_id : step.title_en}
              </h4>
              <p className="timeline-node-desc">
                {currentLang === "id" ? step.desc_id : step.desc_en}
              </p>

            </div>

            {/* Connecting Arrow between nodes (omitted after the last node) */}
            {idx < steps.length - 1 && (
              <div className="timeline-node-divider" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="divider-arrow-svg"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
