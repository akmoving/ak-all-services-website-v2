export function BookingCalendarEmbed() {
  return (
    <section className="booking-card">
      <h2 className="booking-subtitle">Choose Your Date</h2>
      <div className="booking-iframe-wrap">
        <iframe
          className="booking-iframe"
          src="https://cal.com/akmovingfl/noving-reservation-8am-start"
          title="A&K Booking Calendar"
        />
      </div>
    </section>
  );
}