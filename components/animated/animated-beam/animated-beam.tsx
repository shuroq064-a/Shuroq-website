"use client";

import {
	createContext,
	type CSSProperties,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useId,
	useRef,
	useState,
} from "react";
import { cn } from "@/lib/cn";
import {
	type BeamGeometry,
	type BeamLink,
	type BeamPoint,
	beamGeometry,
	hubPositions,
	pulseDasharray,
	pulseKeyframes,
} from "./animated-beam-core";
import {
	type AnimatedBeamLayout,
	type AnimatedBeamSize,
	type AnimatedBeamTone,
	animatedBeam,
} from "./variants";

export type AnimatedBeamNode = {
	id: string;
	/** Accessible name; shown under the node when AnimatedBeamNodes has `showLabels`. */
	label: string;
	/** Image URL for the node's mark; ignored when `icon` is given. */
	src?: string;
	icon?: ReactNode;
};

type BeamCtx = {
	layout: AnimatedBeamLayout;
	hub?: AnimatedBeamNode;
	satellites: AnimatedBeamNode[];
	geometry: BeamGeometry[];
	styles: ReturnType<typeof animatedBeam>;
	measure: () => void;
	registerSatellite: (id: string, element: HTMLElement | null) => void;
	registerPath: (key: string, kind: "track" | "pulse", element: SVGPathElement | null) => void;
};

const BeamContext = createContext<BeamCtx | null>(null);

function useBeam(part: string): BeamCtx {
	const ctx = useContext(BeamContext);
	if (!ctx) throw new Error(`${part} must be used inside <AnimatedBeam>`);
	return ctx;
}

export interface AnimatedBeamProps {
	nodes: AnimatedBeamNode[];
	/** Which nodes a beam joins; a node can sit on several beams. */
	beams: BeamLink[];
	/** Id of the hub (or, in a row, the target); defaults to the first node. */
	center?: string;
	layout?: AnimatedBeamLayout;
	size?: AnimatedBeamSize;
	tone?: AnimatedBeamTone;
	/** How far each beam bows away from a straight line, in px. */
	curvature?: number;
	className?: string;
	children?: ReactNode;
}

