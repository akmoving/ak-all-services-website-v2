export function BookingLongDistance() {
  return (
    <section className="booking-section-card booking-section-card--distance">
      <div className="booking-section-head">
        <div>
          <span className="booking-section-kicker">Long distance</span>
          <h2 className="booking-section-title">
            Long-distance moves need a different structure
          </h2>
          <p className="booking-section-text">
            This should not feel mixed into the local pricing logic. Once the
            route goes beyond the local limit, the experience should shift into
            a different pricing and planning model automatically.
          </p>
        </div>
      </div>

      <div className="booking-distance-grid">
        <article className="booking-distance-card booking-distance-card--dark">
          <span className="booking-distance-card__kicker">Local rule</span>
          <h3 className="booking-distance-card__title">
            Local moves stay inside the standard combo flow
          </h3>
          <p className="booking-distance-card__text">
            Local pricing is built around included miles by package, extra miles
            at $3 per mile, and normal local scheduling.
          </p>

          <div className="booking-distance-card__pill">
            Local = 45 miles or less
          </div>
        </article>

        <article className="booking-distance-card booking-distance-card--gold">
          <span className="booking-distance-card__kicker">Route shift</span>
          <h3 className="booking-distance-card__title">
            Long-distance should trigger a different offer
          </h3>
          <p className="booking-distance-card__text">
            Once the route goes past the local limit, the client should stop
            seeing local combo logic and start seeing a more strategic travel
            structure.
          </p>

          <div className="booking-distance-card__pill booking-distance-card__pill--gold">
            Long distance = 46+ miles
          </div>
        </article>
      </div>

      <div className="booking-distance-ranges">
        <div className="booking-distance-range">
          <span className="booking-distance-range__label">Tampa → Orlando area</span>
          <strong className="booking-distance-range__price">From $3,500+</strong>
          <p>Professional route pricing, logistics, labor, fuel, and timing handled separately.</p>
        </div>

        <div className="booking-distance-range">
          <span className="booking-distance-range__label">Tampa → Miami / South Florida</span>
          <strong className="booking-distance-range__price">From $5,500+</strong>
          <p>Long-haul pricing should feel like a premium transport service, not a stretched local move.</p>
        </div>

        <div className="booking-distance-range">
          <span className="booking-distance-range__label">Strategic custom routes</span>
          <strong className="booking-distance-range__price">Custom quote</strong>
          <p>Final version will switch to route-based long-distance pricing zones and custom review.</p>
        </div>
      </div>

      <div className="booking-distance-note">
        <p>
          Final logic note: the calculator will later detect when a route crosses
          the local threshold and automatically move the client into the
          long-distance flow without confusion.
        </p>
      </div>
    </section>
  );
}