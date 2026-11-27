"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { animate, AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { Button } from "../../button/button";
import SegmentedControl from "../../segmented-control/segmented-control";
import { Switch } from "../../switch/switch";
import { motionTokens } from "../../lib/motion-tokens";
import styles from "./plan-comparison.module.css";

type Billing = "monthly" | "yearly";

/** One plan in the comparison. Leave `price` out when the plan is scoped rather than priced per seat. */
export interface ComparisonPlan {
  id: string;
  name: string;
  tagline: string;
  price?: { monthly: number; yearly: number };
  /** Shown in place of the price when the plan has no per-seat price. */
  priceNote?: string;
  /** The label on the select button. */
  action?: string;
}

/** One row of the matrix. `values` holds a value per plan id. */
export interface ComparisonFeature {
  label: string;
  values: Record<string, string>;
  /** A value that is the same for every plan; hidden by "differences only". */
  shared?: boolean;
}

export interface PlanComparisonProps {
  title?: string;
  description?: string;
  plans: ComparisonPlan[];
  features: ComparisonFeature[];
  /** Shows the monthly/yearly switch. Turn it off when the plans are not priced per seat. */
  showBilling?: boolean;
  matrixLabel?: string;
  columnLabel?: string;
  differencesLabel?: string;
  featureCountLabel?: string;
  footnote?: string;
}

const demoPlans: ComparisonPlan[] = [
  { id: "team", name: "Team", tagline: "For smaller teams", price: { monthly: 13, yearly: 10 } },
  { id: "studio", name: "Studio", tagline: "For work across teams", price: { monthly: 27, yearly: 22 } },
];

const demoFeatures: ComparisonFeature[] = [
  { label: "Active projects", values: { team: "Unlimited", studio: "Unlimited" }, shared: true },
  { label: "Shared workspaces", values: { team: "1 workspace", studio: "Unlimited" } },
  { label: "Guest reviewers", values: { team: "5 per project", studio: "Unlimited" } },
  { label: "Version history", values: { team: "30 days", studio: "Unlimited" } },
  { label: "Approval flows", values: { team: "Not included", studio: "Included" } },
  { label: "Custom roles", values: { team: "Not included", studio: "Included" } },
  { label: "Source exports", values: { team: "Included", studio: "Included" }, shared: true },
  { label: "Support", values: { team: "Email", studio: "Priority email" } },
];

const UNAVAILABLE = new Set(["Not included", "—"]);

function Value({ text }: { text: string }) {
  if (text === "Included") return <span className={styles.included}><Check size={16} strokeWidth={1.75} aria-hidden="true" />Included</span>;
  return <span className={UNAVAILABLE.has(text) ? styles.unavailable : undefined}>{text}</span>;
}

function AnimatedNumber({ value }: { value: number }) {
  const reduce = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(value);
  const previousValue = useRef(value);

  useEffect(() => {
    if (reduce) {
      previousValue.current = value;
      return;
    }

    const controls = animate(previousValue.current, value, {
      duration: motionTokens.duration.standard,
      ease: [...motionTokens.ease.enter],
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });

    previousValue.current = value;
    return () => controls.stop();
  }, [reduce, value]);

  return <>{reduce ? value : displayValue}</>;
}

