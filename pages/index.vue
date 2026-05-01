<template>
  <v-app class="tipme-page">
    <!-- NAVBAR -->
    <nav class="navbar">
      <div class="brand" @click="scrollToSection('home')">
        <div class="brand-icon">T</div>

        <div class="brand-text">
          <h3>TipMe</h3>
          <span>Digital tipping made simple</span>
        </div>
      </div>

      <!-- DESKTOP NAV -->
      <div class="nav-actions desktop-nav">
        <button @click="scrollToSection('home')">Home</button>
        <button @click="scrollToSection('about')">About</button>
        <button @click="scrollToSection('who')">Who Uses It</button>
        <button @click="scrollToSection('steps')">How It Works</button>
        <button @click="goTo('/wallet')">Wallet</button>
        <button @click="goTo('/terms')">Terms</button>

        <button class="nav-cta" @click="scrollToSection('steps')">
          Get Started
        </button>
      </div>

      <!-- MOBILE NAV ACTIONS -->
      <div class="mobile-nav-actions">
        <button class="mobile-cta" @click="handleMobileNav('steps')">
          Start
        </button>

        <button class="menu-btn" @click="mobileMenu = !mobileMenu">
          <v-icon color="white">
            {{ mobileMenu ? "mdi-close" : "mdi-menu" }}
          </v-icon>
        </button>
      </div>

      <!-- MOBILE DROPDOWN -->
      <transition name="mobile-menu">
        <div v-if="mobileMenu" class="mobile-menu">
          <button @click="handleMobileNav('home')">
            <v-icon size="18" color="#b6ff00">mdi-home-outline</v-icon>
            Home
          </button>

          <button @click="handleMobileNav('about')">
            <v-icon size="18" color="#b6ff00">mdi-information-outline</v-icon>
            About
          </button>

          <button @click="handleMobileNav('who')">
            <v-icon size="18" color="#b6ff00">mdi-account-group-outline</v-icon>
            Who Uses It
          </button>

          <button @click="handleMobileNav('steps')">
            <v-icon size="18" color="#b6ff00">mdi-map-marker-path</v-icon>
            How It Works
          </button>

          <button @click="handleMobileRoute('/wallet')">
            <v-icon size="18" color="#b6ff00">mdi-wallet-outline</v-icon>
            Wallet
          </button>

          <button @click="handleMobileRoute('/terms')">
            <v-icon size="18" color="#b6ff00">mdi-file-document-outline</v-icon>
            Terms
          </button>
        </div>
      </transition>
    </nav>

    <!-- HERO -->
    <section id="home" class="hero-section">
      <div class="hero-bg"></div>

      <div class="hero-content">
        <div class="hero-left">
          <div class="pill">
            <span></span>
            No app needed. Just scan and tip.
          </div>

          <h1>
            Tipping made
            <br />
            simple, fast
            <br />
            and digital.
          </h1>

          <p>
            TipMe helps customers tip workers, creators, service teams and
            businesses instantly using QR codes and mobile payments.
          </p>

          <div class="hero-buttons">
            <button class="primary-btn" @click="scrollToSection('steps')">
              Get Started
              <v-icon size="18" color="black">mdi-arrow-right</v-icon>
            </button>

            <button class="secondary-btn" @click="scrollToSection('about')">
              Learn More
            </button>
          </div>

          <div class="hero-stats">
            <div>
              <h4>QR</h4>
              <span>Scan to tip</span>
            </div>

            <div>
              <h4>M-Pesa</h4>
              <span>Mobile payments</span>
            </div>

            <div>
              <h4>Instant</h4>
              <span>Fast experience</span>
            </div>
          </div>
        </div>

        <div class="hero-right">
          <div class="phone-card">
            <div class="phone-top">
              <div>
                <span>TipMe Wallet</span>
                <h3>KES 12,450</h3>
              </div>

              <div class="status-dot"></div>
            </div>

            <div class="qr-box">
              <div class="qr-inner">
                <div class="qr-grid"></div>
              </div>
            </div>

            <div class="tip-row">
              <div>
                <small>Recent tip</small>
                <strong>KES 250</strong>
              </div>
              <span>Completed</span>
            </div>

            <div class="tip-row">
              <div>
                <small>Payment method</small>
                <strong>M-Pesa</strong>
              </div>
              <span>Active</span>
            </div>
          </div>

          <div class="floating-card card-one">
            <strong>KES 500</strong>
            <span>New tip received</span>
          </div>

          <div class="floating-card card-two">
            <strong>QR Active</strong>
            <span>Ready to receive tips</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ABOUT -->
    <section id="about" class="about-section">
      <div class="section-container">
        <div class="section-heading">
          <div class="section-pill">About TipMe</div>

          <h2>
            A modern way to receive tips without forcing users to download an app.
          </h2>

          <p>
            TipMe gives every creator, worker, waiter, rider, receptionist,
            performer or business a simple QR payment identity. Customers scan,
            enter an amount, pay, and the tip is recorded instantly.
          </p>
        </div>

        <div class="about-grid">
          <div class="about-card large-card">
            <div class="card-icon">01</div>
            <h3>No app required</h3>
            <p>
              Customers do not need to install anything. They simply scan a QR
              code and complete the tip using mobile money.
            </p>
          </div>

          <div class="about-card">
            <div class="card-icon">02</div>
            <h3>Built for mobile money</h3>
            <p>
              Designed around M-Pesa and local payment behavior, making it easy
              for people to tip in seconds.
            </p>
          </div>

          <div class="about-card">
            <div class="card-icon">03</div>
            <h3>Track every tip</h3>
            <p>
              Users can see their wallet activity, balances, transactions and
              received tips from one place.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- WHO USES IT -->
    <section id="who" class="who-section">
      <div class="section-container">
        <div class="section-heading compact">
          <div class="section-pill">Who is TipMe for?</div>

          <h2>Built for people and businesses that receive appreciation.</h2>
        </div>

        <div class="who-grid">
          <div class="who-card">
            <h3>For Creators</h3>
            <ul>
              <li>Musicians and performers</li>
              <li>Online creators</li>
              <li>Artists and entertainers</li>
              <li>Community personalities</li>
            </ul>
          </div>

          <div class="who-card featured">
            <h3>For Service Workers</h3>
            <ul>
              <li>Waiters and waitresses</li>
              <li>Salon and barber staff</li>
              <li>Riders and delivery teams</li>
              <li>Hotel and hospitality workers</li>
            </ul>
          </div>

          <div class="who-card">
            <h3>For Businesses</h3>
            <ul>
              <li>Restaurants and lounges</li>
              <li>Hotels and guest houses</li>
              <li>Events and activations</li>
              <li>Customer-facing teams</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- STEPS -->
    <section id="steps" class="steps-section">
      <div class="section-container">
        <div class="section-heading compact">
          <div class="section-pill">How it works</div>

          <h2>Simple enough for anyone to use.</h2>
        </div>

        <div class="steps-grid">
          <div class="step-card">
            <span>1</span>
            <h3>Create profile</h3>
            <p>
              A user or business creates a TipMe profile and receives a unique QR code.
            </p>
          </div>

          <div class="step-card">
            <span>2</span>
            <h3>Share QR</h3>
            <p>
              The QR code can be printed, placed on tables, shared online or
              displayed on a phone.
            </p>
          </div>

          <div class="step-card">
            <span>3</span>
            <h3>Customer tips</h3>
            <p>
              The customer scans, enters an amount and pays using mobile money.
            </p>
          </div>

          <div class="step-card">
            <span>4</span>
            <h3>Track wallet</h3>
            <p>
              The receiver can monitor tips, balances and transactions from their wallet.
            </p>
          </div>
        </div>
      </div>
    </section>
  </v-app>
