export function MovingDetailsForm() {
  return (
    <section className="booking-card booking-form-card">
      <div className="booking-card-head">
        <div>
          <span className="booking-section-kicker">Client details</span>
          <h2 className="booking-subtitle">Moving Details</h2>
          <p className="booking-text">
            Tell us the core details of your move. This section should feel
            clear, serious, and structured — not crowded.
          </p>
        </div>

        <div className="booking-required-note">
          <span className="booking-required-dot" />
          Email required for confirmation
        </div>
      </div>

      <div className="booking-grid">
        <div className="booking-field">
          <label className="booking-label">
            Full name <span className="booking-required-star">*</span>
          </label>
          <input
            className="booking-input"
            placeholder="John Doe"
            required
          />
        </div>

        <div className="booking-field">
          <label className="booking-label">
            Phone number <span className="booking-required-star">*</span>
          </label>
          <input
            className="booking-input"
            placeholder="(727) 000-0000"
            required
          />
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

        <div className="booking-field booking-field--full">
          <label className="booking-label">
            Pickup address <span className="booking-required-star">*</span>
          </label>
          <input
            className="booking-input"
            placeholder="Pickup address"
            required
          />
        </div>

        <div className="booking-field booking-field--full">
          <label className="booking-label">
            Dropoff address <span className="booking-required-star">*</span>
          </label>
          <input
            className="booking-input"
            placeholder="Dropoff address"
            required
          />
        </div>

        <div className="booking-field">
          <label className="booking-label">
            Property type <span className="booking-required-star">*</span>
          </label>
          <select className="booking-select" defaultValue="" required>
            <option value="" disabled>
              Select property type
            </option>
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
            <option value="" disabled>
              Select move size
            </option>
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
            <option value="" disabled>
              Select floor
            </option>
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
            <option value="" disabled>
              Elevator?
            </option>
            <option>Yes</option>
            <option>No</option>
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

      <div className="booking-form-footer">
        <div className="booking-form-info">
          <strong>Required now:</strong> name, phone, email, addresses, property
          type, move size, floor, and elevator info.
        </div>

        <div className="booking-form-info booking-form-info--soft">
          Distance, estimate, deposit, and final booking logic will connect to
          this block next.
        </div>
      </div>
    </section>
  );
}