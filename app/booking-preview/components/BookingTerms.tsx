export function BookingTerms() {
  return (
    <section className="booking-card booking-terms-card">
      <div className="booking-card-head">
        <div>
          <span className="booking-section-kicker">Policies & legal</span>
          <h2 className="booking-subtitle">Terms, Signature & Payment Lock</h2>
          <p className="booking-text">
            This block should close the flow seriously. The client should understand
            the rules, accept the terms, sign, and only then move forward to payment.
          </p>
        </div>

        <div className="booking-terms-badge">
          Final step before payment
        </div>
      </div>

      <div className="booking-terms-top">
        <div className="booking-terms-panel booking-terms-panel--main">
          <h3 className="booking-terms-panel__title">Company policy preview</h3>

          <ul className="booking-policy-list">
            <li>Standard moving start time: 8:00 AM</li>
            <li>One moving job per day per crew / truck</li>
            <li>Deposit required to reserve the date</li>
            <li>48-hour confirmation reminder before service</li>
            <li>3+ days cancellation: 100% refund</li>
            <li>48 hours cancellation: 80% refund</li>
            <li>24 hours or same-day cancellation: non-refundable</li>
            <li>Full packing is a separate 2-day service</li>
          </ul>
        </div>

        <div className="booking-terms-panel booking-terms-panel--lock">
          <span className="booking-terms-lock-kicker">Payment protection</span>
          <h3 className="booking-terms-panel__title">Payment stays locked</h3>
          <p className="booking-text">
            The final system will not allow payment until the customer accepts
            the terms and signs electronically.
          </p>
        </div>
      </div>

      <div className="booking-signature-preview">
        <div className="booking-signature-preview__box">
          <span className="booking-signature-preview__label">
            Signature required
          </span>
          <div className="booking-signature-preview__area">
            Digital signature area will appear here
          </div>
        </div>

        <label className="booking-terms-checkbox">
          <input type="checkbox" disabled />
          <span>
            I have read and accept the terms, cancellation policy, and company
            conditions before confirming the reservation.
          </span>
        </label>
      </div>

      <div className="booking-payment-preview">
        <div className="booking-payment-preview__text">
          <span className="booking-payment-preview__kicker">Next locked action</span>
          <strong className="booking-payment-preview__title">
            Proceed to deposit payment
          </strong>
          <p>
            This button will stay disabled until the client accepts the terms
            and signs in the final flow.
          </p>
        </div>

        <button className="booking-payment-preview__button" type="button" disabled>
          Payment locked until signature
        </button>
      </div>
    </section>
  );
}