</template>

<script>
export default {
  name: "IndexPage",

  data() {
    return {
      mobileMenu: false,
    };
  },

  methods: {
    scrollToSection(id) {
      const target = document.getElementById(id);

      if (!target) return;

      const navbarOffset = 90;
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - navbarOffset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    },

    goTo(path) {
      this.$router.push(path);
    },

    handleMobileNav(id) {
      this.mobileMenu = false;

      this.$nextTick(() => {
        this.scrollToSection(id);
      });
    },

    handleMobileRoute(path) {
      this.mobileMenu = false;
      this.goTo(path);
    },
  },
};
</script>

<style scoped>
.tipme-page {
  min-height: 100vh;
  background: #050505;
  color: white;
  font-family: "Inter", "Poppins", Arial, sans-serif;
  overflow-x: hidden;
}

/* NAVBAR */
.navbar {
  position: fixed;
  top: 18px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 48px);
  max-width: 1180px;
  height: 72px;
  z-index: 999;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  padding: 0 18px;
  border-radius: 24px;

  background: rgba(8, 8, 8, 0.82);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.45);
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  flex-shrink: 0;
}

.brand-icon {
  width: 42px;
  height: 42px;
  border-radius: 15px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #b6ff00, #00ff99);
  color: black;
  font-weight: 900;
  font-size: 20px;
  box-shadow: 0 0 30px rgba(182, 255, 0, 0.35);
}

