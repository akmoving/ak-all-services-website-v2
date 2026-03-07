"use client";

type PackageKey = "base" | "standard" | "premium";

type BookingPricingProps = {
  selectedPackage: PackageKey;
  onSelectPackage: (key: PackageKey) => void;
};

export function BookingPricing({
  selectedPackage,
  onSelectPackage,
}: BookingPricingProps) {
  return (
    <section className="booking-section-card booking-section-card--pricing">
      <div className="booking-section-head">
        <div>
          <span className="booking-section-kicker">Pricing / Packages</span>
          <h2 className="booking-section-title">
            Choose the service level that fits your move
          </h2>
          <p className="booking-section-text">
            This is the section that moves money. The client should compare fast,
            understand the value clearly, and feel that each package is part of a
            premium, well-structured service.
          </p>
        </div>
      </div>

      <div className="booking-pricing-grid booking-pricing-grid--enhanced">
        <article
          className={`booking-price-card booking-price-card--base booking-price-card--interactive ${
            selectedPackage === "base" ? "booking-price-card--open" : ""
          }`}
        >
          <div className="booking-price-card__glow" />

          <div className="booking-price-card__top">
            <span className="booking-price-chip">Base</span>
            <strong className="booking-price-from">From $1,050</strong>
          </div>

          <h3 className="booking-price-title">Entry package</h3>
          <p className="booking-price-text">
            Clean, straightforward moving support for clients who want the
            essentials done professionally without paying for extra layers they
            do not need.
          </p>

          <ul className="booking-price-list">
            <li>Truck + crew + moving equipment</li>
            <li>Loading and unloading</li>
            <li>Basic furniture protection</li>
            <li>20 included miles</li>
          </ul>

          <div className="booking-price-footer">
            <button
              className="booking-price-button"
              type="button"
              onClick={() => onSelectPackage("base")}
            >
              {selectedPackage === "base" ? "Package selected" : "Explore package"}
            </button>
          </div>

          <div
            className={`booking-price-expand ${
              selectedPackage === "base" ? "booking-price-expand--visible" : ""
            }`}
          >
            <div className="booking-price-expand__header">
              <span className="booking-price-expand__kicker">What this includes</span>
              <strong className="booking-price-expand__title">
                Essential moving support
              </strong>
            </div>

            <div className="booking-price-expand__grid">
              <div className="booking-price-expand__item">
                <span>Included miles</span>
                <strong>20 miles</strong>
              </div>
              <div className="booking-price-expand__item">
                <span>Ideal for</span>
                <strong>Smaller local moves</strong>
              </div>
              <div className="booking-price-expand__item">
                <span>Deposit structure</span>
                <strong>30% today</strong>
              </div>
              <div className="booking-price-expand__item">
                <span>Best for</span>
                <strong>Budget clarity</strong>
              </div>
            </div>

            <p className="booking-price-expand__note">
              This is the leanest package. Good for clients who need the move
              handled correctly without extra premium layers.
            </p>
          </div>
        </article>

        <article
          className={`booking-price-card booking-price-card--featured booking-price-card--interactive ${
            selectedPackage === "standard" ? "booking-price-card--open" : ""
          }`}
        >
          <div className="booking-price-card__glow booking-price-card__glow--gold" />

          <div className="booking-price-card__top">
            <span className="booking-price-chip booking-price-chip--gold">
              Best value
            </span>
            <strong className="booking-price-from">From $1,275</strong>
          </div>

          <h3 className="booking-price-title">Standard</h3>
          <p className="booking-price-text">
            The strongest balance between price, protection, presentation, and
            overall service value. This is the package that should feel like the
            smartest decision for most clients.
          </p>

          <ul className="booking-price-list">
            <li>Everything in Base</li>
            <li>Stronger protection & handling</li>
            <li>Higher overall service value</li>
            <li>25 included miles</li>
          </ul>

          <div className="booking-price-footer">
            <button
              className="booking-price-button booking-price-button--gold"
              type="button"
              onClick={() => onSelectPackage("standard")}
            >
              {selectedPackage === "standard"
                ? "Package selected"
                : "Explore package"}
            </button>
          </div>

          <div
            className={`booking-price-expand ${
              selectedPackage === "standard" ? "booking-price-expand--visible" : ""
            }`}
          >
            <div className="booking-price-expand__header">
              <span className="booking-price-expand__kicker">What this includes</span>
              <strong className="booking-price-expand__title">
                Balanced premium option
              </strong>
            </div>

            <div className="booking-price-expand__grid">
              <div className="booking-price-expand__item">
                <span>Included miles</span>
                <strong>25 miles</strong>
              </div>
              <div className="booking-price-expand__item">
                <span>Ideal for</span>
                <strong>Most local moves</strong>
              </div>
              <div className="booking-price-expand__item">
                <span>Deposit structure</span>
                <strong>30% today</strong>
              </div>
              <div className="booking-price-expand__item">
                <span>Remaining</span>
                <strong>Due on moving day</strong>
              </div>
            </div>

            <p className="booking-price-expand__note">
              This should keep reading like the smartest package, not just the
              middle one.
            </p>
          </div>
        </article>

        <article
          className={`booking-price-card booking-price-card--premium booking-price-card--interactive ${
            selectedPackage === "premium" ? "booking-price-card--open" : ""
          }`}
        >
          <div className="booking-price-card__glow booking-price-card__glow--soft" />

          <div className="booking-price-card__top">
            <span className="booking-price-chip booking-price-chip--glass">
              Premium
            </span>
            <strong className="booking-price-from">From $1,475</strong>
          </div>

          <h3 className="booking-price-title">Higher-touch service</h3>
          <p className="booking-price-text">
            Built for clients who want the strongest presentation, smoother
            handling, and a more complete premium offer with more perceived care.
          </p>

          <ul className="booking-price-list">
            <li>Everything in Standard</li>
            <li>Premium presentation & handling</li>
            <li>Basic kitchen + fragile packing</li>
            <li>30 included miles</li>
          </ul>

          <div className="booking-price-footer">
            <button
              className="booking-price-button"
              type="button"
              onClick={() => onSelectPackage("premium")}
            >
              {selectedPackage === "premium"
                ? "Package selected"
                : "Explore package"}
            </button>
          </div>

          <div
            className={`booking-price-expand ${
              selectedPackage === "premium" ? "booking-price-expand--visible" : ""
            }`}
          >
            <div className="booking-price-expand__header">
              <span className="booking-price-expand__kicker">What this includes</span>
              <strong className="booking-price-expand__title">
                Higher-touch premium structure
              </strong>
            </div>

            <div className="booking-price-expand__grid">
              <div className="booking-price-expand__item">
                <span>Included miles</span>
                <strong>30 miles</strong>
              </div>
              <div className="booking-price-expand__item">
                <span>Ideal for</span>
                <strong>Higher-expectation clients</strong>
              </div>
              <div className="booking-price-expand__item">
                <span>Packing note</span>
                <strong>Basic kitchen + fragile only</strong>
              </div>
              <div className="booking-price-expand__item">
                <span>Service feel</span>
                <strong>More complete presentation</strong>
              </div>
            </div>

            <p className="booking-price-expand__note">
              Premium should feel more complete, but not confusing. Stronger
              value, clearer care, cleaner presentation.
            </p>
          </div>
        </article>
      </div>

      <div className="booking-pricing-note booking-pricing-note--strong">
        <p>
          The selected package should now drive the summary next. That is where
          the page starts feeling like a real booking system instead of a static
          mockup.
        </p>
      </div>
    </section>
  );
}