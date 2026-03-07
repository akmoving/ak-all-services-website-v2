export function BookingTerms() {
  return (
    <section className="booking-card booking-terms-card booking-terms-card--premium">
      <div className="booking-card-head booking-card-head--stack">
        <div>
          <span className="booking-section-kicker">Final confirmation</span>
          <h2 className="booking-subtitle">Terms, Signature & Reservation Lock</h2>
          <p className="booking-text">
            This is the final control block before payment. The client should
            clearly understand the company rules, accept the terms, sign, and
            only then move forward.
          </p>
        </div>

        <div className="booking-terms-badge">
          Final step before payment
        </div>
      </div>

      <div className="booking-terms-hero">
        <div className="booking-terms-hero__left">
          <span className="booking-terms-hero__kicker">Reservation protection</span>
          <strong className="booking-terms-hero__title">
            Payment remains locked until terms are accepted and signature is completed.
          </strong>
          <p className="booking-terms-hero__text">
            This should feel serious and protective, not optional. The client
            needs to understand that the reservation becomes real only after
            acceptance and signature.
          </p>
        </div>

        <div className="booking-terms-hero__right">
          <div className="booking-terms-mini-card">
            <span>Deposit required</span>
            <strong>To reserve the date</strong>
          </div>

          <div className="booking-terms-mini-card booking-terms-mini-card--gold">
            <span>Confirmation</span>
            <strong>48h before service</strong>
          </div>
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
            <li>Full Packing is a separate 2-day service</li>
          </ul>
        </div>

        <div className="booking-terms-panel booking-terms-panel--lock">
          <span className="booking-terms-lock-kicker">Required to continue</span>
          <h3 className="booking-terms-panel__title">Signature & acceptance required</h3>
          <p className="booking-text">
            Final payment flow must stay blocked until the customer accepts the
            company terms and signs electronically.
          </p>
        </div>
      </div>

      <div className="booking-signature-preview">
        <div className="booking-signature-preview__box">
          <span className="booking-signature-preview__label">
            Digital signature area
          </span>
          <div className="booking-signature-preview__area">
            Signature capture will appear here
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
          <span className="booking-payment-preview__kicker">Locked action</span>
          <strong className="booking-payment-preview__title">
            Proceed to deposit payment
          </strong>
          <p>
            This stays disabled until signature and terms acceptance are completed.
          </p>
        </div>

        <button className="booking-payment-preview__button" type="button" disabled>
          Payment locked until signature
        </button>
      </div>
    </section>
  );
}