import type { NextConfig } from "next";
import { wgslTurbopackRule } from "@vgpu/wgsl/next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // The card posters are swapped in place at the same file name, so they carry
  // a version query (?v=2) to drop the browser's cached copy. next/image only
  // allows query strings on local paths that match one of these patterns. Omit
  // the search pattern so any version query is allowed (a specific value like
  // "?v=2" would have to be bumped in lock-step with the URL).
  images: {
    // Allow any public asset (logo.png, images/**, animated-footer/*, ...).
    // The card posters add a ?v=2 cache-busting query, which requires an
    // entry; allowing "/**" keeps the default permissive behaviour.
    localPatterns: [{ pathname: "/**" }],
  },
  turbopack: {
    rules: {
      // The hero word flare is a WebGPU pipeline, so the WGSL shaders are
      // compiled into shader sources at build time.
      "*.wgsl": wgslTurbopackRule(),
      // Tailwind v4 has no PostCSS config here, so global stylesheets go through
      // its Turbopack loader. `.module.css` files are plain scoped CSS, so they
      // use Turbopack's built-in CSS-module type instead — routing them through
      // `as: "*.css"` would flatten their class names to empty strings.
      "*.css": {
        condition: { not: { path: /\.module\.css$/ } },
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Keep legacy static pages reachable at clean URLs, while redirecting retired
  // specialist pages to their consolidated core service destinations.
  // /about, /careers, /shuroq-way, /contact and /services are now Next.js routes
  // so they have no clean-path redirect.
  // Keep their legacy .html URLs working as aliases to the new pages.
  async redirects() {
    return [
      { source: "/about/index.html", destination: "/about", permanent: false },
      { source: "/careers/index.html", destination: "/careers", permanent: false },
      { source: "/shuroq-way/index.html", destination: "/shuroq-way", permanent: false },
      { source: "/contact/index.html", destination: "/contact", permanent: false },
      { source: "/services/index.html", destination: "/services", permanent: false },
      { source: "/cutting-edge/index.html", destination: "/cutting-edge", permanent: false },
      { source: "/assurance/index.html", destination: "/assurance", permanent: false },
      { source: "/automate/index.html", destination: "/automate", permanent: false },
      {
        source: "/Data Analytics",
        destination: "/data-analytics",
        permanent: false,
      },
      {
        source: "/Data Analytics/",
        destination: "/data-analytics",
        permanent: false,
      },
      {
        source: "/Data Analytics/index.html",
        destination: "/data-analytics",
        permanent: false,
      },
      {
        source: "/Data%20Analytics",
        destination: "/data-analytics",
        permanent: false,
      },
      {
        source: "/Data%20Analytics/",
        destination: "/data-analytics",
        permanent: false,
      },
      {
        source: "/Data%20Analytics/index.html",
        destination: "/data-analytics",
        permanent: false,
      },
      // Product engineering and cloud native are Next.js routes; keep the old
      // .html URLs as aliases and point retired specialist pages at the routes.
      { source: "/product-engineering/index.html", destination: "/product-engineering", permanent: false },
      { source: "/cloud-native/index.html", destination: "/cloud-native", permanent: false },
      { source: "/faas", destination: "/product-engineering", permanent: false },
      { source: "/faas/", destination: "/product-engineering", permanent: false },
      { source: "/faas/index.html", destination: "/product-engineering", permanent: false },
      { source: "/monolith", destination: "/product-engineering", permanent: false },
      { source: "/monolith/", destination: "/product-engineering", permanent: false },
      { source: "/monolith/index.html", destination: "/product-engineering", permanent: false },
      {
        source: "/platformengineering",
        destination: "/platformengineering/index.html",
        permanent: false,
      },
      {
        source: "/platformengineering/",
        destination: "/platformengineering/index.html",
        permanent: false,
      },
      {
        source: "/platform-services",
        destination: "/platform-services/index.html",
        permanent: false,
      },
      {
        source: "/platform-services/",
        destination: "/platform-services/index.html",
        permanent: false,
      },
      { source: "/backstage", destination: "/platformengineering/index.html#backstage", permanent: false },
      { source: "/backstage/", destination: "/platformengineering/index.html#backstage", permanent: false },
      { source: "/backstage/index.html", destination: "/platformengineering/index.html#backstage", permanent: false },
      { source: "/ci-cd-dev", destination: "/ci-cd-dev/index.html", permanent: false },
      { source: "/ci-cd-dev/", destination: "/ci-cd-dev/index.html", permanent: false },
      {
        source: "/progressive-delivery",
        destination: "/platformengineering/index.html#progressive-delivery",
        permanent: false,
      },
      {
        source: "/progressive-delivery/",
        destination: "/platformengineering/index.html#progressive-delivery",
        permanent: false,
      },
      {
        source: "/progressive-delivery/index.html",
        destination: "/platformengineering/index.html#progressive-delivery",
        permanent: false,
      },
      {
        source: "/site_reliability_engineering",
        destination: "/site_reliability_engineering.html",
        permanent: false,
      },
      {
        source: "/site_reliability_engineering.html",
        destination: "/site_reliability_engineering.html",
        permanent: false,
      },
      { source: "/sre-consultancy", destination: "/sre-consultancy/index.html", permanent: false },
      { source: "/sre-consultancy/", destination: "/sre-consultancy/index.html", permanent: false },
      { source: "/service-mesh", destination: "/sre-consultancy/index.html", permanent: false },
      { source: "/service-mesh/", destination: "/sre-consultancy/index.html", permanent: false },
      { source: "/service-mesh/index.html", destination: "/sre-consultancy/index.html", permanent: false },
      {
        source: "/cloud-native-network",
        destination: "/sre-consultancy/index.html",
        permanent: false,
      },
      {
        source: "/cloud-native-network/",
        destination: "/sre-consultancy/index.html",
        permanent: false,
      },
      { source: "/cloud-native-network/index.html", destination: "/sre-consultancy/index.html", permanent: false },
      { source: "/linkerd-services", destination: "/sre-consultancy/index.html", permanent: false },
      { source: "/linkerd-services/", destination: "/sre-consultancy/index.html", permanent: false },
      { source: "/linkerd-services/index.html", destination: "/sre-consultancy/index.html", permanent: false },
      { source: "/terraform", destination: "/sre-consultancy/index.html", permanent: false },
      { source: "/terraform/", destination: "/sre-consultancy/index.html", permanent: false },
      { source: "/terraform/index.html", destination: "/sre-consultancy/index.html", permanent: false },
      {
        source: "/observability_devsecops",
        destination: "/observability_devsecops.html",
        permanent: false,
      },
      {
        source: "/observability_devsecops.html",
        destination: "/observability_devsecops.html",
        permanent: false,
      },
      { source: "/devsec-ops", destination: "/devsec-ops/index.html", permanent: false },
      { source: "/devsec-ops/", destination: "/devsec-ops/index.html", permanent: false },
      {
        source: "/observability-consult",
        destination: "/observability-consult/index.html",
        permanent: false,
      },
      {
        source: "/observability-consult/",
        destination: "/observability-consult/index.html",
        permanent: false,
      },
      { source: "/grafana", destination: "/observability-consult/index.html", permanent: false },
      { source: "/grafana/", destination: "/observability-consult/index.html", permanent: false },
      { source: "/grafana/index.html", destination: "/observability-consult/index.html", permanent: false },
      { source: "/prometheus", destination: "/observability-consult/index.html", permanent: false },
      { source: "/prometheus/", destination: "/observability-consult/index.html", permanent: false },
      { source: "/prometheus/index.html", destination: "/observability-consult/index.html", permanent: false },
      { source: "/fission", destination: "/fission/index.html", permanent: false },
      { source: "/fission/", destination: "/fission/index.html", permanent: false },
      { source: "/botkube", destination: "/botkube/index.html", permanent: false },
      { source: "/botkube/", destination: "/botkube/index.html", permanent: false },
      {
        source: "/kubernetes-services",
        destination: "/kubernetes-services/index.html",
        permanent: false,
      },
      {
        source: "/kubernetes-services/",
        destination: "/kubernetes-services/index.html",
        permanent: false,
      },
      { source: "/resources", destination: "/resources/index.html", permanent: false },
      { source: "/resources/", destination: "/resources/index.html", permanent: false },
      { source: "/blogs/blogs", destination: "/blogs/blogs.html", permanent: false },
      { source: "/blogs/blogs.html", destination: "/blogs/blogs.html", permanent: false },
      { source: "/events", destination: "/events/index.html", permanent: false },
      { source: "/events/", destination: "/events/index.html", permanent: false },
      { source: "/skill-rubrics", destination: "/skill-rubrics/index.html", permanent: false },
      { source: "/skill-rubrics/", destination: "/skill-rubrics/index.html", permanent: false },

    ];
  },
};

export default nextConfig;
