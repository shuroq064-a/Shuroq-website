/**
 * Types for the vendored react-bits Stepper (JS + CSS variant).
 *
 * The upstream registry item ships JavaScript, so the types live here rather
 * than in the component itself. The API mirrors the component's props.
 */
import * as React from "react";

export interface StepProps {
  /** Body of the step. */
  children?: React.ReactNode;
  /** Title shown in the step indicator. */
  title?: React.ReactNode;
  /** Sub-label, used by the vertical rail layout. */
  description?: React.ReactNode;
  /** Custom glyph in the step badge. */
  icon?: React.ReactNode;
}

export type StepperIndicator = "numbers" | "dots" | "bars";
export type StepperOrientation = "horizontal" | "vertical";
export type StepperTransition = "slide" | "fade" | "none";

export interface StepperProps {
  /** The steps, as `Step` elements. */
  children?: React.ReactNode;
  /** Controlled step number. */
  step?: number;
  /** First step when uncontrolled. */
  initialStep?: number;
  onStepChange?: (step: number) => void;
  onFinalStepCompleted?: () => void;
  indicator?: StepperIndicator;
  orientation?: StepperOrientation;
  transition?: StepperTransition;
  /** Only allow steps up to the furthest one reached. */
  linear?: boolean;
  disableStepIndicators?: boolean;
  renderStepIndicator?: (args: {
    step: number;
    currentStep: number;
    onStepClick: (step: number) => void;
  }) => React.ReactNode;
  showFooter?: boolean;
  backButtonText?: React.ReactNode;
  nextButtonText?: React.ReactNode;
  completeButtonText?: React.ReactNode;
  backButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  nextButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  /** Shown once the last step is complete. */
  completedContent?: React.ReactNode;
  theme?: "dark" | "light";
  /** Overrides the fill of the primary button. */
  accentColor?: string;
  frame?: boolean;
  radius?: number;
  width?: number | string;
  className?: string;
  stepCircleContainerClassName?: string;
  stepContainerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  style?: React.CSSProperties;
}

export declare function Step(props: StepProps): React.ReactElement;
export default function Stepper(props: StepperProps): React.ReactElement;