export function PlanComparison({
  title = "Room for the way you work",
  description = "Only the details that change between plans. Switch billing to see what you would pay.",
  plans = demoPlans,
  features = demoFeatures,
  showBilling = true,
  matrixLabel,
  columnLabel = "What changes",
  differencesLabel = "Show differences only",
  featureCountLabel = "features",
  footnote,
}: PlanComparisonProps) {
  const id = useId();
  const reduce = useReducedMotion();
  const [billing, setBilling] = useState<Billing>("monthly");
  const [differencesOnly, setDifferencesOnly] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const rootRef = useRef<HTMLElement>(null);
  const [size, setSize] = useState<"lg" | "md" | "sm" | "xs">("lg");
  useLayoutEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const measure = (width: number) => setSize(width <= 340 ? "xs" : width <= 540 ? "sm" : width <= 720 ? "md" : "lg");
    measure(node.getBoundingClientRect().width);
    const observer = new ResizeObserver(([entry]) => { if (entry) measure(entry.contentRect.width); });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  const visibleFeatures = differencesOnly ? features.filter((feature) => !feature.shared) : features;

  return (
    <section
      ref={rootRef}
      className={styles.comparison}
      data-size={size}
      style={{ "--plan-count": plans.length } as CSSProperties}
      aria-labelledby={`${id}-title`}
    >
      <div className={styles.intro}>
        <div><h2 id={`${id}-title`}>{title}</h2><p>{description}</p></div>
        {showBilling && <div className={styles.billing}><SegmentedControl label="Billing period" value={billing} onValueChange={(value) => setBilling(value as Billing)} options={[{ value: "monthly", label: "Monthly" }, { value: "yearly", label: "Yearly" }]} /><small>{billing === "yearly" ? "Billed yearly, save up to 23%" : "Billed month to month"}</small></div>}
      </div>

      <div className={styles.filter}><div><h3>{columnLabel}</h3><span className={styles.featureCount}><AnimatedNumber value={visibleFeatures.length} /> of {features.length} {featureCountLabel}</span></div><Switch checked={differencesOnly} onCheckedChange={setDifferencesOnly} label={differencesLabel} /></div>

      <div className={styles.matrix} role="table" aria-label={matrixLabel ?? `${plans.map((plan) => plan.name).join(" and ")} comparison`}>
        <div className={styles.planHeader} role="row">
          <div className={styles.featureHeader} role="columnheader">{columnLabel}</div>
          {plans.map((plan) => (
            <div key={plan.id} className={`${styles.planCell} ${selected === plan.id ? styles.planSelected : ""}`} role="columnheader" aria-label={`${plan.name} plan`}>
              <div className={styles.planTop}><h3>{plan.name}</h3><span>{plan.tagline}</span></div>
              <div className={styles.price}>
                {plan.price ? (
                  <>
                    <span className={styles.priceValue} aria-live="polite" aria-atomic="true">$<AnimatedNumber value={plan.price[billing]} /></span>
                    <span className={styles.pricePeriod}>per seat / month</span>
                  </>
                ) : (
                  <span className={styles.priceNote}>{plan.priceNote ?? "Scoped to your estate"}</span>
                )}
              </div>
              <Button type="button" variant={selected === plan.id ? "primary" : "secondary"} className={styles.selectButton} aria-pressed={selected === plan.id} onClick={() => setSelected((current) => current === plan.id ? null : plan.id)}>{selected === plan.id ? "Selected" : (plan.action ?? `Select ${plan.name}`)}</Button>
              {selected === plan.id && <motion.span className={styles.selectedRail} layoutId={`${id}-selected-rail`} transition={reduce ? { duration: 0 } : motionTokens.spring.responsive} aria-hidden="true" />}
            </div>
          ))}
        </div>

        <div className={styles.rows} role="rowgroup">
          <AnimatePresence initial={false}>
            {visibleFeatures.map((feature) => (
              <motion.div key={feature.label} className={styles.featureRow} role="row" initial={reduce ? false : { height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={reduce ? undefined : { height: 0, opacity: 0, transition: { height: motionTokens.spring.smooth, opacity: { duration: motionTokens.duration.fast } } }} transition={reduce ? { duration: 0 } : { height: motionTokens.spring.smooth, opacity: { duration: motionTokens.duration.standard, ease: [...motionTokens.ease.enter], delay: .04 } }}>
                <div className={styles.featureName} role="rowheader">{feature.label}</div>
                {plans.map((plan) => (
                  <div key={plan.id} className={`${styles.featureValue} ${selected === plan.id ? styles.valueSelected : ""}`} role="cell"><span className={styles.mobilePlan}>{plan.name}</span><Value text={feature.values[plan.id] ?? "—"} /></div>
                ))}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className={styles.footer}><span>{footnote ?? "Prices in USD per seat. Yearly plans are billed annually."}</span><p className={styles.srOnly} role="status" aria-live="polite">{selected ? `${plans.find((plan) => plan.id === selected)?.name} selected` : ""}</p></div>
    </section>
  );
}

export default PlanComparison;
