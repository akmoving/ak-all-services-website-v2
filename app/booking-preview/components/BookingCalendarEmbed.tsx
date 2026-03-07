export function BookingCalendarEmbed() {
  return (
    <section className="booking-card booking-calendar-card">
      <div className="booking-card-head">
        <div>
          <span className="booking-section-kicker">Scheduling</span>
          <h2 className="booking-subtitle">Choose Your Date</h2>
          <p className="booking-text">
            Select the available date for your move. The scheduling block should
            feel clear, structured, and operational — not like a random calendar
            pasted into the page.
          </p>
        </div>

        <div className="booking-calendar-badge">8:00 AM fixed start</div>
      </div>

      <div className="booking-calendar-rules">
        <div className="booking-calendar-rule booking-calendar-rule--dark">
          <span className="booking-calendar-rule__kicker">Standard rule</span>
          <strong className="booking-calendar-rule__title">
            All moving reservations start at 8:00 AM
          </strong>
          <p>
            We do not offer random scattered start times. This keeps operations
            cleaner, more professional, and easier to manage.
          </p>
        </div>

        <div className="booking-calendar-rule booking-calendar-rule--gold">
          <span className="booking-calendar-rule__kicker">Important for packing</span>
          <strong className="booking-calendar-rule__title">
            Full Packing is a 2-day service
          </strong>
          <p>
            Day 1: packing. Day 2: moving day. This will later connect directly
            to the booking flow so the client clearly understands both dates.
          </p>
        </div>
      </div>

      <div className="booking-iframe-wrap">
        <iframe
          className="booking-iframe"
          src="https://cal.com/akmovingfl/noving-reservation-8am-start"
          title="A&K Booking Calendar"
        />
      </div>

      <div className="booking-calendar-footer-note">
        <p>
          Final version note: if the client selects Full Packing, the system
          will visually require two separate dates — one for packing and one for
          the move itself.
        </p>
      </div>
    </section>
  );
}