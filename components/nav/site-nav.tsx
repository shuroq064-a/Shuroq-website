"use client";

import * as React from "react";
import { flushSync } from "react-dom";
import Link from "next/link";
import { useTheme } from "next-themes";

import {
  MotionNavigationMenu,
  MotionNavigationMenuContent,
  MotionNavigationMenuItem,
  MotionNavigationMenuLink,
  MotionNavigationMenuList,
  MotionNavigationMenuTrigger,
} from "@/components/unlumen-ui/motion-navigation-menu";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { ThemeSwitch, type ThemeSwitchVariant } from "@/components/arc/theme-switch/theme-switch";
import { useBackdropTone } from "@/hooks/use-backdrop-tone";

export default function SiteNav() {
  const { resolvedTheme, setTheme } = useTheme();
  const navRef = React.useRef<HTMLDivElement>(null);
  const { tone, ready: toneReady } = useBackdropTone(navRef, resolvedTheme === "dark" ? "dark" : "light");
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // The switch only reports the change. Stamp the variant on <html> so the
  // matching snapshot animation in globals.css runs, then clear it.
  const themeTransition = React.useRef<ReturnType<typeof document.startViewTransition> | null>(null);
  const changeTheme = (next: "light" | "dark", variant: ThemeSwitchVariant, trigger: HTMLElement) => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !document.startViewTransition) {
      setTheme(next);
      return;
    }
    const { left, top, width, height } = trigger.getBoundingClientRect();
    const root = document.documentElement;
    root.style.setProperty("--x", `${left + width / 2}px`);
    root.style.setProperty("--y", `${top + height / 2}px`);
    root.dataset.themeMotion = variant;
    themeTransition.current?.skipTransition();
    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(next));
    });
    themeTransition.current = transition;
    // A skipped transition rejects `ready`; handle it so a fast double press
    // never surfaces an unhandled AbortError.
    void transition.ready.catch(() => {});
    void transition.updateCallbackDone.catch(() => {});
    const clear = () => {
      if (themeTransition.current !== transition) return;
      themeTransition.current = null;
      delete root.dataset.themeMotion;
    };
    void transition.finished.then(clear, clear);
  };

  const companyLinks = [
    { href: "/about/", label: "About Us" },
    { href: "/careers/", label: "Careers" },
    { href: "/shuroq-way/", label: "The Shuroq Way" },
    { href: "/contact/", label: "Contact Us" },
  ];

  const serviceGroups = [
    {
      title: "SERVICES",
      links: [
        { href: "/services/", label: "All Services" },
        { href: "/cutting-edge", label: "Cutting Edge" },
        { href: "/assurance/", label: "Assurance" },
        { href: "/automate", label: "Automate" },
        { href: "/Data%20Analytics/", label: "Data Analytics" },
      ],
    },
    {
      title: "INDUSTRIES",
      links: [
        { href: "/industries/", label: "Industries" },
        { href: "/industries/#telecom", label: "Telecom" },
        { href: "/industries/#automotive", label: "Automotive" },
        { href: "/industries/#bfsi", label: "BFSI" },
        { href: "/industries/#healthcare", label: "Healthcare" },
        { href: "/industries/#finance", label: "Finance" },
      ],
    },
    {
      title: "PRODUCT ENGINEERING",
      links: [
        { href: "/product-engineering/", label: "Product Engineering Services" },
        { href: "/cloud-native/", label: "Cloud Native Product Development" },
        { href: "/faas/", label: "FaaS" },
        { href: "/monolith/", label: "Monolith Microservice" },
      ],
    },
    {
      title: "PLATFORM ENGINEERING",
      links: [
        { href: "/platformengineering/", label: "Platform Engineering" },
        { href: "/platform-services/", label: "Platform Engineering Services" },
        { href: "/backstage/", label: "Backstage Consulting" },
        { href: "/ci-cd-dev/", label: "CI/CD & Dev Experience" },
        { href: "/progressive-delivery/", label: "Progressive Delivery" },
      ],
    },
    {
      title: "SITE RELIABILITY ENGINEERING",
      links: [
        { href: "/sre-consultancy/", label: "SRE Consultancy" },
        { href: "/service-mesh/", label: "Service Mesh Consulting" },
        { href: "/cloud-native-network/", label: "Cloud Native Network" },
        { href: "/linkerd-services/", label: "Linkerd Consulting" },
        { href: "/terraform/", label: "Terraform Consulting" },
      ],
    },
    {
      title: "OBSERVABILITY & DEVSECOPS",
      links: [
        { href: "/devsec-ops/", label: "DevSecOps Consult" },
        { href: "/observability-consult/", label: "Observability and Adoption" },
        { href: "/grafana/", label: "Grafana Consulting" },
        { href: "/prometheus/", label: "Prometheus Consulting" },
      ],
    },
  ];

  const solutionsLinks = [
    { href: "/fission/", label: "AI Marketplace" },
    { href: "/botkube/", label: "Botkube Enterprise" },
    { href: "/kubernetes-services/", label: "Managed Services for Kubernetes" },
  ];

  const resourcesLinks = [
    { href: "/resources/", label: "Resources" },
    { href: "/blogs/blogs.html", label: "Blogs" },
    { href: "/events/", label: "Events" },
    { href: "/skill-rubrics/", label: "Skill Rubrics" },
  ];

  return (
    <nav className="nav">
      <LiquidGlass
        ref={navRef}
        data-tone={tone ?? undefined}
        data-tone-ready={toneReady ? "true" : "false"}
        blur={6}
        className="nav-container nav-glass flex items-center justify-between h-12 w-[calc(100vw-32px)] max-w-[900px] mx-auto mb-3 rounded-full"
        style={{ padding: "0 16px" }}
      >
        {/* Left spacer keeps the menu optically centred in the bar */}
        <div className="hidden md:block" style={{ flex: 1 }} aria-hidden="true" />

        {/* Desktop motion menu */}
        <div className="hidden md:flex" style={{ justifyContent: "center" }}>
          <MotionNavigationMenu
            viewportClassName="border-none shadow-none"
            springStiffness={350}
            springDamping={54}
            springBounce={0}
          >
            <MotionNavigationMenuList>
              {/* Home — standalone link, kept separate from the About Us menu */}
              <MotionNavigationMenuItem value="home">
                <MotionNavigationMenuLink
                  href="/"
                  className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-neutral-900 hover:text-neutral-900 focus:text-neutral-900"
                >
                  Home
                </MotionNavigationMenuLink>
              </MotionNavigationMenuItem>

              {/* About Us */}
              <MotionNavigationMenuItem value="about">
                <MotionNavigationMenuTrigger>About Us</MotionNavigationMenuTrigger>
                <MotionNavigationMenuContent>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 220 }}>
                    {companyLinks.map((l) => (
                      <MotionNavigationMenuLink key={l.href} href={l.href}>
                        <span style={{ fontSize: 15 }}>{l.label}</span>
                      </MotionNavigationMenuLink>
                    ))}
                  </div>
                </MotionNavigationMenuContent>
              </MotionNavigationMenuItem>

              {/* Services */}
              <MotionNavigationMenuItem value="services">
                <MotionNavigationMenuTrigger>Services</MotionNavigationMenuTrigger>
                <MotionNavigationMenuContent>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(6, minmax(0, 1fr))", gap: 12, maxWidth: 760, padding: 12 }}>
                    {serviceGroups.map((g) => (
                      <div key={g.title} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                        <span className="text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
                          {g.title}
                        </span>
                        {g.links.map((l) => (
                          <MotionNavigationMenuLink key={l.href} href={l.href}>
                            <span style={{ fontSize: 13 }}>{l.label}</span>
                          </MotionNavigationMenuLink>
                        ))}
                      </div>
                    ))}
                  </div>
                </MotionNavigationMenuContent>
              </MotionNavigationMenuItem>

              {/* Solutions */}
              <MotionNavigationMenuItem value="solutions">
                <MotionNavigationMenuTrigger>Solutions</MotionNavigationMenuTrigger>
                <MotionNavigationMenuContent>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, minWidth: 260 }}>
                    {solutionsLinks.map((l) => (
                      <MotionNavigationMenuLink key={l.href} href={l.href}>
                        <span style={{ fontSize: 15 }}>{l.label}</span>
                      </MotionNavigationMenuLink>
                    ))}
                  </div>
                </MotionNavigationMenuContent>
              </MotionNavigationMenuItem>

              {/* Resources */}
              <MotionNavigationMenuItem value="resources">
                <MotionNavigationMenuTrigger>Resources</MotionNavigationMenuTrigger>
                <MotionNavigationMenuContent>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, minWidth: 220 }}>
                    {resourcesLinks.map((l) => (
                      <MotionNavigationMenuLink key={l.href} href={l.href}>
                        <span style={{ fontSize: 15 }}>{l.label}</span>
                      </MotionNavigationMenuLink>
                    ))}
                  </div>
                </MotionNavigationMenuContent>
              </MotionNavigationMenuItem>

            </MotionNavigationMenuList>
          </MotionNavigationMenu>
        </div>

        {/* Right side: social + theme + lang + mobile */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, justifyContent: "flex-end" }}>
          <span className="nav-theme-toggle">
            <ThemeSwitch
              theme={resolvedTheme === "dark" ? "dark" : "light"}
              iconOnly
              variant="rise"
              onThemeChange={changeTheme}
            />
          </span>

          <button className="mobile-menu-btn md:hidden" onClick={() => setMobileOpen((o) => !o)} style={{ background: "transparent", border: "none", fontSize: 20, cursor: "pointer", color: "var(--nav-fg)" }}>
            ☰
          </button>
        </div>
      </LiquidGlass>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden" style={{ borderTop: "1px solid var(--border)", padding: "12px 16px", background: "var(--bg)", maxHeight: "70vh", overflowY: "auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Link href="/" style={{ padding: "8px 0", fontWeight: 600 }}>Home</Link>
            <details style={{ marginTop: 8 }}>
              <summary style={{ padding: "8px 0", fontWeight: 600, cursor: "pointer", color: "var(--fg)" }}>Company</summary>
              {companyLinks.map((l) => (
                <Link key={l.href} href={l.href} style={{ padding: "6px 0 6px 16px", display: "block", color: "var(--fg)", fontSize: 14 }}>{l.label}</Link>
              ))}
            </details>
            <details style={{ marginTop: 8 }}>
              <summary style={{ padding: "8px 0", fontWeight: 600, cursor: "pointer", color: "var(--fg)" }}>Services</summary>
              {serviceGroups.map((g) => (
                <div key={g.title} style={{ paddingLeft: 16 }}>
                  <div style={{ padding: "6px 0", fontWeight: 500, fontSize: 13, color: "var(--muted)" }}>{g.title}</div>
                  {g.links.map((l) => (
                    <Link key={l.href} href={l.href} style={{ padding: "4px 0 4px 12px", display: "block", color: "var(--fg)", fontSize: 14 }}>{l.label}</Link>
                  ))}
                </div>
              ))}
            </details>
            <details style={{ marginTop: 8 }}>
              <summary style={{ padding: "8px 0", fontWeight: 600, cursor: "pointer", color: "var(--fg)" }}>Solutions</summary>
              {solutionsLinks.map((l) => (
                <Link key={l.href} href={l.href} style={{ padding: "6px 0 6px 16px", display: "block", color: "var(--fg)", fontSize: 14 }}>{l.label}</Link>
              ))}
            </details>
            <details style={{ marginTop: 8 }}>
              <summary style={{ padding: "8px 0", fontWeight: 600, cursor: "pointer", color: "var(--fg)" }}>Resources</summary>
              {resourcesLinks.map((l) => (
                <Link key={l.href} href={l.href} style={{ padding: "6px 0 6px 16px", display: "block", color: "var(--fg)", fontSize: 14 }}>{l.label}</Link>
              ))}
            </details>
          </div>
        </div>
      )}
    </nav>
  );
}