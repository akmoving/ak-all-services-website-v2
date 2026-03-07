"use client";

import { useState } from "react";
import "./booking-preview.css";

import { BookingPricing } from "./components/BookingPricing";
import { BookingLongDistance } from "./components/BookingLongDistance";
import { MovingDetailsForm } from "./components/MovingDetailsForm";
import { BookingSummary } from "./components/BookingSummary";
import { BookingCalendarEmbed } from "./components/BookingCalendarEmbed";
import { BookingTerms } from "./components/BookingTerms";

type PackageKey = "base" | "standard" | "premium";

export default function BookingPreviewPage() {
  const [selectedPackage, setSelectedPackage] =
    useState<PackageKey>("standard");

  return (
    <main className="booking-preview-page">
      <section className="booking-shell">
        <section className="booking-top-frame">
          <div className="booking-top-frame__main">
            <div className="booking-top-frame__eyebrow">
              <span className="booking-kicker">A&K All Services, Inc.</span>
              <span className="booking-top-frame__status">
                Premium moving booking preview
              </span>
            </div>

            <h1 className="booking-main-title">
              Structured moving reservations for clients who expect a serious company.
            </h1>

            <p className="booking-main-text">
              Clean pricing, organized intake, protected scheduling, legal
              confirmation, and a more premium reservation flow from start to finish.
            </p>

            <div className="booking-top-badges">
              <span className="booking-top-badge">Licensed structure</span>
              <span className="booking-top-badge">Deposit to reserve</span>
              <span className="booking-top-badge">8:00 AM start</span>
              <span className="booking-top-badge">1 move per day</span>
            </div>
          </div>

          <div className="booking-top-frame__side">
            <div className="booking-metric-card booking-metric-card--dark">
              <span className="booking-metric-label">Positioning</span>
              <strong className="booking-metric-value">
                Premium / Clear / Controlled
              </strong>
              <p className="booking-metric-text">
                The booking experience should feel calm, expensive, and
                organized. No noise. No desperate energy. No messy flow.
              </p>
            </div>

            <div className="booking-metric-card booking-metric-card--dark">
              <span className="booking-metric-label">Operating rule</span>
              <strong className="booking-metric-value">
                Reservation becomes real after deposit, terms, and signature
              </strong>
              <p className="booking-metric-text">
                The flow is designed to feel like a real company process, not a
                random quote form pasted into a page.
              </p>
            </div>
          </div>
        </section>

        <section className="booking-section-card booking-section-card--trust">
          <div className="booking-section-head">
            <div>
              <span className="booking-section-kicker">Company foundation</span>
              <h2 className="booking-section-title">
                Institutional clarity before sales pressure
              </h2>
              <p className="booking-section-text">
                The first screen should establish who we are, how reservations
                work, and why the process feels structured. Trust first. Then
                pricing. Then booking.
              </p>
            </div>
          </div>

          <div className="booking-trust-grid">
            <article className="booking-trust-card booking-trust-card--dark">
              <span className="booking-trust-card__kicker">Policy baseline</span>
              <h3 className="booking-trust-card__title">
                Deposit required to hold the date
              </h3>
              <p className="booking-trust-card__text">
                The date is not reserved by conversation alone. The reservation
                becomes protected only after the deposit and required acceptance steps.
              </p>
            </article>

            <article className="booking-trust-card">
              <span className="booking-trust-card__kicker">Operational clarity</span>
              <h3 className="booking-trust-card__title">
                Every move starts with structure
              </h3>
              <p className="booking-trust-card__text">
                One moving job per day per crew, fixed 8:00 AM standard start,
                clear scheduling rules, and a stronger premium intake flow.
              </p>
            </article>

            <article className="booking-trust-card booking-trust-card--gold">
              <span className="booking-trust-card__kicker">Legal protection</span>
              <h3 className="booking-trust-card__title">
                Terms, signature, and payment sequence
              </h3>
              <p className="booking-trust-card__text">
                Final payment logic stays locked until policy acceptance and
                signature are completed in the confirmation flow.
              </p>
            </article>
          </div>

          <div className="booking-policy-strip">
            <div className="booking-policy-item">
              <span>Cancellation 3+ days</span>
              <strong>100% refund</strong>
            </div>
            <div className="booking-policy-item">
              <span>Cancellation at 48h</span>
              <strong>80% refund</strong>
            </div>
            <div className="booking-policy-item">
              <span>24h / same day</span>
              <strong>Non-refundable</strong>
            </div>
            <div className="booking-policy-item">
              <span>Full Packing</span>
              <strong>2-day service</strong>
            </div>
          </div>
        </section>

        <BookingPricing
          selectedPackage={selectedPackage}
          onSelectPackage={setSelectedPackage}
        />

        <BookingLongDistance />

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
            <BookingSummary selectedPackage={selectedPackage} />
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