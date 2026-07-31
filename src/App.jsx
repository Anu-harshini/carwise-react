import { useState } from "react";
import "./App.css";
import carImage from "./assets/car.png";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    carType: "",
    message: ""
  });

  const DISPLAY_PHONE = "8825625498"; // shown on website
  const DISPLAY_EMAIL = "harsharaja505@gmail.com"; // shown on website

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      if (!/^\d{0,10}$/.test(value)) return; // only numbers, max 10
    }
    setForm({...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("access_key", "426a3361-bb95-4f68-80b5-c2d94f10684f");
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("budget", form.budget);
    formData.append("car_type", form.carType);
    formData.append("message", form.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        alert("Thank you! Your consultation request has been sent.");

        setForm({
          name: "",
          email: "",
          phone: "",
          budget: "",
          carType: "",
          message: "",
        });

        setShowForm(false);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  const isFormValid = form.name && form.email && form.phone.length === 10 && form.budget;

  return (
    <>
      <nav>
        <h2 className="logo">Harsha Car Advisor</h2>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#why">Why Choose Us</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#how">How It Works</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <div className="hero" id="home">
        <div className="hero-text">
          <p className="hero-brand">Harsha Car Advisor</p>
          <h1>Find the Perfect Car <br /> for Your Budget</h1>
          <h3>No Sales Pressure. Just Honest Advice.</h3>
          <p className="hero-desc">
            Buying a car is a big decision. We help you choose the right car
            based on your budget, lifestyle, safety, mileage, maintenance
            costs, and resale value.
          </p>
          <div className="hero-buttons">
            <button onClick={() => setShowForm(true)}>Get Consult</button>
          </div>
        </div>
        <div className="hero-image">
          <img src={carImage} alt="Car" />
        </div>
      </div>

      <section className="why" id="why">
        <h2>Why People Trust Harsha Car Advisor</h2>
        <div className="cards">
          <div className="card"><h3>✅ Unbiased Recommendations</h3><p>We recommend cars based on your needs—not dealership promotions.</p></div>
          <div className="card"><h3>🚗 New & Used Car Guidance</h3><p>Expert guidance whether you're buying a brand-new or used car.</p></div>
          <div className="card"><h3>💰 Budget-Based Suggestions</h3><p>Find the best cars that match your budget and lifestyle.</p></div>
          <div className="card"><h3>🛡️ Safety & Maintenance Comparison</h3><p>Compare safety ratings, maintenance costs, mileage and resale value.</p></div>
        </div>
      </section>

      <section className="services" id="services">
        <h2>Our Services</h2>
        <div className="cards">
          <div className="card"><h3>🚘 New Car Consultation</h3><p>Get the best new car recommendations based on your budget and requirements.</p></div>
          <div className="card"><h3>🚙 Used Car Consultation</h3><p>Know which used cars are worth buying and which ones to avoid.</p></div>
          <div className="card"><h3>📊 Car Comparison</h3><p>Compare cars based on price, mileage, safety, features and maintenance.</p></div>
          <div className="card"><h3>💰 Budget Planning</h3><p>We'll help you decide the ideal budget before purchasing your car.</p></div>
        </div>
      </section>

      <section className="how" id="how">
        <h2>How It Works</h2>
        <div className="cards">
          <div className="card"><h3>1️⃣ Share Your Requirements</h3><p>Tell us your budget, needs, and lifestyle.</p></div>
          <div className="card"><h3>2️⃣ We Compare & Research</h3><p>We analyze cars on safety, mileage, cost, and resale value.</p></div>
          <div className="card"><h3>3️⃣ Get Honest Advice</h3><p>Receive a clear recommendation — no sales pressure.</p></div>
          <div className="card"><h3>4️⃣ Buy with Confidence</h3><p>Move forward knowing you made the right choice.</p></div>
        </div>
      </section>

      <section className="about" id="about">
        <h2>About Us</h2>
        <p>At <strong>Harsha Car Advisor</strong>, we provide independent car-buying consultation to help customers make informed decisions. We are not affiliated with any dealership or car brand.</p>
      </section>

      <section className="contact" id="contact">
        <h2>Contact Us</h2>
        <p>
          <a href={`tel:+91${DISPLAY_PHONE}`}>
            📞 Phone: +91 {DISPLAY_PHONE}
          </a>
        </p>
        <p>
          <a href={`mailto:${DISPLAY_EMAIL}`}>📧 Email: {DISPLAY_EMAIL}</a>
        </p>
        <p>📍 Tamil Nadu, India</p>
      </section>

      {/* POPUP CONSULTATION FORM */}
      {showForm && (
        <div className="modal" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={() => setShowForm(false)}>×</span>
            <h2>Get Free Car Consultation</h2>
            <p style={{ marginBottom: "1rem", color: "#666" }}>I'll reply within 24 hours</p>
            <form onSubmit={handleSubmit}>

              <input
                type="hidden"
                name="subject"
                value="New Car Consultation Request"
              />

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
              />
             
              <select name="budget" value={form.budget} onChange={handleChange} required>
                <option value="">Select Budget</option>
                <option>Under 5 Lakhs</option>
                <option>5-10 Lakhs</option>
                <option>10-20 Lakhs</option>
                <option>20 Lakhs+</option>
              </select>
              <select name="carType" value={form.carType} onChange={handleChange}>
                <option value="">New or Used Car?</option>
                <option>New Car</option>
                <option>Used Car</option>
                <option>Not Sure</option>
              </select>
              <textarea name="message" placeholder="What car are you looking for?" rows="3" value={form.message} onChange={handleChange}></textarea>
              <button type="submit" className="primary-btn" disabled={!isFormValid}>
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}

      <footer>
        <p>© 2026 Harsha Car Advisor. All Rights Reserved.</p>
      </footer>
    </>
  );
}

export default App;