/** Holds the nodes and beams and measures node centres; compose Beams and Nodes inside. */
export function AnimatedBeam({
	nodes,
	beams,
	center,
	layout = "hub",
	size = "md",
	tone = "primary",
	curvature = 24,
	className,
	children,
}: AnimatedBeamProps) {
	const styles = animatedBeam({ layout, size, tone });
	const centreId = center ?? nodes[0]?.id;
	const hub = nodes.find((n) => n.id === centreId);
	const satellites = nodes.filter((n) => n.id !== centreId);
	const root = useRef<HTMLDivElement>(null);
	const [geometry, setGeometry] = useState<BeamGeometry[]>([]);
	// Anything that moves a node re-measures, not just a container resize.
	const arrangement = `${layout}|${size}|${nodes.map((n) => n.id).join(",")}`;

	// The orbit: satellites travel around the hub on the same ellipse they are
	// laid out on, one lap per minute. The DOM is written directly so the
	// diagram never re-renders React at frame rate.
	const satelliteEls = useRef(new Map<string, HTMLElement>());
	const pathEls = useRef(
		new Map<string, { track: SVGPathElement | null; pulse: SVGPathElement | null }>(),
	);
	const hubCentre = useRef<BeamPoint | undefined>(undefined);
	const box = useRef({ width: 0, height: 0 });

	const registerSatellite = useCallback((id: string, element: HTMLElement | null) => {
		if (element) satelliteEls.current.set(id, element);
		else satelliteEls.current.delete(id);
	}, []);

	const registerPath = useCallback(
		(key: string, kind: "track" | "pulse", element: SVGPathElement | null) => {
			const entry = pathEls.current.get(key) ?? { track: null, pulse: null };
			entry[kind] = element;
			pathEls.current.set(key, entry);
		},
		[],
	);

	// Centres come from the rendered nodes, so any layout, size or label change stays aligned.
	const measure = useCallback(() => {
		const el = root.current;
		if (!el) return;
		const rect = el.getBoundingClientRect();
		box.current = { width: rect.width, height: rect.height };
		const centres = new Map<string, BeamPoint>();
		for (const node of el.querySelectorAll<HTMLElement>("[data-beam-node]")) {
			const r = node.getBoundingClientRect();
			centres.set(node.dataset.beamNode ?? "", {
				x: r.left - rect.left + r.width / 2,
				y: r.top - rect.top + r.height / 2,
			});
		}
		hubCentre.current = centreId ? centres.get(centreId) : undefined;
		setGeometry(beamGeometry(beams, centres, curvature));
	}, [beams, curvature, centreId]);

	useEffect(() => {
		const el = root.current;
		if (!el) return;
		void arrangement;
		measure();
		const observer = new ResizeObserver(measure);
		observer.observe(el);
		return () => observer.disconnect();
	}, [measure, arrangement]);

	// The slow orbit around the hub.
	useEffect(() => {
		const el = root.current;
		if (layout !== "hub" || !el) return;
		if (typeof window === "undefined") return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		const count = satellites.length;
		if (count === 0) return;

		const OMEGA = (Math.PI * 2) / 60; // one lap per minute
		let frame = 0;
		const start = performance.now();
		let running = true;

		const step = (now: number) => {
			frame = requestAnimationFrame(step);
			if (!running || document.hidden) return;
			const node = root.current;
			const hub = hubCentre.current;
			const size = box.current;
			if (!node || !hub || size.width < 40 || size.height < 40) return;

			const seconds = (now - start) / 1000;
			const centres = new Map<string, BeamPoint>();
			if (centreId) centres.set(centreId, hub);

			satellites.forEach((node, index) => {
				const base = -Math.PI / 2 + (index / count) * Math.PI * 2;
				const angle = base + seconds * OMEGA;
				const x = 50 + Math.cos(angle) * 38;
				const y = 50 + Math.sin(angle) * 36;
				const nodeEl = satelliteEls.current.get(node.id);
				if (nodeEl) {
					nodeEl.style.setProperty("--sx", `${x}`);
					nodeEl.style.setProperty("--sy", `${y}`);
				}
				centres.set(node.id, {
					x: (x / 100) * size.width,
					y: (y / 100) * size.height,
				});
			});

			for (const beam of beamGeometry(beams, centres, curvature)) {
				const paths = pathEls.current.get(beam.key);
				paths?.track?.setAttribute("d", beam.d);
				paths?.pulse?.setAttribute("d", beam.d);
			}
		};

		const io = new IntersectionObserver(
			(entries) => {
				running = entries.some((entry) => entry.isIntersecting);
			},
			{ rootMargin: "120px" },
		);
		io.observe(el);

		frame = requestAnimationFrame(step);
		return () => {
			cancelAnimationFrame(frame);
			io.disconnect();
		};
	}, [layout, satellites, beams, curvature, centreId]);

	return (
		<BeamContext.Provider
			value={{
				layout,
				hub,
				satellites,
				geometry,
				styles,
				measure,
				registerSatellite,
				registerPath,
			}}
		>
			<div ref={root} data-slot="animated-beam" className={cn(styles.root(), className)}>
				{children}
			</div>
		</BeamContext.Provider>
	);
}

