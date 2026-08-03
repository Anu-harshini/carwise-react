import { useState } from "react";
import "./App.css";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({name: "", email: "", phone: "", budget: "", carType: "", message: ""});

  const DISPLAY_PHONE = "8825625498";
  const DISPLAY_EMAIL = "harsharaja505@gmail.com";
  const ACCESS_KEY = "426a3361-bb95-4f68-80b5-c2d94f10684f";

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && !/^\d{0,10}$/.test(value)) return;
    setForm({...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("access_key", ACCESS_KEY);
    formData.append("subject", "New Car Consultation Request");
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("phone", `+91${form.phone}`);
    formData.append("budget", form.budget);
    formData.append("car_type", form.carType);
    formData.append("message", form.message);
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const result = await res.json();
      if (result.success) {
        alert(`Thank you ${form.name}! I'll reply within 24 hours.`);
        setForm({ name: "", email: "", phone: "", budget: "", carType: "", message: "" });
        setShowForm(false);
      } else { alert("Failed to send."); }
    } catch { alert("Network error."); } 
    finally { setLoading(false); }
  };

  const isFormValid = form.name.length > 1 && form.email.includes("@") && form.phone.length === 10 && form.budget;

  return (
    <div>
      <nav>
        <h2>Harsha Car Advisor</h2>
        <ul><li><a href="#home">Home</a></li><li><a href="#reviews">Reviews</a></li><li><a href="#contact">Contact</a></li></ul>
      </nav>

      <div id="home" style={{padding:"80px 20px", textAlign:"center", background:"#2563eb", color:"white"}}>
        <h1>Find the Perfect Car for Your Budget</h1>
        <h3>No Sales Pressure. Just Honest Advice.</h3>
        <button onClick={() => setShowForm(true)} style={{padding:"12px 30px", background:"white", color:"#2563eb", border:"none", borderRadius:"8px", fontSize:"18px"}}>Get Consult</button>
      </div>

      <section id="reviews" style={{padding:"60px 20px", background:"#f8f9fa"}}>
        <h2 style={{textAlign:"center"}}>What Our Customers Say</h2>
        <div style={{maxWidth:"900px", margin:"40px auto", display:"grid", gap:"20px"}}>
          {["Harini Sundar: Good service and quick support.", "Chitukuru Priya: Harsha helped me choose the right car.", "Jayasree B S: Consultation was detailed and helpful."].map((r, i) => (
            <div key={i} style={{background:"white", padding:"25px", borderRadius:"12px"}}>{r}</div>
          ))}
        </div>
        <div style={{textAlign:"center"}}>
          <a href="https://g.page/r/CSRcafnSZi6mEAE/review" target="_blank" style={{padding:"15px 35px", background:"#4285F4", color:"white", textDecoration:"none", borderRadius:"10px"}}>⭐ Leave us a Google Review</a>
        </div>
      </section>

      <section id="contact" style={{padding:"60px 20px", textAlign:"center"}}>
        <h2>Contact Us</h2>
        <p>📞 +91 {DISPLAY_PHONE} | 📧 {DISPLAY_EMAIL}</p>
      </section>

      <footer style={{padding:"20px", textAlign:"center", background:"#111", color:"white"}}>
        <p>© 2026 Harsha Car Advisor</p>
      </footer>
    </div>
  );
}
export default App;