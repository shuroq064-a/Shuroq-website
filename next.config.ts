import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
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
  // Keep all legacy static pages reachable at their original clean URLs.
  // These map clean paths (e.g. /careers/) to the static files in public/.
  // Marked temporary so they can be removed as pages are migrated to Next.js routes.
  // /about and /careers are now Next.js routes (app/about/page.tsx,
  // app/careers/page.tsx) so they have no redirect.
  // Keep their legacy .html URLs working as aliases to the new pages.
  async redirects() {
    return [
      { source: "/about/index.html", destination: "/about", permanent: false },
      { source: "/careers/index.html", destination: "/careers", permanent: false },
      { source: "/shuroq-way", destination: "/shuroq-way/index.html", permanent: false },
      { source: "/shuroq-way/", destination: "/shuroq-way/index.html", permanent: false },
      { source: "/contact", destination: "/contact/index.html", permanent: false },
      { source: "/contact/", destination: "/contact/index.html", permanent: false },
      { source: "/services", destination: "/services/index.html", permanent: false },
      { source: "/services/", destination: "/services/index.html", permanent: false },
      { source: "/cutting-edge", destination: "/cutting-edge/index.html", permanent: false },
      { source: "/cutting-edge/", destination: "/cutting-edge/index.html", permanent: false },
      { source: "/assurance", destination: "/assurance/index.html", permanent: false },
      { source: "/assurance/", destination: "/assurance/index.html", permanent: false },
      { source: "/automate", destination: "/automate/index.html", permanent: false },
      { source: "/automate/", destination: "/automate/index.html", permanent: false },
      {
        source: "/Data Analytics",
        destination: "/Data Analytics/index.html",
        permanent: false,
      },
      {
        source: "/Data Analytics/",
        destination: "/Data Analytics/index.html",
        permanent: false,
      },
      { source: "/industries", destination: "/industries/index.html", permanent: false },
      { source: "/industries/", destination: "/industries/index.html", permanent: false },
      {
        source: "/product-engineering",
        destination: "/product-engineering/index.html",
        permanent: false,
      },
      {
        source: "/product-engineering/",
        destination: "/product-engineering/index.html",
        permanent: false,
      },
      { source: "/cloud-native", destination: "/cloud-native/index.html", permanent: false },
      { source: "/cloud-native/", destination: "/cloud-native/index.html", permanent: false },
      { source: "/faas", destination: "/faas/index.html", permanent: false },
      { source: "/faas/", destination: "/faas/index.html", permanent: false },
      { source: "/monolith", destination: "/monolith/index.html", permanent: false },
      { source: "/monolith/", destination: "/monolith/index.html", permanent: false },
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
      { source: "/backstage", destination: "/backstage/index.html", permanent: false },
      { source: "/backstage/", destination: "/backstage/index.html", permanent: false },
      { source: "/ci-cd-dev", destination: "/ci-cd-dev/index.html", permanent: false },
      { source: "/ci-cd-dev/", destination: "/ci-cd-dev/index.html", permanent: false },
      {
        source: "/progressive-delivery",
        destination: "/progressive-delivery/index.html",
        permanent: false,
      },
      {
        source: "/progressive-delivery/",
        destination: "/progressive-delivery/index.html",
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
      { source: "/service-mesh", destination: "/service-mesh/index.html", permanent: false },
      { source: "/service-mesh/", destination: "/service-mesh/index.html", permanent: false },
      {
        source: "/cloud-native-network",
        destination: "/cloud-native-network/index.html",
        permanent: false,
      },
      {
        source: "/cloud-native-network/",
        destination: "/cloud-native-network/index.html",
        permanent: false,
      },
      { source: "/linkerd-services", destination: "/linkerd-services/index.html", permanent: false },
      { source: "/linkerd-services/", destination: "/linkerd-services/index.html", permanent: false },
      { source: "/terraform", destination: "/terraform/index.html", permanent: false },
      { source: "/terraform/", destination: "/terraform/index.html", permanent: false },
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
      { source: "/grafana", destination: "/grafana/index.html", permanent: false },
      { source: "/grafana/", destination: "/grafana/index.html", permanent: false },
      { source: "/prometheus", destination: "/prometheus/index.html", permanent: false },
      { source: "/prometheus/", destination: "/prometheus/index.html", permanent: false },
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
