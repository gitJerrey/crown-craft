import { useState } from "react";

// ---------- Sample data (replace with real barbers as you recruit) ----------
const BARBERS = [
  {
    id: 1,
    name: "Dre W.",
    tag: "Fade specialist",
    services: ["Fades", "Line-ups", "Beards"],
    area: "Downtown Kitchener",
    mobile: false,
    priceFrom: 35,
    bio: "12 years behind the chair. Skin fades, tapers, sharp line-ups.",
    initials: "DW",
    accent: "#C9A227",
  },
  {
    id: 2,
    name: "Kofi A.",
    tag: "Mobile barber",
    services: ["Fades", "Kids", "Line-ups"],
    area: "Serves KW & Cambridge",
    mobile: true,
    priceFrom: 40,
    bio: "Comes to you — home setups, offices, dorms. Evenings & weekends.",
    initials: "KA",
    accent: "#7A9E7E",
  },
  {
    id: 3,
    name: "Simone B.",
    tag: "Braids & locs",
    services: ["Braids", "Locs", "Twists"],
    area: "Waterloo",
    mobile: false,
    priceFrom: 60,
    bio: "Knotless braids, loc retwists, protective styles. By appointment.",
    initials: "SB",
    accent: "#B0563C",
  },
  {
    id: 4,
    name: "Marcus T.",
    tag: "All textures",
    services: ["Fades", "Beards", "Kids"],
    area: "Fairway / East Kitchener",
    mobile: true,
    priceFrom: 30,
    bio: "Patient with first-timers and kids. Mobile on Sundays.",
    initials: "MT",
    accent: "#4E6E8E",
  },
  {
    id: 5,
    name: "Amara O.",
    tag: "Natural hair",
    services: ["Braids", "Twists", "Silk press"],
    area: "Uptown Waterloo",
    mobile: false,
    priceFrom: 55,
    bio: "Healthy-hair-first styling for all curl patterns.",
    initials: "AO",
    accent: "#8E5E8A",
  },
  {
    id: 6,
    name: "Jerome K.",
    tag: "Classic cuts",
    services: ["Fades", "Line-ups", "Designs"],
    area: "Country Hills",
    mobile: true,
    priceFrom: 35,
    bio: "Freestyle designs and clean fades. DM portfolio available.",
    initials: "JK",
    accent: "#C9A227",
  },
  {
    id: 7,
    name: "Tunde F.",
    tag: "Fades & designs",
    services: ["Fades", "Designs", "Beards"],
    area: "Galt, Cambridge",
    mobile: false,
    priceFrom: 35,
    bio: "Home studio in Galt. Crisp fades, freestyle designs, beard sculpting.",
    initials: "TF",
    accent: "#4E6E8E",
  },
  {
    id: 8,
    name: "Nia D.",
    tag: "Braids & twists",
    services: ["Braids", "Twists", "Kids"],
    area: "Hespeler, Cambridge",
    mobile: true,
    priceFrom: 50,
    bio: "Knotless, boho, and kids' styles. Mobile across Cambridge & Kitchener.",
    initials: "ND",
    accent: "#8E5E8A",
  },
];

const SERVICES = ["All", "Fades", "Line-ups", "Beards", "Braids", "Locs", "Twists", "Kids", "Designs", "Silk press"];