.brand h3 {
  margin: 0;
  font-size: 17px;
  line-height: 1;
}

.brand span {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
}

/* DESKTOP NAV */
.nav-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  flex: 1;
  white-space: nowrap;
}

.nav-actions button {
  border: 0;
  outline: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.75);
  padding: 10px 12px;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 700;
  font-size: 13px;
  white-space: nowrap;
  transition: 0.2s ease;
}

.nav-actions button:hover {
  background: rgba(255, 255, 255, 0.08);
  color: white;
}

.nav-actions .nav-cta {
  color: black;
  background: linear-gradient(135deg, #b6ff00, #00ff99);
  box-shadow: 0 0 30px rgba(182, 255, 0, 0.25);
}

/* MOBILE NAV */
.mobile-nav-actions {
  display: none;
  align-items: center;
  gap: 8px;
}

.mobile-cta {
  border: 0;
  height: 38px;
  padding: 0 16px;
  border-radius: 999px;
  color: black;
  font-size: 13px;
  font-weight: 900;
  background: linear-gradient(135deg, #b6ff00, #00ff99);
  box-shadow: 0 0 24px rgba(182, 255, 0, 0.25);
}

.menu-btn {
  width: 42px;
  height: 42px;
  border: 0;
  border-radius: 15px;
  display: grid;
  place-items: center;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.08);
}

/* MOBILE DROPDOWN */
.mobile-menu {
  position: absolute;
  top: 82px;
  left: 0;
  width: 100%;
  padding: 12px;
  border-radius: 24px;

  background: rgba(8, 8, 8, 0.96);
  border: 1px solid rgba(255, 255, 255, 0.09);
  backdrop-filter: blur(24px);
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.65);
}

.mobile-menu button {
  width: 100%;
  height: 52px;
  border: 0;
  border-radius: 16px;

  display: flex;
  align-items: center;
  gap: 12px;

  padding: 0 16px;
  margin-bottom: 6px;

  color: white;
  background: transparent;
  font-size: 14px;
  font-weight: 800;
  text-align: left;
}

.mobile-menu button:hover {
  background: rgba(255, 255, 255, 0.07);
}

.mobile-menu button:last-child {
  margin-bottom: 0;
}

/* DROPDOWN ANIMATION */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.22s ease;
}

.mobile-menu-enter,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}

/* HERO */
.hero-section {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  padding: 130px 24px 80px;
  display: flex;
  align-items: center;
}

.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 15% 25%, rgba(182, 255, 0, 0.22), transparent 28%),
    radial-gradient(circle at 85% 20%, rgba(0, 255, 153, 0.15), transparent 26%),
    radial-gradient(circle at 50% 100%, rgba(255, 255, 255, 0.06), transparent 30%),
    linear-gradient(135deg, #050505 0%, #090909 45%, #020202 100%);
}

.hero-bg::after {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.08;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.16) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.16) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: linear-gradient(to bottom, black, transparent 85%);
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 1180px;
  width: 100%;
  margin: 0 auto;

  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  align-items: center;
  gap: 60px;
}

.hero-left {
  max-width: 650px;
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  margin-bottom: 26px;

  border-radius: 999px;
  color: rgba(255, 255, 255, 0.78);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);

  font-size: 13px;
  font-weight: 700;
}

.pill span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #b6ff00;
  box-shadow: 0 0 18px rgba(182, 255, 0, 0.9);
}

.hero-left h1 {
  margin: 0;
  font-size: clamp(48px, 7vw, 94px);
  line-height: 0.93;
  letter-spacing: -5px;
  font-weight: 950;
}

.hero-left p {
  max-width: 560px;
  margin: 28px 0 0;
  color: rgba(255, 255, 255, 0.68);
  font-size: 18px;
  line-height: 1.7;
}

.hero-buttons {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 34px;
}

.primary-btn,
.secondary-btn {
  height: 54px;
  border: 0;
  border-radius: 999px;
  padding: 0 24px;
  cursor: pointer;
  font-weight: 900;
  font-size: 15px;
}

