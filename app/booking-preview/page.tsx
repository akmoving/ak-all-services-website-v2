import "./booking-preview.css";

import { MovingDetailsForm } from "./components/MovingDetailsForm";
import { BookingSummary } from "./components/BookingSummary";
import { BookingCalendarEmbed } from "./components/BookingCalendarEmbed";
import { BookingTerms } from "./components/BookingTerms";

export default function BookingPreviewPage() {
  return (
    <main className="booking-preview-page">
      <section className="booking-shell">
        <section className="booking-hero-v2">
          <div className="booking-hero-v2__content">
            <span className="booking-kicker">A&K All Services, Inc.</span>

            <h1 className="booking-main-title">
              Premium moving, built with structure, clarity, and control.
            </h1>

            <p className="booking-main-text">
              Reserve your move through a cleaner premium flow: clear service
              options, organized details, visible pricing logic, and a smoother
              booking experience from top to bottom.
            </p>

            <div className="booking-top-badges">
              <span className="booking-top-badge">Trust first</span>
              <span className="booking-top-badge">Pricing with clarity</span>
              <span className="booking-top-badge">8:00 AM start</span>
              <span className="booking-top-badge">1 move per day</span>
            </div>
          </div>

          <div className="booking-hero-v2__side">
            <div className="booking-metric-card booking-metric-card--dark">
              <span className="booking-metric-label">Positioning</span>
              <strong className="booking-metric-value">
                Premium / Clear / Controlled
              </strong>
              <p className="booking-metric-text">
                The page should feel expensive, calm, and easy to understand.
                No visual noise. No chaos. No cheap energy.
              </p>
            </div>

            <div className="booking-metric-card booking-metric-card--dark">
              <span className="booking-metric-label">Core rule</span>
              <strong className="booking-metric-value">
                Deposit required to reserve
              </strong>
              <p className="booking-metric-text">
                The client should understand the flow fast: offer first,
                details second, summary third, date fourth, legal confirmation last.
              </p>
            </div>
          </div>
        </section>

        <section className="booking-section-card booking-section-card--pricing">
          <div className="booking-section-head">
            <div>
              <span className="booking-section-kicker">Pricing / Packages</span>
              <h2 className="booking-section-title">
                Choose the service level that fits your move
              </h2>
              <p className="booking-section-text">
                This is the money section. It has to feel clear, premium, and
                easy to compare. The client should understand the difference
                between options in seconds.
              </p>
            </div>
          </div>

          <div className="booking-pricing-grid">
            <article className="booking-price-card booking-price-card--base">
              <div className="booking-price-card__top">
                <span className="booking-price-chip">Base</span>
                <strong className="booking-price-from">From $1,050</strong>
              </div>

              <h3 className="booking-price-title">Entry package</h3>
              <p className="booking-price-text">
                Clean, straightforward moving support for clients who want the
                essentials done professionally.
              </p>

              <ul className="booking-price-list">
                <li>Truck + crew + moving equipment</li>
                <li>Loading and unloading</li>
                <li>Basic furniture protection</li>
                <li>20 included miles</li>
              </ul>

              <button className="booking-price-button" type="button">
                Explore package
              </button>
            </article>

            <article className="booking-price-card booking-price-card--featured">
              <div className="booking-price-card__top">
                <span className="booking-price-chip booking-price-chip--gold">
                  Best value
                </span>
                <strong className="booking-price-from">From $1,275</strong>
              </div>

              <h3 className="booking-price-title">Standard</h3>
              <p className="booking-price-text">
                The strongest balance between price, protection, presentation,
                and overall customer value.
              </p>

              <ul className="booking-price-list">
                <li>Everything in Base</li>
                <li>Stronger protection & handling</li>
                <li>Higher overall service value</li>
                <li>25 included miles</li>
              </ul>

              <button
                className="booking-price-button booking-price-button--gold"
                type="button"
              >
                Explore package
              </button>
            </article>

            <article className="booking-price-card booking-price-card--premium">
              <div className="booking-price-card__top">
                <span className="booking-price-chip booking-price-chip--glass">
                  Premium
                </span>
                <strong className="booking-price-from">From $1,475</strong>
              </div>

              <h3 className="booking-price-title">Higher-touch service</h3>
              <p className="booking-price-text">
                Built for clients who want the strongest presentation, smoother
                handling, and a more complete premium offer.
              </p>

              <ul className="booking-price-list">
                <li>Everything in Standard</li>
                <li>Premium presentation & handling</li>
                <li>Basic kitchen + fragile packing</li>
                <li>30 included miles</li>
              </ul>

              <button className="booking-price-button" type="button">
                Explore package
              </button>
            </article>
          </div>

          <div className="booking-pricing-note">
            <p>
              Packages will later become expandable cards with more detailed
              breakdowns, but today we are locking the hierarchy, spacing, and
              premium perception of this section.
            </p>
          </div>
        </section>

        <section className="booking-section-card booking-section-card--flow">
          <div className="booking-section-head">
            <div>
              <span className="booking-section-kicker">Guided experience</span>
              <h2 className="booking-section-title">
                How the booking flow should feel
              </h2>
            </div>
          </div>

          <div className="booking-flow-grid">
            <div className="booking-flow-card">
              <span className="booking-flow-step">01</span>
              <h3>Trust first</h3>
              <p>Establish structure and confidence before asking the client to act.</p>
            </div>

            <div className="booking-flow-card">
              <span className="booking-flow-step">02</span>
              <h3>Pricing second</h3>
              <p>Show value clearly before the client reaches the detailed form.</p>
            </div>

            <div className="booking-flow-card">
              <span className="booking-flow-step">03</span>
              <h3>Details after interest</h3>
              <p>Collect move information only after the offer already feels real.</p>
            </div>

            <div className="booking-flow-card">
              <span className="booking-flow-step">04</span>
              <h3>Summary before date</h3>
              <p>Make price, deposit, and structure visible before scheduling.</p>
            </div>
          </div>
        </section>

        <section className="booking-layout">
          <div className="booking-left">
            <MovingDetailsForm />
          </div>

          <div className="booking-right">
            <BookingSummary />
          </div>
        </section>

        <section className="booking-layout booking-layout--calendar">
          <div className="booking-left booking-left--calendar">
            <BookingCalendarEmbed />
          </div>

          <div className="booking-right booking-right--calendar">
            <BookingTerms />
          </div>
        </section>
      </section>
    </main>
  );
}