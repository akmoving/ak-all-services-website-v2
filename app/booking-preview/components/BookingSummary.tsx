export function BookingSummary() {
  return (
    <section className="booking-card booking-summary-card">
      <div className="booking-card-head">
        <div>
          <span className="booking-section-kicker">Price preview</span>
          <h2 className="booking-subtitle">Reservation Summary</h2>
          <p className="booking-text">
            This block will become the visual center of the estimate: clear,
            premium, and easy to understand before date selection and final confirmation.
          </p>
        </div>

        <div className="booking-summary-status">
          <span className="booking-summary-status__dot" />
          Estimate preview
        </div>
      </div>

      <div className="booking-summary-highlight booking-summary-highlight--strong">
        <div className="booking-summary-highlight__row">
          <div>
            <span className="booking-summary-label">Estimated total</span>
            <strong className="booking-summary-amount">$0.00</strong>
          </div>

          <div className="booking-summary-split">
            <div>
              <span className="booking-summary-mini-label">Deposit today</span>
              <strong>$0.00</strong>
            </div>
            <div>
              <span className="booking-summary-mini-label">Remaining</span>
              <strong>$0.00</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="booking-summary-list">
        <div className="booking-summary-row">
          <span>Service type</span>
          <strong>Local move</strong>
        </div>

        <div className="booking-summary-row">
          <span>Distance</span>
          <strong>Calculated automatically</strong>
        </div>

        <div className="booking-summary-row">
          <span>Selected package</span>
          <strong>To be selected</strong>
        </div>

        <div className="booking-summary-row">
          <span>Included miles</span>
          <strong>Depends on package</strong>
        </div>

        <div className="booking-summary-row">
          <span>Extra miles</span>
          <strong>$3 / mile</strong>
        </div>

        <div className="booking-summary-row">
          <span>Stairs / elevator rule</span>
          <strong>Applied after details</strong>
        </div>

        <div className="booking-summary-row">
          <span>Packing / add-ons</span>
          <strong>Optional</strong>
        </div>
      </div>

      <div className="booking-summary-note-grid">
        <div className="booking-summary-note-card">
          <span className="booking-summary-note-card__kicker">Deposit rule</span>
          <p>
            The final flow will show the total, the deposit due now, and the
            remaining balance due on moving day with much stronger hierarchy.
          </p>
        </div>

        <div className="booking-summary-note-card">
          <span className="booking-summary-note-card__kicker">What comes next</span>
          <p>
            Once pricing logic is connected, this block will update from the
            client’s package, distance, stairs, elevator, and add-ons.
          </p>
        </div>
      </div>
    </section>
  );
}