// ---------- App ----------
export default function App() {
  const [filter, setFilter] = useState("All");
  const [booking, setBooking] = useState(null); // barber being booked
  const [sent, setSent] = useState(false);
  const [waitlistDone, setWaitlistDone] = useState(false);
  const [barberDone, setBarberDone] = useState(false);

  const shown = BARBERS.filter(
    (b) => filter === "All" || b.services.includes(filter)
  );

  return (
    <div className="page">
      <style>{css}</style>

      {/* ---------- Hero ---------- */}
      <header className="hero">
        <nav className="nav">
          <div className="logo">
            CROWN<span className="logoDot">&</span>CRAFT
          </div>
          <a href="#barbers" className="navLink">Find a barber</a>
        </nav>
        <h1 className="heroTitle">
          Your crown,<br />in expert hands.
        </h1>
        <p className="heroSub">
          Barbers and stylists across Kitchener, Waterloo & Cambridge who
          actually know textured hair — shop chairs, home studios, and mobile
          barbers who come to you.
        </p>
        <a href="#barbers" className="heroCta">Browse barbers</a>
      </header>

      {/* ---------- Filters ---------- */}
      <section className="filters" id="barbers">
        <div className="filterLabel">Pick your service</div>
        <div className="chipRow">
          {SERVICES.map((s, i) => (
            <button
              key={s}
              className={"chip" + (filter === s ? " chipOn" : "")}
              onClick={() => setFilter(s)}
            >
              {s !== "All" && <span className="guard">#{i}</span>}
              {s}
            </button>
          ))}
        </div>
      </section>

      {/* ---------- Barber grid ---------- */}
      <section className="grid">
        {shown.map((b) => (
          <article className="card" key={b.id}>
            <div className="cardTop">
              <div className="avatar" style={{ background: b.accent }}>
                {b.initials}
              </div>
              <div>
                <h3 className="cardName">{b.name}</h3>
                <div className="cardTag">{b.tag}</div>
              </div>
              {b.mobile && <span className="mobileBadge">Mobile</span>}
            </div>
            <p className="cardBio">{b.bio}</p>
            <div className="cardMeta">
              <span>{b.area}</span>
              <span>From ${b.priceFrom}</span>
            </div>
            <div className="tagRow">
              {b.services.map((s) => (
                <span className="miniTag" key={s}>{s}</span>
              ))}
            </div>
            <button
              className="bookBtn"
              onClick={() => {
                setBooking(b);
                setSent(false);
              }}
            >
              Request a cut
            </button>
          </article>
        ))}
        {shown.length === 0 && (
          <p className="empty">No barbers offer that yet — join the waitlist below and we'll recruit one.</p>
        )}
      </section>

      {/* ---------- Waitlist + barber signup ---------- */}
      <section className="split">
        <div className="panel">
          <h2 className="panelTitle">Looking for a barber?</h2>
          <p className="panelText">
            Tell us what you need and we'll text you when a matching barber joins.
          </p>
          {waitlistDone ? (
            <div className="done">You're on the list. We'll be in touch.</div>
          ) : (
            <div className="formRow">
              <input className="input" placeholder="Your phone number" />
              <button className="panelBtn" onClick={() => setWaitlistDone(true)}>
                Join waitlist
              </button>
            </div>
          )}
        </div>
        <div className="panel panelAlt">
          <h2 className="panelTitle">Are you a barber or stylist?</h2>
          <p className="panelText">
            Free profile, zero commission. Shop chair, home studio, or mobile —
            get found by clients across Kitchener, Waterloo & Cambridge.
          </p>
          {barberDone ? (
            <div className="done">Got it — we'll reach out to set up your profile.</div>
          ) : (
            <div className="formRow">
              <input className="input" placeholder="Instagram or phone" />
              <button className="panelBtn" onClick={() => setBarberDone(true)}>
                Claim your spot
              </button>
            </div>
          )}
        </div>
      </section>

      <footer className="footer">
        Crown & Craft — crownandcraft.ca · Kitchener · Waterloo · Cambridge
      </footer>

      {/* ---------- Booking modal ---------- */}
      {booking && (
        <div className="overlay" onClick={() => setBooking(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            {sent ? (
              <>
                <h3 className="modalTitle">Request sent ✂️</h3>
                <p className="modalText">
                  {booking.name} will text you back to confirm a time. Most
                  barbers reply within a few hours.
                </p>
                <button className="bookBtn" onClick={() => setBooking(null)}>
                  Done
                </button>
              </>
            ) : (
              <>
                <h3 className="modalTitle">Request a cut with {booking.name}</h3>
                <label className="lab">Your name</label>
                <input className="input" placeholder="First name" />
                <label className="lab">Phone number</label>
                <input className="input" placeholder="For text confirmation" />
                <label className="lab">Service</label>
                <select className="input">
                  {booking.services.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                <label className="lab">Preferred day / time</label>
                <input className="input" placeholder="e.g. Saturday afternoon" />
                <button className="bookBtn" onClick={() => setSent(true)}>
                  Send request
                </button>
                <button className="ghostBtn" onClick={() => setBooking(null)}>
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- Styles ----------
const css = `
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Work+Sans:wght@400;500;600;700&display=swap');

* { box-sizing: border-box; margin: 0; }
.page {
  font-family: 'Work Sans', sans-serif;
  background: #F5EFE3;
  color: #221C16;
  min-height: 100vh;
}

/* Hero */
.hero {
  background: #1E3A2F;
  color: #F5EFE3;
  padding: 24px 24px 72px;
}
.nav {
  display: flex; justify-content: space-between; align-items: center;
  max-width: 1080px; margin: 0 auto 56px;
}
.logo {
  font-family: 'Anton', sans-serif;
  font-size: 22px; letter-spacing: 2px;
}
.logoDot { color: #C9A227; }
.navLink {
  color: #F5EFE3; text-decoration: none; font-weight: 600; font-size: 14px;
  border-bottom: 2px solid #C9A227; padding-bottom: 2px;
}
.heroTitle {
  font-family: 'Anton', sans-serif;
  font-size: clamp(44px, 8vw, 88px);
  line-height: 1.02;
  text-transform: uppercase;
  max-width: 1080px; margin: 0 auto;
}
.heroSub {
  max-width: 1080px; margin: 20px auto 0;
  font-size: 18px; line-height: 1.6; opacity: .85; max-width: 560px;
  margin-left: auto; margin-right: auto;
}
.hero > .heroSub, .hero > .heroCta { display: block; }
.hero .heroSub { margin: 20px auto 0; }
@media (min-width: 1080px) {
  .hero .heroSub { margin-left: calc((100% - 1080px)/2); margin-right: auto; }
}
.heroCta {
  display: inline-block; margin: 32px auto 0;
  background: #C9A227; color: #221C16;
  font-weight: 700; text-decoration: none;
  padding: 14px 28px; border-radius: 4px;
}
@media (min-width: 1080px) {
  .hero .heroCta { margin-left: calc((100% - 1080px)/2); }
}

/* Filters */
.filters { max-width: 1080px; margin: 0 auto; padding: 48px 24px 8px; }
.filterLabel {
  font-size: 12px; font-weight: 700; letter-spacing: 2px;
  text-transform: uppercase; color: #6B5E4E; margin-bottom: 14px;
}
.chipRow { display: flex; flex-wrap: wrap; gap: 8px; }
.chip {
  font-family: 'Work Sans', sans-serif;
  border: 2px solid #221C16; background: transparent;
  border-radius: 999px; padding: 8px 16px;
  font-weight: 600; font-size: 14px; cursor: pointer;
  display: flex; align-items: center; gap: 6px;
  transition: all .15s;
}
.chip:hover { background: #EAE0CC; }
.chipOn { background: #221C16; color: #F5EFE3; }
.guard {
  font-size: 11px; font-weight: 700; opacity: .55;
}

/* Grid */
.grid {
  max-width: 1080px; margin: 0 auto;
  padding: 32px 24px 64px;
  display: grid; gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
.card {
  background: #FFFDF8; border: 2px solid #221C16; border-radius: 8px;
  padding: 20px; display: flex; flex-direction: column; gap: 12px;
  box-shadow: 4px 4px 0 #221C16;
}
.cardTop { display: flex; gap: 12px; align-items: center; }
.avatar {
  width: 52px; height: 52px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: #FFFDF8; font-weight: 700; font-size: 17px; flex-shrink: 0;
}
.cardName { font-size: 19px; font-weight: 700; }
.cardTag { font-size: 13px; color: #6B5E4E; font-weight: 600; }
.mobileBadge {
  margin-left: auto; background: #1E3A2F; color: #F5EFE3;
  font-size: 11px; font-weight: 700; letter-spacing: 1px;
  text-transform: uppercase; padding: 4px 10px; border-radius: 999px;
}
.cardBio { font-size: 14px; line-height: 1.55; color: #3E362C; }
.cardMeta {
  display: flex; justify-content: space-between;
  font-size: 13px; font-weight: 600; color: #6B5E4E;
}
.tagRow { display: flex; flex-wrap: wrap; gap: 6px; }
.miniTag {
  font-size: 12px; font-weight: 600;
  background: #EAE0CC; border-radius: 4px; padding: 3px 8px;
}
.bookBtn {
  margin-top: auto; background: #C9A227; border: 2px solid #221C16;
  color: #221C16; font-weight: 700; font-size: 15px;
  padding: 11px; border-radius: 4px; cursor: pointer;
  font-family: 'Work Sans', sans-serif;
}
.bookBtn:hover { background: #D9B342; }
.empty { grid-column: 1/-1; text-align: center; color: #6B5E4E; padding: 40px 0; }

/* Split panels */
.split {
  max-width: 1080px; margin: 0 auto; padding: 0 24px 64px;
  display: grid; gap: 20px; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
.panel {
  background: #221C16; color: #F5EFE3;
  border-radius: 8px; padding: 28px;
}
.panelAlt { background: #1E3A2F; }
.panelTitle { font-family: 'Anton', sans-serif; font-size: 24px; text-transform: uppercase; letter-spacing: 1px; }
.panelText { margin: 10px 0 18px; font-size: 14px; line-height: 1.6; opacity: .85; }
.formRow { display: flex; gap: 8px; flex-wrap: wrap; }
.input {
  flex: 1; min-width: 160px;
  padding: 11px 14px; border-radius: 4px;
  border: 2px solid #221C16; font-size: 14px;
  font-family: 'Work Sans', sans-serif;
}
.panel .input { border-color: transparent; }
.panelBtn {
  background: #C9A227; border: none; color: #221C16;
  font-weight: 700; padding: 11px 20px; border-radius: 4px;
  cursor: pointer; font-family: 'Work Sans', sans-serif; font-size: 14px;
}
.done { background: rgba(201,162,39,.18); border: 1px solid #C9A227; padding: 12px 16px; border-radius: 4px; font-size: 14px; }

.footer {
  text-align: center; padding: 28px; font-size: 13px; color: #6B5E4E;
}

/* Modal */
.overlay {
  position: fixed; inset: 0; background: rgba(34,28,22,.6);
  display: flex; align-items: center; justify-content: center;
  padding: 20px; z-index: 50;
}
.modal {
  background: #FFFDF8; border-radius: 8px; border: 2px solid #221C16;
  padding: 28px; width: 100%; max-width: 420px;
  display: flex; flex-direction: column; gap: 10px;
  max-height: 90vh; overflow-y: auto;
}
.modalTitle { font-family: 'Anton', sans-serif; font-size: 22px; text-transform: uppercase; letter-spacing: .5px; }
.modalText { font-size: 14px; line-height: 1.6; color: #3E362C; margin-bottom: 6px; }
.lab { font-size: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #6B5E4E; margin-top: 6px; }
.ghostBtn {
  background: transparent; border: none; color: #6B5E4E;
  font-weight: 600; cursor: pointer; padding: 8px;
  font-family: 'Work Sans', sans-serif; font-size: 14px;
}
`;
