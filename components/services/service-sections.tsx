import { Timeline } from "@/components/ui/timeline";
import { ArcAccordion } from "@/components/arc/accordion/accordion";
import { ActivityHeatmap } from "@/components/arc/activity-heatmap/activity-heatmap";
import { Badge } from "@/components/arc/badge/badge";
import { BarChart } from "@/components/arc/bar-chart/bar-chart";
import { Card } from "@/components/arc/card/card";
import { CodeBlock } from "@/components/arc/code-block/code-block";
import { ComparisonTable } from "@/components/arc/blocks/comparison-table/comparison-table";
import { CtaSection } from "@/components/arc/blocks/cta-section/cta-section";
import { FaqSection } from "@/components/arc/blocks/faq-section/faq-section";
import { StatsBand } from "@/components/arc/blocks/stats-band/stats-band";
import { Carousel } from "@/components/arc/carousel/carousel";
import { DonutChart } from "@/components/arc/donut-chart/donut-chart";
import { ExpandableCard } from "@/components/arc/expandable-card/expandable-card";
import { Gauge } from "@/components/arc/gauge/gauge";
import { HoverCard } from "@/components/arc/hover-card/hover-card";
import { LineChart } from "@/components/arc/line-chart/line-chart";
import { MetricCard } from "@/components/arc/metric-card/metric-card";
import { OnboardingChecklist } from "@/components/arc/onboarding-checklist/onboarding-checklist";
import { Progress } from "@/components/arc/progress/progress";
import { RadioCards } from "@/components/arc/radio-cards/radio-cards";
import { Ridgeline } from "@/components/arc/ridgeline/ridgeline";
import { Sparkline } from "@/components/arc/sparkline/sparkline";
import { Stepper } from "@/components/arc/stepper/stepper";
import { Streamgraph } from "@/components/arc/streamgraph/streamgraph";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/arc/tabs/tabs";
import { TreeView, type TreeNode } from "@/components/arc/tree-view/tree-view";
import { WaffleChart } from "@/components/arc/waffle-chart/waffle-chart";

import type {
  PlatformServiceData,
  ServiceSectionKind,
} from "./platform-service-content";
import { ServiceIcon } from "./service-icons";
import { SlopeFigure } from "./slope-figure";
import { ToolsChipFilter } from "./tools-chip-filter";
import { UseCaseDeck } from "./use-case-deck";
import styles from "./platform-service-page.module.css";

/**
 * One service page, built from the sections its own recipe names. Each page
 * picks a different set of sections and a different order, so the five service
 * pages never read as five copies of the same page.
 */
export function ServiceSections({
  service,
}: {
  service: PlatformServiceData;
}) {
  return (
    <>
      {service.sections.map((kind) => (
        <ServiceSection key={kind} kind={kind} service={service} />
      ))}
    </>
  );
}

