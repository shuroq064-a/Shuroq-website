"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";

const MotionImage = motion(Image);

const overlayCss = `
.ec-backdrop[data-open="true"]{position:fixed;inset:0;z-index:40;background:rgba(0,0,0,.68);backdrop-filter:blur(8px)}
@media (prefers-reduced-motion:reduce){.ec-backdrop{backdrop-filter:none}}
`;

export interface ExpandableCardItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  /** Detail content shown when expanded. */
  content: ReactNode;
  /** Label of the action pill. */
  cta?: string;
  /** Optional destination for the action pill. */
  href?: string;
  onCta?: () => void;
}

export interface ExpandableCardsProps {
  items: ExpandableCardItem[];
  /** Corner radius of cards in px. */
  radius?: number;
  /** Spring bounce of the expand animation, 0 to 0.5. */
  bounce?: number;
  /** Dim + blur the list behind the open card. */
  backdrop?: boolean;
  className?: string;
}

export function ExpandableCards({ items, radius = 20, bounce = 0.15, backdrop = true, className }: ExpandableCardsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const uid = useId();
  const reduce = useReducedMotion();
  const closeBtn = useRef<HTMLButtonElement>(null);
  const triggers = useRef(new Map<string, HTMLButtonElement>());
  const lastId = useRef<string | null>(null);
  const previousOverflow = useRef("");

  const active = items.find((i) => i.id === activeId) ?? null;
  const t = reduce ? { duration: 0 } : { type: "spring" as const, bounce, duration: 0.5 };
  const lid = (part: string, id: string) => `${uid}-${part}-${id}`;

  useEffect(() => {
    if (activeId) {
      lastId.current = activeId;
      closeBtn.current?.focus({ preventScroll: true });
    } else if (lastId.current) {
      triggers.current.get(lastId.current)?.focus({ preventScroll: true });
    }
  }, [activeId]);

  useEffect(() => {
    if (!activeId) return;
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow.current;
    };
  }, [activeId]);

  return (
    <div className={`relative flex w-full flex-col justify-center ${className ?? ""}`}>
      <style>{overlayCss}</style>
      <ul className="flex w-full flex-col gap-2" inert={activeId !== null}>
        {items.map((item) => {
          const open = item.id === activeId;
          return (
            <li key={item.id}>
              <motion.button
                ref={(el: HTMLButtonElement | null) => {
                  if (el) triggers.current.set(item.id, el);
                  else triggers.current.delete(item.id);
                }}
                type="button"
                layoutId={open ? undefined : lid("card", item.id)}
                transition={t}
                onClick={() => setActiveId(item.id)}
                aria-haspopup="dialog"
                className={`group flex w-full items-center gap-4 bg-card p-3 text-left outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring ${open ? "invisible" : ""}`}
                style={{ borderRadius: radius }}
              >
                <MotionImage
                  width={56}
                  height={56}
                  layoutId={open ? undefined : lid("image", item.id)}
                  transition={t}
                  src={item.image}
                  alt=""
                  draggable={false}
                  className="size-14 shrink-0 object-cover"
                  style={{ borderRadius: radius * 0.6 }}
                />
                <div className="min-w-0 flex-1">
                  <motion.p layoutId={open ? undefined : lid("title", item.id)} transition={t} className="truncate font-semibold text-foreground">
                    {item.title}
                  </motion.p>
                  <motion.p layoutId={open ? undefined : lid("sub", item.id)} transition={t} className="truncate text-sm text-muted-foreground">
                    {item.subtitle}
                  </motion.p>
                </div>
                <span className="shrink-0 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  View details
                </span>
              </motion.button>
            </li>
          );
        })}
      </ul>

      <AnimatePresence>
        {active && (
          <motion.div
            key="backdrop"
            aria-hidden
            onClick={() => setActiveId(null)}
            className={`ec-backdrop ${backdrop ? "" : "[background:transparent!important]"}`}
            data-open="true"
            style={{ borderRadius: radius }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && (
          <div key="dialog" className="pointer-events-none fixed inset-0 z-50 grid place-items-center p-4">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={lid("title", active.id)}
              layoutId={lid("card", active.id)}
              transition={t}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  e.stopPropagation();
                  setActiveId(null);
                }
              }}
              className="pointer-events-auto flex max-h-[min(82dvh,720px)] w-full max-w-md flex-col overflow-hidden rounded-[20px] bg-card"
              style={{ borderRadius: radius }}
            >
              <div className="relative">
                <MotionImage
                  width={720}
                  height={450}
                  sizes="(max-width: 640px) 90vw, 448px"
                  layoutId={lid("image", active.id)}
                  transition={t}
                  src={active.image}
                  alt=""
                  draggable={false}
                  className="h-44 w-full object-cover"
                  style={{ borderRadius: 0 }}
                />
                <button
                  ref={closeBtn}
                  type="button"
                  aria-label="Close"
                  onClick={() => setActiveId(null)}
                  className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-black/50 text-white outline-none backdrop-blur transition-colors hover:bg-black/70 focus-visible:ring-2 focus-visible:ring-white"
                >
                  <X className="size-4" />
                </button>
              </div>
              <div className="flex items-start justify-between gap-4 p-5 pb-3">
                <div className="min-w-0">
                  <motion.p id={lid("title", active.id)} layoutId={lid("title", active.id)} transition={t} className="text-lg font-semibold text-foreground">
                    {active.title}
                  </motion.p>
                  <motion.p layoutId={lid("sub", active.id)} transition={t} className="text-sm text-muted-foreground">
                    {active.subtitle}
                  </motion.p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveId(null)}
                  className="shrink-0 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Close
                </button>
              </div>
              <motion.div
                initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.05 } }}
                transition={{ delay: reduce ? 0 : 0.12, duration: reduce ? 0 : 0.3 }}
                className="min-h-0 overflow-y-auto px-5 pb-5 text-sm leading-relaxed text-muted-foreground"
              >
                {active.content}
                {active.href && (
                  <Link
                    href={active.href}
                    className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                  >
                    {active.cta ?? "View service"}
                    <span aria-hidden="true">-&gt;</span>
                  </Link>
                )}
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