.primary-btn {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: black;
  background: linear-gradient(135deg, #b6ff00, #00ff99);
  box-shadow: 0 22px 50px rgba(182, 255, 0, 0.22);
}

.secondary-btn {
  color: white;
  background: rgba(255, 255, 255, 0.08);
}

.hero-stats {
  display: flex;
  gap: 16px;
  margin-top: 42px;
  flex-wrap: wrap;
}

.hero-stats div {
  min-width: 130px;
  padding: 18px 20px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.hero-stats h4 {
  margin: 0 0 6px;
  font-size: 20px;
}

.hero-stats span {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.52);
}

/* RIGHT MOCKUP */
.hero-right {
  position: relative;
  min-height: 560px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.phone-card {
  position: relative;
  width: 360px;
  min-height: 560px;
  padding: 24px;
  border-radius: 42px;

  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.035)),
    #080808;

  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow:
    0 50px 120px rgba(0, 0, 0, 0.75),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);
}

.phone-card::before {
  content: "";
  position: absolute;
  inset: -1px;
  border-radius: 42px;
  padding: 1px;
  background: linear-gradient(
    135deg,
    rgba(182, 255, 0, 0.65),
    transparent,
    rgba(0, 255, 153, 0.5)
  );
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  pointer-events: none;
}

.phone-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.phone-top span {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.56);
}

.phone-top h3 {
  margin: 6px 0 0;
  font-size: 30px;
  letter-spacing: -1px;
}

.status-dot {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #b6ff00;
  box-shadow: 0 0 20px rgba(182, 255, 0, 0.9);
}

.qr-box {
  margin-top: 38px;
  padding: 22px;
  border-radius: 32px;
  background: #ffffff;
}

.qr-inner {
  height: 230px;
  border-radius: 22px;
  background: #000000;
  overflow: hidden;
  position: relative;
}

.qr-grid {
  position: absolute;
  inset: 18px;
  background:
    linear-gradient(90deg, #fff 14px, transparent 14px) 0 0 / 38px 38px,
    linear-gradient(#fff 14px, transparent 14px) 0 0 / 38px 38px,
    linear-gradient(90deg, transparent 24px, #fff 24px) 0 0 / 52px 52px;
  opacity: 0.9;
}

.tip-row {
  margin-top: 18px;
  padding: 17px;
  border-radius: 22px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: rgba(255, 255, 255, 0.065);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.tip-row small {
  display: block;
  color: rgba(255, 255, 255, 0.52);
  margin-bottom: 5px;
}

.tip-row strong {
  font-size: 17px;
}

.tip-row > span {
  color: #b6ff00;
  font-size: 12px;
  font-weight: 800;
}

.floating-card {
  position: absolute;
  padding: 16px 18px;
  border-radius: 22px;
  background: rgba(10, 10, 10, 0.78);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(18px);
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.45);
}

.floating-card strong {
  display: block;
  font-size: 18px;
  margin-bottom: 4px;
}

.floating-card span {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.55);
}

.card-one {
  top: 95px;
  left: 10px;
}

.card-two {
  right: 0;
  bottom: 115px;
}

/* SHARED SECTIONS */
.section-container {
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
}

.section-heading {
  max-width: 850px;
  margin-bottom: 50px;
}

.section-heading.compact {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

.section-pill {
  display: inline-flex;
  margin-bottom: 18px;
  padding: 9px 14px;
  border-radius: 999px;
  color: #b6ff00;
  background: rgba(182, 255, 0, 0.08);
  border: 1px solid rgba(182, 255, 0, 0.18);
  font-size: 13px;
  font-weight: 900;
}

.section-heading h2 {
  margin: 0;
  font-size: clamp(34px, 5vw, 62px);
  line-height: 1;
  letter-spacing: -3px;
  font-weight: 950;
}

.section-heading p {
  max-width: 720px;
  margin-top: 24px;
  color: rgba(255, 255, 255, 0.65);
  font-size: 18px;
  line-height: 1.8;
}

/* ABOUT */
.about-section {
  position: relative;
  padding: 120px 24px 90px;
  background:
    radial-gradient(circle at 80% 10%, rgba(182, 255, 0, 0.11), transparent 28%),
    linear-gradient(180deg, #050505 0%, #080808 100%);
}

.about-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.95fr 0.95fr;
  gap: 22px;
}

.about-card {
  min-height: 280px;
  padding: 30px;
  border-radius: 34px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.085), rgba(255, 255, 255, 0.035));
  border: 1px solid rgba(255, 255, 255, 0.09);
  box-shadow: 0 35px 90px rgba(0, 0, 0, 0.35);
}

.large-card {
  min-height: 360px;
  background:
    radial-gradient(circle at 20% 10%, rgba(182, 255, 0, 0.18), transparent 34%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.035));
}