function ServiceSection({
  kind,
  service,
}: {
  kind: ServiceSectionKind;
  service: PlatformServiceData;
}) {
  switch (kind) {
    /* ------------------------------------------------------- intro + grid */
    case "highlights":
      return (
        <section className={styles.intro} aria-labelledby={`${service.slug}-intro`}>
          <div className={`container ${styles.introInner}`}>
            <header className={styles.sectionHeading}>
              <h2 id={`${service.slug}-intro`}>{service.intro.title}</h2>
              <p>{service.intro.description}</p>
            </header>
            <ul className={styles.highlightGrid}>
              {service.highlights.map((highlight) => (
                <li className={styles.highlight} key={highlight.title}>
                  <span className={styles.highlightIcon}>
                    <ServiceIcon name={highlight.icon} />
                  </span>
                  <h3>{highlight.title}</h3>
                  <p>{highlight.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      );

    /* ---------------------------------------------------------- stats band */
    case "stats":
      return (
        <section className={styles.statsWrap} aria-label="Key numbers">
          <div className="container">
            <StatsBand
              layout="divided"
              title={service.statsTitle}
              description={service.statsDescription}
              stats={service.stats}
            />
          </div>
        </section>
      );

    /* ------------------------------------------- capabilities as a card set */
    case "capabilityCards":
      return (
        <section
          className={styles.capabilities}
          aria-labelledby={`${service.slug}-capabilities`}
        >
          <div className="container">
            <header className={styles.sectionHeadingStandalone}>
              <h2 id={`${service.slug}-capabilities`}>
                {service.capabilitiesTitle}
              </h2>
              <p>{service.capabilitiesIntro}</p>
            </header>
            <div className={styles.capabilityStack}>
              {service.capabilities.map((capability, index) => (
                <article
                  className={styles.capabilityBlock}
                  key={capability.title}
                  id={capability.id}
                >
                  <div className={styles.capabilityCopy}>
                    <span className={styles.capabilityIndex}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3>{capability.title}</h3>
                      <p className={styles.capabilityLead}>{capability.lead}</p>
                      <p>{capability.description}</p>
                      <p>{capability.detail}</p>
                    </div>
                  </div>
                  <ul className={styles.capabilityItems}>
                    {capability.items.map((item) => (
                      <li key={item.title}>
                        <Card
                          title={item.title}
                          description={item.description}
                          details={
                            <p>
                              Delivered as part of{" "}
                              {capability.title.toLowerCase()}, with the
                              configuration, the runbook and the handover
                              included in the same stage.
                            </p>
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
      );

    /* ------------------------------------------- capabilities as open tabs */
    case "capabilityTabs":
      return (
        <section
          className={styles.capabilities}
          aria-labelledby={`${service.slug}-capabilities`}
        >
          <div className="container">
            <header className={styles.sectionHeadingStandalone}>
              <h2 id={`${service.slug}-capabilities`}>
                {service.capabilitiesTitle}
              </h2>
              <p>{service.capabilitiesIntro}</p>
            </header>
            <Tabs defaultValue={service.capabilities[0]?.title} className={styles.capabilityTabs}>
              <TabsList className={styles.capabilityTabList}>
                {service.capabilities.map((capability) => (
                  <TabsTrigger key={capability.title} value={capability.title}>
                    {capability.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              {service.capabilities.map((capability, index) => (
                <TabsContent
                  key={capability.title}
                  value={capability.title}
                  className={styles.capabilityTabPanel}
                >
                  <div className={styles.capabilityTabCopy}>
                    <span className={styles.capabilityIndex}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3>{capability.title}</h3>
                    <p className={styles.capabilityLead}>{capability.lead}</p>
                    <p>{capability.description}</p>
                    <p>{capability.detail}</p>
                  </div>
                  <ul className={styles.capabilityItems}>
                    {capability.items.map((item) => (
                      <li key={item.title}>
                        <Card
                          title={item.title}
                          description={item.description}
                          details={
                            <p>
                              Delivered as part of{" "}
                              {capability.title.toLowerCase()}, with the
                              configuration, the runbook and the handover
                              included in the same stage.
                            </p>
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      );

    /* --------------------------------------- capabilities as an accordion */
    case "capabilityAccordion":
      return (
        <section
          className={styles.capabilities}
          aria-labelledby={`${service.slug}-capabilities`}
        >
          <div className="container">
            <header className={styles.sectionHeadingStandalone}>
              <h2 id={`${service.slug}-capabilities`}>
                {service.capabilitiesTitle}
              </h2>
              <p>{service.capabilitiesIntro}</p>
            </header>
            <div className={styles.capabilityAccordion}>
              <ArcAccordion
                defaultOpen={0}
                size="lg"
                items={service.capabilities.map((capability) => ({
                  title: capability.title,
                  content: (
                    <div className={styles.accordionBody}>
                      <p className={styles.capabilityLead}>{capability.lead}</p>
                      <p>{capability.description}</p>
                      <p>{capability.detail}</p>
                      <ul className={styles.accordionList}>
                        {capability.items.map((item) => (
                          <li key={item.title}>
                            <strong>{item.title}</strong>
                            <span>{item.description}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ),
                }))}
              />
            </div>
          </div>
        </section>
      );

    /* -------------------------------------- capabilities as a spec sheet */
    case "capabilitySpec":
      return (
        <section
          className={styles.capabilities}
          aria-labelledby={`${service.slug}-capabilities`}
        >
          <div className="container">
            <header className={styles.sectionHeadingStandalone}>
              <h2 id={`${service.slug}-capabilities`}>
                {service.capabilitiesTitle}
              </h2>
              <p>{service.capabilitiesIntro}</p>
            </header>
            <div className={styles.specSheet}>
              {service.capabilities.map((capability, index) => (
                <article className={styles.specRow} key={capability.title}>
                  <div className={styles.specHead}>
                    <span className={styles.capabilityIndex}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3>{capability.title}</h3>
                    <p className={styles.capabilityLead}>{capability.lead}</p>
                    <p>{capability.detail}</p>
                  </div>
                  <dl className={styles.specList}>
                    {capability.items.map((item) => (
                      <div className={styles.specItem} key={item.title}>
                        <dt>{item.title}</dt>
                        <dd>{item.description}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </section>
      );

    /* -------------------------------------- capabilities as open columns */
    case "capabilityColumns":
      return (
        <section
          className={styles.capabilities}
          aria-labelledby={`${service.slug}-capabilities`}
        >
          <div className="container">
            <header className={styles.sectionHeadingStandalone}>
              <h2 id={`${service.slug}-capabilities`}>
                {service.capabilitiesTitle}
              </h2>
              <p>{service.capabilitiesIntro}</p>
            </header>
            <div className={styles.capabilityColumns}>
              {service.capabilities.map((capability, index) => (
                <article
                  className={styles.capabilityColumn}
                  key={capability.title}
                >
                  <span className={styles.capabilityIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{capability.title}</h3>
                  <p className={styles.capabilityLead}>{capability.lead}</p>
                  <p>{capability.description}</p>
                  <ul className={styles.capabilityColumnList}>
                    {capability.items.map((item) => (
                      <li key={item.title}>{item.title}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
      );

    /* ------------------------------------------------------- the catalog */
    case "catalog": {
      const catalog = service.catalog;
      if (!catalog) return null;
      const nodes: TreeNode[] = catalog.roots.map((root) => ({
        id: root.id,
        label: root.label,
        children: root.children?.map((child) => ({
          id: child.id,
          label: child.label,
        })),
      }));
      return (
        <section className={styles.chartSection} aria-labelledby={`${service.slug}-catalog`}>
          <div className={`container ${styles.chartInner}`}>
            <header className={styles.sectionHeading}>
              <h2 id={`${service.slug}-catalog`}>{catalog.title}</h2>
              <p>{catalog.description}</p>
            </header>
            <div className={styles.catalogPanel}>
              <TreeView
                nodes={nodes}
                defaultExpandedIds={catalog.roots.map((root) => root.id)}
                aria-label={`${catalog.title} — ${service.title}`}
              />
            </div>
          </div>
        </section>
      );
    }

    /* ------------------------------------------------------ before/after */
    case "slope": {
      const slope = service.slope;
      if (!slope) return null;
      return (
        <section className={styles.chartSection} aria-labelledby={`${service.slug}-slope`}>
          <div className={`container ${styles.chartInner}`}>
            <header className={styles.sectionHeading}>
              <h2 id={`${service.slug}-slope`}>{slope.title}</h2>
              <p>{slope.description}</p>
            </header>
            <div className={styles.chartPanel}>
              <SlopeFigure
                data={slope.items}
                label={slope.label}
                startLabel={slope.startLabel}
                endLabel={slope.endLabel}
                unit="min"
              />
            </div>
          </div>
        </section>
      );
    }

    /* ------------------------------------------------- distributions */
    case "ridges": {
      const ridges = service.ridges;
      if (!ridges) return null;
      return (
        <section className={styles.chartSection} aria-labelledby={`${service.slug}-ridges`}>
          <div className={`container ${styles.chartInner}`}>
            <header className={styles.sectionHeading}>
              <h2 id={`${service.slug}-ridges`}>{ridges.title}</h2>
              <p>{ridges.description}</p>
            </header>
            <div className={styles.chartPanel}>
              <Ridgeline
                series={ridges.series}
                label={ridges.label}
                unit={ridges.unit}
                tint
              />
            </div>
          </div>
        </section>
      );
    }

    /* ---------------------------------------------------- counted squares */
    case "waffle": {
      const waffle = service.waffle;
      if (!waffle) return null;
      return (
        <section className={styles.chartSection} aria-labelledby={`${service.slug}-waffle`}>
          <div className={`container ${styles.chartInner}`}>
            <header className={styles.sectionHeading}>
              <h2 id={`${service.slug}-waffle`}>{waffle.title}</h2>
              <p>{waffle.description}</p>
            </header>
            <div className={styles.chartPanel}>
              <WaffleChart data={waffle.data} label={waffle.label} unit="%" />
            </div>
          </div>
        </section>
      );
    }

    /* ----------------------------------------------------- traffic mix */
    case "stream": {
      const stream = service.stream;
      if (!stream) return null;
      return (
        <section className={styles.chartSection} aria-labelledby={`${service.slug}-stream`}>
          <div className={`container ${styles.chartInner}`}>
            <header className={styles.sectionHeading}>
              <h2 id={`${service.slug}-stream`}>{stream.title}</h2>
              <p>{stream.description}</p>
            </header>
            <div className={styles.chartPanel}>
              <Streamgraph
                data={stream.data}
                series={stream.series}
                label={stream.label}
                unit={stream.unit}
                offset="wiggle"
                directLabels
                categoryLabel="Week"
                height={280}
              />
            </div>
          </div>
        </section>
      );
    }

    /* ------------------------------------------------------------- code */
    case "code":
      return (
        <section className={styles.codeWrap} aria-labelledby={`${service.slug}-code`}>
          <div className={`container ${styles.codeInner}`}>
            <div className={styles.codeCopy}>
              <h2 id={`${service.slug}-code`}>Shape, not just scripts</h2>
              <p>{service.code.caption}</p>
            </div>
            <div className={styles.codeBlock}>
              <CodeBlock
                code={service.code.code}
                filename={service.code.filename}
                language={service.code.language}
                maxLines={26}
              />
            </div>
          </div>
        </section>
      );

    /* -------------------------------------------------------- metric cards */
    case "metrics":
      return (
        <section className={styles.metrics} aria-labelledby={`${service.slug}-metrics`}>
          <div className="container">
            <header className={styles.sectionHeadingStandalone}>
              <h2 id={`${service.slug}-metrics`}>{service.metricsTitle}</h2>
            </header>
            <ul className={styles.metricGrid}>
              {service.metrics.map((metric) => (
                <li key={metric.label}>
                  <MetricCard
                    label={metric.label}
                    value={metric.value}
                    suffix={metric.suffix}
                    context={metric.context}
                    change={metric.change}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      );

    /* --------------------------------------------- numbers as sparklines */
    case "sparklines":
      return (
        <section className={styles.metrics} aria-labelledby={`${service.slug}-metrics`}>
          <div className="container">
            <header className={styles.sectionHeadingStandalone}>
              <h2 id={`${service.slug}-metrics`}>{service.metricsTitle}</h2>
              <p>
                Each line is the measure over the first weeks of the
                engagement, not a target for later.
              </p>
            </header>
            <ul className={styles.sparkGrid}>
              {service.metrics.map((metric) => (
                <li className={styles.sparkCell} key={metric.label}>
                  <Sparkline
                    data={metric.spark ?? [metric.value]}
                    label={metric.label}
                    value={`${metric.value}${metric.suffix ?? ""}`}
                    change={metric.change}
                    tone="accent"
                    area
                    width={280}
                    height={76}
                  />
                  <p className={styles.sparkNote}>{metric.context}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      );

    /* ----------------------------------------------- numbers as progress */
    case "progress":
      return (
        <section className={styles.metrics} aria-labelledby={`${service.slug}-metrics`}>
          <div className="container">
            <header className={styles.sectionHeadingStandalone}>
              <h2 id={`${service.slug}-metrics`}>{service.metricsTitle}</h2>
              <p>
                Where the practice stands at the end of the engagement, and
                how far each habit has travelled from where it started.
              </p>
            </header>
            <ul className={styles.progressList}>
              {service.metrics.map((metric) => (
                <li className={styles.progressRow} key={metric.label}>
                  <div className={styles.progressCopy}>
                    <h3>{metric.label}</h3>
                    <p>
                      {metric.context}
                      {metric.change ? ` · ${metric.change}` : ""}
                    </p>
                  </div>
                  <Progress
                    value={metric.value}
                    label={metric.label}
                    showValue
                    className={styles.progressBar}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      );

    /* ----------------------------------------------------- targets as gauges */
    case "slo":
      return (
        <section className={styles.metrics} aria-labelledby={`${service.slug}-metrics`}>
          <div className="container">
            <header className={styles.sectionHeadingStandalone}>
              <h2 id={`${service.slug}-metrics`}>{service.metricsTitle}</h2>
              <p>
                Every number below is a target we agree with the business first,
                then hold ourselves to.
              </p>
            </header>
            <ul className={styles.gaugeGrid}>
              {service.metrics.map((metric) => (
                <li key={metric.label} className={styles.gaugeCell}>
                  <Gauge
                    value={metric.value}
                    label={metric.label}
                    detail={`${metric.context} · ${metric.change}`}
                    tone="accent"
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      );

    /* ------------------------------------------------------ latency trends */
    case "lineChart": {
      const chart = service.charts?.line;
      if (!chart) return null;
      return (
        <section className={styles.chartSection} aria-labelledby={`${service.slug}-chart`}>
          <div className={`container ${styles.chartInner}`}>
            <header className={styles.sectionHeading}>
              <h2 id={`${service.slug}-chart`}>The trend we are asked for</h2>
              <p>
                One week of real traffic, measured the way the service is
                actually observed rather than the way it is reported.
              </p>
            </header>
            <div className={styles.chartPanel}>
              <LineChart
                label={chart.label}
                unit={chart.unit}
                series={chart.series}
                data={chart.data}
                height={280}
                categoryLabel="Week"
              />
            </div>
          </div>
        </section>
      );
    }

    /* ------------------------------------------------------ pipeline history */
    case "barChart": {
      const chart = service.charts?.bar;
      if (!chart) return null;
      return (
        <section className={styles.chartSection} aria-labelledby={`${service.slug}-chart`}>
          <div className={`container ${styles.chartInner}`}>
            <header className={styles.sectionHeading}>
              <h2 id={`${service.slug}-chart`}>What the first fortnight looked like</h2>
              <p>
                The median time from commit to production, day by day, measured
                on real changes rather than in a rehearsal.
              </p>
            </header>
            <div className={styles.chartPanel}>
              <BarChart
                label={chart.label}
                period={chart.period}
                unit={chart.unit}
                data={chart.data}
                categoryLabel="Day"
                height={240}
              />
            </div>
          </div>
        </section>
      );
    }

    /* --------------------------------------------------------- effort split */
    case "donut": {
      const chart = service.charts?.donut;
      if (!chart) return null;
      return (
        <section className={styles.chartSection} aria-labelledby={`${service.slug}-chart`}>
          <div className={`container ${styles.chartInner}`}>
            <header className={styles.sectionHeading}>
              <h2 id={`${service.slug}-chart`}>Where the effort actually goes</h2>
              <p>
                A security programme is mostly plumbing. This is the split we
                plan against, and the order we build it in.
              </p>
            </header>
            <div className={styles.chartPanel}>
              <DonutChart
                label={chart.label}
                data={chart.data}
                unit="%"
                totalLabel="Share of effort"
                size={240}
              />
            </div>
          </div>
        </section>
      );
    }

    /* ------------------------------------------------------ incident year */
    case "heatmap": {
      const chart = service.charts?.heatmap;
      if (!chart) return null;
      return (
        <section className={styles.chartSection} aria-labelledby={`${service.slug}-chart`}>
          <div className="container">
            <header className={styles.sectionHeadingStandalone}>
              <h2 id={`${service.slug}-chart`}>A year of pressure</h2>
              <p>
                Every square is a day. The darker the square, the more of the
                team&apos;s attention went into unplanned work that day.
              </p>
            </header>
            <div className={styles.heatmapPanel}>
              <ActivityHeatmap
                label={chart.label}
                period={chart.period}
                days={chart.days}
                unit={{ one: "alert", other: "alerts" }}
              />
            </div>
          </div>
        </section>
      );
    }

    /* ---------------------------------------------------- comparison table */
    case "comparison":
      return (
        <section className={styles.comparison} aria-labelledby={`${service.slug}-comparison`}>
          <div className="container">
            <ComparisonTable
              title={service.comparison.title}
              description={service.comparison.description}
              columns={service.comparison.columns}
              sections={service.comparison.sections}
              cta={{ label: "Talk to our team", href: "/contact/" }}
              className={styles.comparisonTable}
            />
          </div>
        </section>
      );

    /* --------------------------------------------------- engagement models */
    case "engagement":
      return (
        <section className={styles.engagement} aria-labelledby={`${service.slug}-engagement`}>
          <div className={`container ${styles.engagementInner}`}>
            <header className={styles.sectionHeading}>
              <h2 id={`${service.slug}-engagement`}>{service.engagementTitle}</h2>
              <p>{service.engagementIntro}</p>
            </header>
            <RadioCards
              options={service.engagement.map((stage) => ({
                value: stage.value,
                label: stage.label,
                description: stage.description,
                meta: stage.meta,
              }))}
              layout="grid"
              minColumnWidth={220}
              selectOnHover
              className={styles.engagementCards}
            />
          </div>
        </section>
      );

    /* ------------------------------------------------------- the four stages */
    case "stepper":
      return (
        <section className={styles.stepperSection} aria-labelledby={`${service.slug}-stepper`}>
          <div className="container">
            <header className={styles.sectionHeadingStandalone}>
              <h2 id={`${service.slug}-stepper`}>{service.engagementTitle}</h2>
              <p>{service.engagementIntro}</p>
            </header>
            <div className={styles.stepperPanel}>
              <Stepper
                label="Engagement stages"
                current={0}
                details="all"
                steps={service.engagement.map((stage) => ({
                  id: stage.value,
                  label: stage.label,
                  description: `${stage.description.replace(/[.\s]+$/, "")} · ${stage.meta}`,
                }))}
              />
            </div>
          </div>
        </section>
      );

    /* ------------------------------------------------------------- method */
    case "approach":
      return (
        <section className={styles.approach} aria-labelledby={`${service.slug}-approach`}>
          <div className={`container ${styles.sectionInner}`}>
            <header className={styles.sectionHeading}>
              <h2 id={`${service.slug}-approach`}>{service.approachTitle}</h2>
              <p>{service.approachIntro}</p>
            </header>
            <Timeline
              items={service.approach.map((step) => ({
                title: step.title,
                description: step.description,
              }))}
              color="var(--fg)"
              distance={18}
              className={styles.processTimeline}
            />
          </div>
        </section>
      );

    /* ------------------------------------------ the method, as a plain rail */
    case "approachRail":
      return (
        <section className={styles.approach} aria-labelledby={`${service.slug}-approach`}>
          <div className={`container ${styles.sectionInner}`}>
            <header className={styles.sectionHeading}>
              <h2 id={`${service.slug}-approach`}>{service.approachTitle}</h2>
              <p>{service.approachIntro}</p>
            </header>
            <ol className={styles.approachRail}>
              {service.approach.map((step, index) => (
                <li className={styles.approachStop} key={step.title}>
                  <span className={styles.approachNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      );

    /* -------------------------------------------------------------- tools */
    case "tools":
      return (
        <section className={styles.tools} aria-labelledby={`${service.slug}-tools`}>
          <div className={`container ${styles.sectionInner}`}>
            <header className={styles.sectionHeading}>
              <h2 id={`${service.slug}-tools`}>{service.toolsTitle}</h2>
              <p>{service.toolsIntro}</p>
            </header>
            <ul className={styles.toolGrid}>
              {service.tools.map((tool) => (
                <li key={tool.name}>
                  <HoverCard
                    side="top"
                    content={
                      <div className={styles.toolPreview}>
                        <strong>{tool.name}</strong>
                        <span>{tool.category}</span>
                        <p>{tool.note}</p>
                      </div>
                    }
                  >
                    <span className={styles.toolName}>{tool.name}</span>
                  </HoverCard>
                </li>
              ))}
            </ul>
          </div>
        </section>
      );

    /* ------------------------------------------------------- tools as chips */
    case "toolChips":
      return (
        <section className={styles.tools} aria-labelledby={`${service.slug}-tools`}>
          <div className={`container ${styles.sectionInner}`}>
            <header className={styles.sectionHeading}>
              <h2 id={`${service.slug}-tools`}>{service.toolsTitle}</h2>
              <p>{service.toolsIntro}</p>
            </header>
            <div className={styles.chipPanel}>
              <ToolsChipFilter
                label="Filter the toolchain by category"
                options={service.tools.map((tool) => ({
                  value: tool.category,
                  label: tool.category,
                }))}
              />
              <ul className={styles.chipLegend}>
                {service.tools.map((tool) => (
                  <li key={tool.name}>
                    <strong>{tool.name}</strong>
                    <span>{tool.note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      );

    /* ------------------------------------------------------------- slides */
    case "slides": {
      const slides = service.slides ?? [];
      if (!slides.length) return null;
      return (
        <section className={styles.slideSection} aria-labelledby={`${service.slug}-slides`}>
          <div className="container">
            <header className={styles.sectionHeadingStandalone}>
              <h2 id={`${service.slug}-slides`}>How the work actually runs</h2>
              <p>
                The engagement is not one long meeting. It is a short sequence
                with a clear shape.
              </p>
            </header>
            <div className={styles.slideDeck}>
              <Carousel label="How the engagement runs">
                {slides.map((slide) => (
                  <article className={styles.slideCard} key={slide.title}>
                    <Badge tone="neutral" size="sm" pill className={styles.slideTag}>
                      {slide.tag}
                    </Badge>
                    <h3>{slide.title}</h3>
                    <p>{slide.body}</p>
                  </article>
                ))}
              </Carousel>
            </div>
          </div>
        </section>
      );
    }

    /* -------------------------------------- the sequence, one card at a time */
    case "expand": {
      const slides = service.slides ?? [];
      if (!slides.length) return null;
      return (
        <section className={styles.slideSection} aria-labelledby={`${service.slug}-slides`}>
          <div className="container">
            <header className={styles.sectionHeadingStandalone}>
              <h2 id={`${service.slug}-slides`}>How the work actually runs</h2>
              <p>
                Open each step to see what it covers. The order matters more
                than the length of any one of them.
              </p>
            </header>
            <div className={styles.expandStack}>
              {slides.map((slide) => (
                <ExpandableCard
                  key={slide.title}
                  title={slide.title}
                  description={slide.tag}
                  className={styles.expandCard}
                >
                  <p>{slide.body}</p>
                </ExpandableCard>
              ))}
            </div>
          </div>
        </section>
      );
    }

    /* ----------------------------------------------------------- checklist */
    case "checklist": {
      const checklist = service.checklist;
      if (!checklist) return null;
      return (
        <section className={styles.checklistSection} aria-labelledby={`${service.slug}-checklist`}>
          <div className="container">
            <header className={styles.sectionHeadingStandalone}>
              <h2 id={`${service.slug}-checklist`}>{checklist.title}</h2>
              <p>
                Tick each item as it lands. Nothing here needs a meeting to
                agree — it is the shape of the first month.
              </p>
            </header>
            <div className={styles.checklistPanel}>
              <OnboardingChecklist
                title="Delivery plan"
                doneTitle={checklist.doneTitle}
                steps={checklist.steps}
              />
            </div>
          </div>
        </section>
      );
    }

    /* ---------------------------------------------------------- use cases */
    case "useCases":
      if (!service.useCases?.length) return null;
      return (
        <section className={styles.useCases} aria-labelledby={`${service.slug}-use-cases`}>
          <div className={`container ${styles.useCasesInner}`}>
            <header className={styles.sectionHeading}>
              <h2 id={`${service.slug}-use-cases`}>Where this applies</h2>
              <p>
                Swipe through the situations this work is usually hired for. Most
                engagements start from one of these and then find their own
                shape.
              </p>
            </header>
            <UseCaseDeck
              items={service.useCases}
              labels={{ left: "Not us", right: "This one" }}
              outcomes={{ left: "Skipped", right: "Saved" }}
              label="Use cases"
              className={styles.cardStack}
            />
          </div>
        </section>
      );

    /* ------------------------------------------------ where this applies */
    case "scenarioGrid": {
      const useCases = service.useCases ?? [];
      if (!useCases.length) return null;
      return (
        <section className={styles.useCases} aria-labelledby={`${service.slug}-use-cases`}>
          <div className={`container ${styles.useCasesInner}`}>
            <header className={styles.sectionHeading}>
              <h2 id={`${service.slug}-use-cases`}>Where this applies</h2>
              <p>
                The situations this work is usually hired for. Most
                engagements start from one of them and then find their own
                shape.
              </p>
            </header>
            <ul className={styles.scenarioGrid}>
              {useCases.map((useCase, index) => (
                <li className={styles.scenarioCard} key={useCase.title}>
                  <span className={styles.capabilityIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{useCase.title}</h3>
                  <p>{useCase.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      );
    }

    /* --------------------------------------------------------------- faq */
    case "faq":
      return (
        <section className={styles.faq} aria-labelledby={`${service.slug}-faq`}>
          <div className="container">
            <FaqSection
              variant={service.faqVariant ?? "accordion"}
              title={service.faqTitle}
              description={`The questions ${service.title} teams ask us most often, and the short answers we give.`}
              items={service.faq.map((entry) => ({
                question: entry.question,
                answer: entry.answer,
              }))}
              contact={{
                label: "Ask us directly",
                description:
                  "If your question is not here, we would rather hear it.",
                href: "/contact/",
              }}
              className={styles.faqSection}
            />
          </div>
        </section>
      );

    /* --------------------------------------------------------------- cta */
    case "cta":
      return (
        <section className={styles.cta} aria-labelledby={`${service.slug}-cta`}>
          <div className="container">
            <CtaSection
              variant={service.ctaVariant ?? "split"}
              title={service.cta.title}
              description={service.cta.description}
              primaryAction={service.cta.primary}
              secondaryAction={service.cta.secondary}
              points={service.cta.points}
              className={styles.ctaSection}
            />
          </div>
        </section>
      );

    default:
      return null;
  }
}
