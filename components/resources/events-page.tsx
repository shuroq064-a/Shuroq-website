import Link from "next/link";
import { MessagesSquare, Presentation, Users } from "lucide-react";

import { AnimatedFooter } from "@/components/unlumen-ui/animated-footer";
import { SiteFooter } from "@/components/arc/blocks/site-footer/site-footer";
import { Countdown } from "@/components/arc/countdown/countdown";
import SiteNav from "@/components/nav/site-nav";

import { EventsCalendar } from "./events-calendar";
import { eventBenefits, shuroqEvents } from "./events-content";
import styles from "./events-page.module.css";

const footerColumns = [
  {
    title: "Resources",
    links: [
      { label: "Blogs", href: "/blogs" },
      { label: "Events", href: "/events" },
      { label: "Skill Rubrics", href: "/skill-rubrics" },
    ],
  },
  {
    title: "Marketplace",
    links: [
      { label: "Botkube Enterprise", href: "/botkube" },
      { label: "Managed Services for Kubernetes", href: "/kubernetes-services" },
      { label: "Fission", href: "/fission" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

const footerLegal = [
  { label: "Privacy", href: "/privacy/" },
  { label: "Terms", href: "/terms/" },
];

const benefitIcons = [Presentation, Users, MessagesSquare];

const nextEvent = shuroqEvents[0];

export default function EventsPage() {
  return (
    <main className={`${styles.page} arc-industry-tokens arc-service-tokens`}>
      <SiteNav />

      <section className={styles.hero} aria-labelledby="events-title">
        <div className="container">
          <div className={styles.heroPanel}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Shuroq events</p>
              <h1 id="events-title">Learn, connect, and build with our community events</h1>
              <p className={styles.heroLead}>
                Sessions on cloud-native engineering, DevOps excellence, platform
                reliability, and AI-enabled delivery — run by the people who do
                the work.
              </p>
              <div className={styles.heroActions}>
                <Link href="#schedule" className="btn btn-pill btn-black">
                  See the schedule
                </Link>
                <Link href="/contact" className="btn btn-pill btn-glass-light">
                  Host a session
                </Link>
              </div>
            </div>

            <div className={styles.heroClock}>
              <p className={styles.clockLabel}>Next session starts in</p>
              <Countdown
                target={nextEvent.target}
                timeZone={nextEvent.timeZone}
                label={`${nextEvent.title} starts in`}
                completeLabel="Live now"
              />
              <div className={styles.clockEvent}>
                <h2>{nextEvent.title}</h2>
                <ul className={styles.clockFacts}>
                  <li>{nextEvent.day}</li>
                  <li>
                    {nextEvent.time} {nextEvent.zone}
                  </li>
                  <li>{nextEvent.format}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.schedule} id="schedule" aria-labelledby="events-schedule">
        <div className="container">
          <header className={styles.lead}>
            <h2 id="events-schedule">Upcoming events</h2>
            <p>
              Every session is open to the community. Bring a question, or bring
              a problem you are trying to solve.
            </p>
          </header>
          <div className={styles.scheduleList}>
            {shuroqEvents.map((event) => (
              <article className={styles.scheduleRow} key={event.id}>
                <div className={styles.scheduleDate}>
                  <span>{event.tag}</span>
                  <strong>{event.day}</strong>
                </div>
                <div className={styles.scheduleCopy}>
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <div className={styles.scheduleMeta}>
                    <span>
                      {event.time} {event.zone}
                    </span>
                    <span>{event.format}</span>
                  </div>
                </div>
                <div className={styles.scheduleClock}>
                  <Countdown
                    target={event.target}
                    timeZone={event.timeZone}
                    variant="compact"
                    units={["days", "hours"]}
                    label={`${event.title} starts in`}
                    completeLabel="Live now"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.calendar} aria-labelledby="events-calendar">
        <div className="container">
          <header className={styles.lead}>
            <h2 id="events-calendar">Pick a day</h2>
            <p>
              Some sessions are open to everyone; others are working sessions
              for the teams already on a Shuroq engagement.
            </p>
          </header>
          <div className={styles.calendarInner}>
            <div className={styles.calendarPanel}>
              <EventsCalendar />
            </div>
            <div>
              <p className={styles.calendarNote}>
                Not every session needs a slide deck. The Build Sprint runs all
                day, and the reliability playbook leaves time for the questions
                that only come up when the room is small.
              </p>
              <ul className={styles.calendarList}>
                {shuroqEvents.map((event) => (
                  <li key={event.id}>
                    {event.title}
                    <span>{event.day}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.benefits} aria-labelledby="events-benefits">
        <div className="container">
          <header className={styles.lead}>
            <h2 id="events-benefits">Why attend Shuroq events?</h2>
            <p>Practitioner talks, in a format that leaves room for questions.</p>
          </header>
          <div className={styles.benefitGrid}>
            {eventBenefits.map((benefit, index) => {
              const Icon = benefitIcons[index];
              return (
                <article className={styles.benefit} key={benefit.title}>
                  <span className={styles.benefitIcon}>
                    <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="events-cta">
        <div className="container">
          <div className={styles.ctaInner}>
            <div>
              <h2 id="events-cta">Never miss an event</h2>
              <p>
                Get upcoming event announcements and session invites directly
                from our team.
              </p>
            </div>
            <div className={styles.ctaActions}>
              <Link href="/contact" className="btn btn-pill btn-black">
                Get event invites
              </Link>
              <Link href="/blogs" className="btn btn-pill btn-glass-light">
                Read the journal
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter
        className="site-footer-inverted service-page-footer"
        brand={{ name: "Shuroq", href: "/", mark: null }}
        tagline="Technology Services & Digital Engineering Company. Focused on dependable digital systems."
        columns={footerColumns}
        legal={footerLegal}
        socials={[]}
        newsletter={null}
        status={null}
        year={2026}
      />

      <section className={styles.animatedFooter} aria-label="Shuroq closing hands animation">
        <AnimatedFooter
          headingLines={["Shuroq"]}
          leftImage="/animated-footer/hand-left.jpg"
          rightImage="/animated-footer/hand-right.jpg"
          background="#000"
          textColor="#fff"
          handWidth="clamp(200px, 25vw, 360px)"
          headingBottomPadding="clamp(56px, 8vh, 80px)"
          columns={80}
          cellSize={20}
          fontSize={18}
          parallaxStrength={18}
          hoverRadius={8}
        />
      </section>
    </main>
  );
}