/** The beams: a quiet track per link with a gradient pulse travelling along it. */
export function AnimatedBeamBeams({ className }: { className?: string }) {
	const { geometry, styles, registerPath } = useBeam("AnimatedBeamBeams");
	const uid = useId();
	const svg = useRef<SVGSVGElement>(null);

	// Pulses run on the Web Animations API so they can pause offscreen and in hidden tabs.
	useEffect(() => {
		const el = svg.current;
		if (!el || geometry.length === 0) return;
		if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const animations = [...el.querySelectorAll<SVGPathElement>("[data-beam-pulse]")].map(
			(path, i) => {
				const length = path.getTotalLength();
				path.style.strokeDasharray = pulseDasharray(length);
				const beam = geometry[i];
				return path.animate(pulseKeyframes(length), {
					duration: beam?.duration,
					delay: beam?.delay,
					iterations: Number.POSITIVE_INFINITY,
					easing: "cubic-bezier(0.45, 0, 0.55, 1)",
					fill: "backwards",
				});
			},
		);
		let visible = true;
		const sync = () => {
			const run = visible && !document.hidden;
			for (const a of animations) {
				if (run) a.play();
				else a.pause();
			}
		};
		const io = new IntersectionObserver((entries) => {
			visible = entries.some((e) => e.isIntersecting);
			sync();
		});
		io.observe(el);
		document.addEventListener("visibilitychange", sync);
		return () => {
			io.disconnect();
			document.removeEventListener("visibilitychange", sync);
			for (const a of animations) a.cancel();
		};
	}, [geometry]);

	return (
		<svg
			ref={svg}
			aria-hidden="true"
			data-slot="animated-beam-beams"
			className={cn(styles.svg(), className)}
		>
			<defs>
				{geometry.map((beam, i) => (
					<linearGradient
						key={beam.key}
						id={`${uid}-beam-${i}`}
						gradientUnits="userSpaceOnUse"
						x1={beam.start.x}
						y1={beam.start.y}
						x2={beam.end.x}
						y2={beam.end.y}
					>
						<stop offset="0%" style={{ stopColor: "var(--beam-a)" }} stopOpacity={0} />
						<stop offset="45%" style={{ stopColor: "var(--beam-a)" }} />
						<stop offset="100%" style={{ stopColor: "var(--beam-b)" }} />
					</linearGradient>
				))}
			</defs>
			{geometry.map((beam, i) => (
				<g key={beam.key}>
					<path
						ref={(element) => registerPath(beam.key, "track", element)}
						d={beam.d}
						className={styles.track()}
					/>
					<path
						ref={(element) => registerPath(beam.key, "pulse", element)}
						data-beam-pulse=""
						d={beam.d}
						stroke={`url(#${uid}-beam-${i})`}
						className={styles.pulse()}
					/>
				</g>
			))}
		</svg>
	);
}

export interface AnimatedBeamNodesProps {
	/** Show each node's label under its mark; otherwise labels are for screen readers only. */
	showLabels?: boolean;
	/** Accessible name of the node list. */
	label?: string;
	className?: string;
}

/** The nodes as a labelled list: the hub in the middle (or at the end of a row). */
export function AnimatedBeamNodes({
	showLabels = false,
	label = "Integrations",
	className,
}: AnimatedBeamNodesProps) {
	const { layout, hub, satellites, styles, measure, registerSatellite } =
		useBeam("AnimatedBeamNodes");
	const positions = hubPositions(satellites.length);

	// Labels move node centres in a row, so beams re-measure when they toggle.
	useEffect(() => {
		void showLabels;
		measure();
	}, [showLabels, measure]);

	const mark = (node: AnimatedBeamNode, isCenter: boolean) => (
		<>
			<div
				data-beam-node={node.id}
				className={isCenter ? styles.center() : styles.node()}
			>
				{node.icon ??
					(node.src ? (
						<img src={node.src} alt="" draggable={false} className={styles.icon()} />
					) : null)}
			</div>
			<span className={showLabels ? styles.label() : "sr-only"}>{node.label}</span>
		</>
	);

	return (
		<ul
			aria-label={label}
			data-slot="animated-beam-nodes"
			className={cn(styles.list(), className)}
		>
			{layout === "hub" ? (
				<>
					{hub ? <li className={styles.hubItem()}>{mark(hub, true)}</li> : null}
					{satellites.map((node, i) => (
						<li
							key={node.id}
							ref={(element) => registerSatellite(node.id, element)}
							className={styles.satelliteItem()}
							style={
								{
									// The orbit writes these two variables every frame, so the
									// position never fights a React re-render.
									"--sx": positions[i]?.x ?? 50,
									"--sy": positions[i]?.y ?? 50,
									left: "calc(var(--sx) * 1%)",
									top: "calc(var(--sy) * 1%)",
								} as CSSProperties
							}
						>
							{mark(node, false)}
						</li>
					))}
				</>
			) : (
				<>
					{satellites.map((node, i) => (
						<li
							key={node.id}
							className={styles.satelliteItem()}
							style={{ gridRow: i + 1 }}
						>
							{mark(node, false)}
						</li>
					))}
					{hub ? (
						<li
							className={styles.hubItem()}
							style={{ gridRow: `1 / span ${Math.max(1, satellites.length)}` }}
						>
							{mark(hub, true)}
						</li>
					) : null}
				</>
			)}
		</ul>
	);
}
