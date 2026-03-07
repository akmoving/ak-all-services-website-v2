export function MovingDetailsForm() {
  return (
    <section className="booking-card booking-form-card booking-form-card--premium">
      <div className="booking-card-head booking-card-head--stack">
        <div>
          <span className="booking-section-kicker">Client details</span>
          <h2 className="booking-subtitle">Move Information</h2>
          <p className="booking-text">
            Give us the key details of your move. This section should feel
            organized, premium, and easy to complete — not crowded or cheap.
          </p>
        </div>

        <div className="booking-form-topbar">
          <div className="booking-required-note">
            <span className="booking-required-dot" />
            Email required for confirmation
          </div>

          <div className="booking-form-status">
            Structured intake flow
          </div>
        </div>
      </div>

      <div className="booking-form-shell">
        <div className="booking-form-group">
          <div className="booking-form-group__head">
            <span className="booking-form-group__step">01</span>
            <div>
              <h3 className="booking-form-group__title">Contact details</h3>
              <p className="booking-form-group__text">
                Basic contact information for confirmation and reservation follow-up.
              </p>
            </div>
          </div>

          <div className="booking-grid">
            <div className="booking-field">
              <label className="booking-label">
                Full name <span className="booking-required-star">*</span>
              </label>
              <input className="booking-input" placeholder="John Doe" required />
            </div>

            <div className="booking-field">
              <label className="booking-label">
                Phone number <span className="booking-required-star">*</span>
              </label>
              <input className="booking-input" placeholder="(727) 000-0000" required />
            </div>

            <div className="booking-field booking-field--full">
              <label className="booking-label">
                Email address <span className="booking-required-star">*</span>
              </label>
              <input
                className="booking-input"
                type="email"
                placeholder="name@email.com"
                required
              />
            </div>
          </div>
        </div>

        <div className="booking-form-group">
          <div className="booking-form-group__head">
            <span className="booking-form-group__step">02</span>
            <div>
              <h3 className="booking-form-group__title">Route details</h3>
              <p className="booking-form-group__text">
                Pickup and dropoff addresses will later connect to the mileage
                calculator and route logic.
              </p>
            </div>
          </div>

          <div className="booking-grid">
            <div className="booking-field booking-field--full">
              <label className="booking-label">
                Pickup address <span className="booking-required-star">*</span>
              </label>
              <input className="booking-input" placeholder="Pickup address" required />
            </div>

            <div className="booking-field booking-field--full">
              <label className="booking-label">
                Dropoff address <span className="booking-required-star">*</span>
              </label>
              <input className="booking-input" placeholder="Dropoff address" required />
            </div>
          </div>
        </div>

        <div className="booking-form-group">
          <div className="booking-form-group__head">
            <span className="booking-form-group__step">03</span>
            <div>
              <h3 className="booking-form-group__title">Move setup</h3>
              <p className="booking-form-group__text">
                These details shape labor, stairs, elevator, and service structure.
              </p>
            </div>
          </div>

          <div className="booking-grid">
            <div className="booking-field">
              <label className="booking-label">
                Property type <span className="booking-required-star">*</span>
              </label>
              <select className="booking-select" defaultValue="" required>
                <option value="" disabled>Select property type</option>
                <option>House</option>
                <option>Apartment</option>
                <option>Condo</option>
                <option>Townhome</option>
                <option>Storage</option>
                <option>Office</option>
              </select>
            </div>

            <div className="booking-field">
              <label className="booking-label">
                Move size <span className="booking-required-star">*</span>
              </label>
              <select className="booking-select" defaultValue="" required>
                <option value="" disabled>Select move size</option>
                <option>Studio</option>
                <option>1 Bedroom</option>
                <option>2 Bedrooms</option>
                <option>3 Bedrooms</option>
                <option>4 Bedrooms</option>
                <option>5+ Bedrooms</option>
              </select>
            </div>

            <div className="booking-field">
              <label className="booking-label">
                Floor level <span className="booking-required-star">*</span>
              </label>
              <select className="booking-select" defaultValue="" required>
                <option value="" disabled>Select floor</option>
                <option>1st floor</option>
                <option>2nd floor</option>
                <option>3rd floor</option>
                <option>4th floor</option>
              </select>
            </div>

            <div className="booking-field">
              <label className="booking-label">
                Elevator <span className="booking-required-star">*</span>
              </label>
              <select className="booking-select" defaultValue="" required>
                <option value="" disabled>Elevator?</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            <div className="booking-field">
              <label className="booking-label">Package selected</label>
              <select className="booking-select" defaultValue="">
                <option value="" disabled>Select package</option>
                <option>Base</option>
                <option>Standard</option>
                <option>Premium</option>
              </select>
            </div>

            <div className="booking-field">
              <label className="booking-label">Packing level</label>
              <select className="booking-select" defaultValue="">
                <option value="" disabled>Select packing</option>
                <option>None</option>
                <option>Partial Packing</option>
                <option>Full Packing (2-day service)</option>
              </select>
            </div>

            <div className="booking-field booking-field--full">
              <label className="booking-label">Special notes</label>
              <textarea
                className="booking-textarea"
                placeholder="Heavy items, fragile items, partial packing, gate code, stairs, long carry, TV handling, or anything important we should know."
              />
            </div>
          </div>
        </div>
      </div>

      <div className="booking-form-footer booking-form-footer--enhanced">
        <div className="booking-form-info">
          <strong>Required now:</strong> name, phone, email, addresses,
          property type, move size, floor, and elevator info.
        </div>

        <div className="booking-form-info booking-form-info--soft">
          Next layer: Google Maps distance, estimate logic, long-distance split,
          and add-on pricing will connect directly to this intake block.
        </div>
      </div>
    </section>
  );
}