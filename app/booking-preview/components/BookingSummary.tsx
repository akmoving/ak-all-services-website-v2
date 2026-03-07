type PackageKey = "base" | "standard" | "premium";

type BookingSummaryProps = {
  selectedPackage: PackageKey;
};

const PACKAGE_CONFIG: Record<
  PackageKey,
  {
    label: string;
    total: string;
    deposit: string;
    remaining: string;
    includedMiles: string;
    serviceFeel: string;
  }
> = {
  base: {
    label: "Base",
    total: "$1,050",
    deposit: "$315",
    remaining: "$735",
    includedMiles: "20 miles",
    serviceFeel: "Essential moving support",
  },
  standard: {
    label: "Standard",
    total: "$1,275",
    deposit: "$382.50",
    remaining: "$892.50",
    includedMiles: "25 miles",
    serviceFeel: "Best value for most moves",
  },
  premium: {
    label: "Premium",
    total: "$1,475",
    deposit: "$442.50",
    remaining: "$1,032.50",
    includedMiles: "30 miles",
    serviceFeel: "Higher-touch premium service",
  },
};

export function BookingSummary({ selectedPackage }: BookingSummaryProps) {
  const pkg = PACKAGE_CONFIG[selectedPackage];

  return (
    <section className="booking-card booking-summary-card booking-summary-card--premium">
      <div className="booking-card-head booking-card-head--stack">
        <div>
          <span className="booking-section-kicker">Estimate preview</span>
          <h2 className="booking-subtitle">Price Summary</h2>
          <p className="booking-text">
            This block should feel like the financial control center of the
            reservation: clear, premium, and easy to trust before the client
            chooses a date or reaches payment.
          </p>
        </div>

        <div className="booking-summary-status booking-summary-status--strong">
          <span className="booking-summary-status__dot" />
          Live package preview
        </div>
      </div>

      <div className="booking-summary-hero">
        <div className="booking-summary-hero__left">
          <span className="booking-summary-label">Estimated total</span>
          <strong className="booking-summary-amount">{pkg.total}</strong>
          <p className="booking-summary-hero__text">
            This preview now responds to the selected package. Next layer will
            connect route, distance, stairs, elevator, packing, and add-ons.
          </p>
        </div>

        <div className="booking-summary-hero__right">
          <div className="booking-summary-pill">
            <span className="booking-summary-mini-label">Deposit today</span>
            <strong>{pkg.deposit}</strong>
          </div>

          <div className="booking-summary-pill booking-summary-pill--soft">
            <span className="booking-summary-mini-label">Remaining balance</span>
            <strong>{pkg.remaining}</strong>
          </div>
        </div>
      </div>

      <div className="booking-summary-list booking-summary-list--premium">
        <div className="booking-summary-row">
          <span>Service type</span>
          <strong>Local move</strong>
        </div>

        <div className="booking-summary-row">
          <span>Selected package</span>
          <strong>{pkg.label}</strong>
        </div>

        <div className="booking-summary-row">
          <span>Included miles</span>
          <strong>{pkg.includedMiles}</strong>
        </div>

        <div className="booking-summary-row">
          <span>Service feel</span>
          <strong>{pkg.serviceFeel}</strong>
        </div>

        <div className="booking-summary-row">
          <span>Extra miles</span>
          <strong>$3 / mile</strong>
        </div>

        <div className="booking-summary-row">
          <span>Stairs / elevator effect</span>
          <strong>Applied after move details</strong>
        </div>

        <div className="booking-summary-row">
          <span>Packing / add-ons</span>
          <strong>Optional</strong>
        </div>
      </div>

      <div className="booking-summary-note-grid booking-summary-note-grid--premium">
        <div className="booking-summary-note-card booking-summary-note-card--dark">
          <span className="booking-summary-note-card__kicker">Deposit rule</span>
          <p>
            Reservation requires deposit first. Final flow will lock the next
            step until terms are accepted and signature is completed.
          </p>
        </div>

        <div className="booking-summary-note-card">
          <span className="booking-summary-note-card__kicker">What unlocks next</span>
          <p>
            The next real connection is route logic: Google Maps distance,
            local vs long distance, floor/elevator pricing, packing, and extras.
          </p>
        </div>
      </div>
    </section>
  );
}