.card-icon {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  margin-bottom: 30px;
  color: black;
  background: linear-gradient(135deg, #b6ff00, #00ff99);
  font-weight: 950;
}

.about-card h3,
.who-card h3,
.step-card h3 {
  margin: 0 0 14px;
  font-size: 25px;
  letter-spacing: -1px;
}

.about-card p,
.step-card p {
  margin: 0;
  color: rgba(255, 255, 255, 0.62);
  font-size: 15px;
  line-height: 1.8;
}

/* WHO */
.who-section {
  padding: 100px 24px;
  background: #050505;
}

.who-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.who-card {
  padding: 32px;
  border-radius: 34px;
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.who-card.featured {
  background:
    radial-gradient(circle at 50% 0%, rgba(182, 255, 0, 0.18), transparent 36%),
    rgba(255, 255, 255, 0.07);
  border-color: rgba(182, 255, 0, 0.22);
}

.who-card ul {
  padding: 0;
  margin: 20px 0 0;
  list-style: none;
}

.who-card li {
  padding: 12px 0;
  color: rgba(255, 255, 255, 0.68);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

/* STEPS */
.steps-section {
  padding: 100px 24px 130px;
  background:
    radial-gradient(circle at 50% 100%, rgba(182, 255, 0, 0.12), transparent 32%),
    #070707;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

.step-card {
  padding: 28px;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.step-card span {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  margin-bottom: 26px;
  border-radius: 14px;
  color: black;
  background: linear-gradient(135deg, #b6ff00, #00ff99);
  font-weight: 950;
}

/* GLOBAL VUETIFY FIXES */
::v-deep .v-btn {
  text-transform: none !important;
}

/* MEDIUM NAV FIX */
@media (max-width: 1120px) {
  .brand span {
    display: none;
  }

  .nav-actions {
    gap: 4px;
  }

  .nav-actions button {
    padding: 9px 10px;
    font-size: 12px;
  }
}

/* TABLET */
@media (max-width: 960px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 50px;
  }

  .hero-left {
    max-width: 100%;
    text-align: center;
  }

  .hero-left p {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-buttons,
  .hero-stats {
    justify-content: center;
  }

  .hero-right {
    min-height: auto;
  }

  .about-grid,
  .who-grid {
    grid-template-columns: 1fr;
  }

  .steps-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .large-card {
    min-height: 280px;
  }
}

/* MOBILE NAV SWITCH */
@media (max-width: 900px) {
  .desktop-nav {
    display: none;
  }

  .mobile-nav-actions {
    display: flex;
  }

  .navbar {
    top: 14px;
    width: calc(100% - 28px);
    height: 70px;
    border-radius: 24px;
    padding: 0 14px;
  }
}

/* MOBILE */
@media (max-width: 720px) {
  .hero-section {
    padding: 110px 16px 56px;
  }

  .hero-left h1 {
    font-size: 48px;
    letter-spacing: -2.6px;
  }

  .hero-left p {
    font-size: 15px;
  }

  .hero-buttons {
    flex-direction: column;
  }

  .primary-btn,
  .secondary-btn {
    width: 100%;
  }

  .hero-stats {
    display: grid;
    grid-template-columns: 1fr;
  }

  .phone-card {
    width: 100%;
    max-width: 350px;
    min-height: auto;
    border-radius: 34px;
  }

  .qr-inner {
    height: 190px;
  }

  .floating-card {
    display: none;
  }

  .section-heading h2 {
    letter-spacing: -1.8px;
  }

  .about-section,
  .who-section,
  .steps-section {
    padding-left: 16px;
    padding-right: 16px;
  }

  .steps-grid {
    grid-template-columns: 1fr;
  }
}

/* SMALL MOBILE */
@media (max-width: 480px) {
  .navbar {
    width: calc(100% - 20px);
    height: 66px;
    top: 10px;
    border-radius: 22px;
  }

  .brand {
    gap: 9px;
  }

  .brand-icon {
    width: 40px;
    height: 40px;
    border-radius: 14px;
    font-size: 18px;
  }

  .brand h3 {
    font-size: 15px;
  }

  .brand span {
    display: none;
  }

  .mobile-cta {
    height: 36px;
    padding: 0 14px;
    font-size: 12px;
  }

  .menu-btn {
    width: 40px;
    height: 40px;
    border-radius: 14px;
  }

  .mobile-menu {
    top: 76px;
    border-radius: 22px;
  }
}
</style>