<template>
  <v-app class="terms-page">
    <!-- NAVBAR -->
    <nav class="terms-navbar">
      <div class="nav-brand" @click="goTo('/')">
        <div class="nav-brand-icon">T</div>

        <div class="nav-brand-text">
          <h3>TipMe</h3>
          <span>Legal & compliance</span>
        </div>
      </div>

      <!-- DESKTOP NAV -->
      <div class="nav-links desktop-nav">
        <button @click="goTo('/')">Home</button>
        <button @click="goTo('/#about')">About</button>
        <button @click="goTo('/wallet')">Wallet</button>
        <button class="active" @click="goTo('/terms')">Terms & Conditions</button>
      </div>

      <!-- MOBILE NAV -->
      <div class="mobile-nav-actions">
        <button class="mobile-home" @click="goTo('/')">
          Home
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
          <button @click="handleMobileRoute('/')">
            <v-icon size="18" color="#b6ff00">mdi-home-outline</v-icon>
            Home
          </button>

          <button @click="handleMobileRoute('/#about')">
            <v-icon size="18" color="#b6ff00">mdi-information-outline</v-icon>
            About
          </button>

          <button @click="handleMobileRoute('/wallet')">
            <v-icon size="18" color="#b6ff00">mdi-wallet-outline</v-icon>
            Wallet
          </button>

          <button class="active" @click="handleMobileRoute('/terms')">
            <v-icon size="18" color="#b6ff00">mdi-file-document-outline</v-icon>
            Terms & Conditions
          </button>
        </div>
      </transition>
    </nav>

    <!-- BACKGROUND -->
    <div class="terms-bg"></div>

    <main class="terms-shell">
      <!-- PAGE HEADER -->
      <section class="terms-hero">
        <button class="back-btn" @click="$router.back()">
          <v-icon size="20" color="white">mdi-arrow-left</v-icon>
          Back
        </button>
br
        <div class="legal-pill">
          Legal documents
        </div>

        <h1>{{ title }}</h1>

        <p>
          Review the legal, privacy, compliance, fundraising and service staff
          terms that guide how TipMe operates.
        </p>
      </section>

      <!-- CONTENT LAYOUT -->
      <section class="terms-layout">
        <!-- SIDE TABS -->
        <aside class="terms-sidebar">
          <button
            :class="{ active: terms }"
            @click="setSection('Terms & Conditions', 'terms')"
          >
            <v-icon size="18">mdi-file-document-outline</v-icon>
            Terms & Conditions
          </button>

          <button
            :class="{ active: privacy }"
            @click="setSection('Privacy Policy', 'privacy')"
          >
            <v-icon size="18">mdi-shield-lock-outline</v-icon>
            Privacy Policy
          </button>

          <button
            :class="{ active: compliance }"
            @click="setSection('Compliance', 'compliance')"
          >
            <v-icon size="18">mdi-bank-outline</v-icon>
            Compliance
          </button>

          <button
            :class="{ active: fundraising }"
            @click="setSection('Fundraising', 'fundraising')"
          >
            <v-icon size="18">mdi-hand-heart-outline</v-icon>
            Fundraising
          </button>

          <button
            :class="{ active: restaurant_terms }"
            @click="setSection('Restaurant & Service Staff Terms', 'restaurant_terms')"
          >
            <v-icon size="18">mdi-silverware-fork-knife</v-icon>
            Restaurant Terms
          </button>
        </aside>

        <!-- DOCUMENT CARD -->
        <article class="terms-card">
          <!-- TERMS -->
          <div v-show="terms" class="legal-content">
            <h2>Terms & Conditions</h2>

            <h3>1. Introduction</h3>
            <p>
              These Terms and Conditions (“Terms”) govern the access to and use of
              the TipMe digital platform (“Platform”), operated by TipMe (“the
              Company”, “we”, “us”, or “our”).
            </p>

            <p>
              By accessing, registering on, or using the Platform, you (“User”)
              acknowledge that you have read, understood, and agreed to be bound by
              these Terms.
            </p>

            <h3>2. Nature of the Platform</h3>
            <p>
              TipMe is a digital facilitation platform that enables users to receive
              voluntary tips and contributions through licensed mobile money payment
              systems, including M-Pesa.
            </p>

            <p>TipMe:</p>

            <ul>
              <li>Does not operate as a bank or financial institution.</li>
              <li>Does not issue electronic money.</li>
              <li>Does not provide lending, credit, or savings services.</li>
              <li>Does not guarantee earnings or fundraising outcomes.</li>
            </ul>

            <p>
              The Platform acts solely as a technical intermediary facilitating
              payments between supporters and recipients.
            </p>

            <h3>3. Eligibility</h3>
            <p>To use the Platform, Users must:</p>

            <ul>
              <li>Be at least 18 years of age.</li>
              <li>Possess a valid M-Pesa registered mobile number.</li>
              <li>Have legal capacity to enter into binding agreements.</li>
              <li>Use the Platform solely for lawful purposes.</li>
            </ul>

            <p>
              TipMe reserves the right to verify user information and deny access at
              its discretion.
            </p>

            <h3>4. Payments & Transactions</h3>
            <p>All payments made through TipMe:</p>

            <ul>
              <li>Are voluntary.</li>
              <li>Are non-refundable.</li>
              <li>Are processed via licensed third-party payment providers.</li>
            </ul>

            <p>
              Once a payment is confirmed through M-Pesa, it cannot be reversed
              through TipMe.
            </p>

            <p>
              TipMe bears no responsibility for disputes between supporters and
              recipients.
            </p>

            <h3>5. Fees & Charges</h3>
            <p>
              TipMe charges a platform service fee, typically ranging between 3% and
              5% per transaction.
            </p>

            <ul>
              <li>Fees are deducted prior to wallet balance reflection.</li>
              <li>M-Pesa transaction charges may apply and are typically borne by the supporter.</li>
              <li>Withdrawal fees may apply and will be disclosed prior to processing.</li>
            </ul>

            <p>
              TipMe reserves the right to revise fees with reasonable notice.
            </p>

            <h3>6. Wallet & Settlement</h3>
            <p>
              Wallet balances displayed on TipMe represent internal ledger entries
              and do not constitute stored value or deposits.
            </p>

            <p>Withdrawals are subject to:</p>

            <ul>
              <li>Settlement periods.</li>
              <li>Minimum withdrawal thresholds.</li>
              <li>Daily withdrawal limits.</li>
              <li>Compliance and fraud checks.</li>
            </ul>

            <p>
              TipMe reserves the right to delay or suspend withdrawals where
              necessary.
            </p>

            <h3>7. Suspension & Termination</h3>
            <p>
              TipMe may suspend, restrict, or terminate access to the Platform where:
            </p>

            <ul>
              <li>Fraud or misuse is suspected.</li>
              <li>Legal or regulatory obligations require action.</li>
              <li>These Terms are breached.</li>
            </ul>

            <p>
              Outstanding balances may be withheld pending investigation.
            </p>

            <h3>8. Limitation of Liability</h3>
            <p>
              To the fullest extent permitted under Kenyan law, TipMe shall not be
              liable for:
            </p>

            <ul>
              <li>Loss of income or anticipated earnings.</li>
              <li>Fundraising shortfalls.</li>
              <li>Third-party payment system failures.</li>
              <li>Indirect or consequential losses.</li>
            </ul>

            <h3>9. Governing Law</h3>
            <p>
              These Terms are governed by and construed in accordance with the laws
              of the Republic of Kenya.
            </p>
          </div>

          <!-- PRIVACY -->
          <div v-show="privacy" class="legal-content">
            <h2>Privacy Policy</h2>

            <h3>TipMe respects your privacy.</h3>

            <p>We collect:</p>

            <ul>
              <li>Account details.</li>
              <li>Transaction data.</li>
              <li>Basic device and usage data.</li>
            </ul>

            <h3>We do not:</h3>

            <ul>
              <li>Sell user data.</li>
              <li>Share data without legal cause.</li>
              <li>Store M-Pesa PINs or sensitive payment credentials.</li>
            </ul>

            <p>
              Your data is protected and used responsibly to provide, secure and
              improve the TipMe platform.
            </p>
          </div>

          <!-- COMPLIANCE -->
          <div v-show="compliance" class="legal-content">
            <h2>CBK-Facing Compliance</h2>

            <p class="muted">
              For banks, partners, and regulators.
            </p>

            <h3>Platform Classification</h3>
            <p>
              TipMe operates as a payment facilitation and aggregation platform.
            </p>

            <h3>Regulatory Position</h3>

            <ul>
              <li>Payments are processed via licensed M-Pesa infrastructure.</li>
              <li>TipMe does not issue e-money.</li>
              <li>TipMe does not store customer funds beyond settlement.</li>
              <li>TipMe uses ledger-based accounting only.</li>
            </ul>

            <h3>Risk Controls</h3>

            <ul>
              <li>T+1 settlement delays.</li>
              <li>Withdrawal limits.</li>
              <li>Fraud detection.</li>
              <li>AML monitoring.</li>
            </ul>

            <h3>Legal Alignment</h3>

            <p>TipMe aligns with:</p>

            <ul>
              <li>Kenya Data Protection Act, 2019.</li>
              <li>Computer Misuse and Cybercrimes Act.</li>
              <li>CBK oversight principles for payment facilitation.</li>
            </ul>

            <h3>Conclusion</h3>
            <p>
              TipMe does not require licensing as a Payment Service Provider at this
              stage, as it does not issue, store, or transfer electronic money
              independently.
            </p>
          </div>

          <!-- FUNDRAISING -->
          <div v-show="fundraising" class="legal-content">
            <h2>Fundraising Disclaimer</h2>

            <p>
              TipMe does not verify, endorse, or guarantee the legitimacy, accuracy,
              or purpose of any fundraising campaign hosted on the Platform.
            </p>

            <p>Users raising funds acknowledge that:</p>

            <ul>
              <li>All representations made are their sole responsibility.</li>
              <li>Funds raised must be used for the stated purpose.</li>
              <li>TipMe is not liable for misuse or misrepresentation of funds.</li>
            </ul>

            <p>
              Supporters contribute at their own discretion and risk.
            </p>

            <p>
              TipMe reserves the right to suspend fundraising campaigns suspected of
              fraud, deception, or unlawful activity.
            </p>
          </div>

          <!-- RESTAURANT TERMS -->
          <div v-show="restaurant_terms" class="legal-content">
            <h2>Restaurant & Service Staff Terms</h2>

            <p>
              These terms apply to restaurants, hospitality businesses, and service
              staff using TipMe for tipping.
            </p>

            <h3>A. Role of TipMe</h3>
            <p>
              TipMe provides a direct tipping mechanism between customers and service
              staff.
            </p>

            <p>TipMe:</p>

            <ul>
              <li>Does not employ service staff.</li>
              <li>Does not manage tip distribution.</li>
              <li>Does not arbitrate tip allocation disputes.</li>
            </ul>

            <h3>B. Employer Responsibility</h3>
            <p>Restaurants remain solely responsible for:</p>

            <ul>
              <li>Staff employment contracts.</li>
              <li>Tax obligations.</li>
              <li>Compliance with labor laws.</li>
            </ul>

            <p>
              TipMe does not assume employer obligations.
            </p>

            <h3>C. Tip Ownership</h3>
            <p>
              Tips received through TipMe are considered voluntary gratuities paid
              directly to the designated recipient.
            </p>

            <p>
              Management may not redirect or withhold tips without the recipient’s
              consent.
            </p>
          </div>
        </article>
      </section>
    </main>
  </v-app>
</template>

<script>
export default {
  name: "TermsPage",

  data() {
    return {
      mobileMenu: false,

      title: "Terms & Conditions",
      terms: true,
      privacy: false,
      compliance: false,
      fundraising: false,
      restaurant_terms: false,
    };
  },

  methods: {
    goTo(path) {
      this.$router.push(path);
    },

    handleMobileRoute(path) {
      this.mobileMenu = false;
      this.goTo(path);
    },

    setSection(title, section) {
      this.title = title;

      this.terms = false;
      this.privacy = false;
      this.compliance = false;
      this.fundraising = false;
      this.restaurant_terms = false;

      this[section] = true;
    },
  },
};
</script>

<style scoped>
.terms-page {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  color: #ffffff;
  background: #050505;
  padding: 120px 18px 70px;
  font-family: "Inter", "Poppins", Arial, sans-serif;
}

/* NAVBAR */
.terms-navbar {
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

.nav-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  flex-shrink: 0;
}

.nav-brand-icon {
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

.nav-brand-text h3 {
  margin: 0;
  font-size: 17px;
  line-height: 1;
}

.nav-brand-text span {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
}

.nav-links {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  flex: 1;
  white-space: nowrap;
}

.nav-links button {
  border: 0;
  outline: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.75);
  padding: 10px 14px;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;
  white-space: nowrap;
  transition: 0.2s ease;
}

.nav-links button:hover,
.nav-links button.active {
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

.mobile-home {
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

.mobile-menu button:hover,
.mobile-menu button.active {
  background: rgba(255, 255, 255, 0.07);
}

.mobile-menu button:last-child {
  margin-bottom: 0;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.22s ease;
}

.mobile-menu-enter,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}

/* BACKGROUND */
.terms-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 12% 10%, rgba(182, 255, 0, 0.2), transparent 28%),
    radial-gradient(circle at 90% 20%, rgba(0, 255, 153, 0.14), transparent 24%),
    radial-gradient(circle at 50% 100%, rgba(255, 255, 255, 0.06), transparent 30%),
    linear-gradient(135deg, #050505 0%, #080808 48%, #020202 100%);
}

.terms-bg::after {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.07;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.14) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.14) 1px, transparent 1px);
  background-size: 62px 62px;
  mask-image: linear-gradient(to bottom, black, transparent 86%);
}

/* MAIN */
.terms-shell {
  position: relative;
  z-index: 2;
  max-width: 1180px;
  margin: 0 auto;
}

.terms-hero {
  margin-bottom: 32px;
}

.back-btn {
  height: 40px;
  border: 0;
  margin-bottom: 26px;
  padding: 0 15px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: white;
  cursor: pointer;
  font-weight: 800;
  background: rgba(255, 255, 255, 0.08);
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.12);
}

.legal-pill {
  display: inline-flex;
  margin-bottom: 16px;
  padding: 8px 13px;
  border-radius: 999px;
  color: #b6ff00;
  background: rgba(182, 255, 0, 0.08);
  border: 1px solid rgba(182, 255, 0, 0.16);
  font-size: 12px;
  font-weight: 900;
}

.terms-hero h1 {
  margin: 0;
  font-size: clamp(38px, 6vw, 72px);
  line-height: 0.95;
  letter-spacing: -4px;
  font-weight: 950;
}

.terms-hero p {
  max-width: 700px;
  margin: 22px 0 0;
  color: rgba(255, 255, 255, 0.62);
  font-size: 16px;
  line-height: 1.8;
}

/* LAYOUT */
.terms-layout {
  display: grid;
  grid-template-columns: 310px 1fr;
  gap: 24px;
  align-items: flex-start;
}

.terms-sidebar {
  position: sticky;
  top: 110px;
  padding: 14px;
  border-radius: 30px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.095), rgba(255, 255, 255, 0.035)),
    rgba(8, 8, 8, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.09);
  box-shadow: 0 35px 90px rgba(0, 0, 0, 0.42);
  backdrop-filter: blur(20px);
}

.terms-sidebar button {
  width: 100%;
  min-height: 52px;
  border: 0;
  border-radius: 18px;
  margin-bottom: 7px;
  padding: 0 14px;

  display: flex;
  align-items: center;
  gap: 12px;

  color: rgba(255, 255, 255, 0.7);
  background: transparent;
  cursor: pointer;
  text-align: left;
  font-size: 14px;
  font-weight: 850;
  transition: 0.2s ease;
}

.terms-sidebar button:hover,
.terms-sidebar button.active {
  color: black;
  background: linear-gradient(135deg, #b6ff00, #00ff99);
}

.terms-sidebar button:last-child {
  margin-bottom: 0;
}

.terms-card {
  min-height: 760px;
  padding: 42px;
  border-radius: 36px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.095), rgba(255, 255, 255, 0.035)),
    rgba(8, 8, 8, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.09);
  box-shadow: 0 35px 90px rgba(0, 0, 0, 0.42);
  backdrop-filter: blur(20px);
}

/* CONTENT */
.legal-content h2 {
  margin: 0 0 30px;
  font-size: clamp(30px, 4vw, 52px);
  line-height: 1;
  letter-spacing: -2px;
  font-weight: 950;
}

.legal-content h3 {
  margin: 34px 0 12px;
  color: #b6ff00;
  font-size: 20px;
  letter-spacing: -0.5px;
}

.legal-content p {
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.85;
  font-size: 15.5px;
  margin: 0 0 16px;
}

.legal-content .muted {
  color: rgba(255, 255, 255, 0.48);
}

.legal-content ul {
  margin: 14px 0 22px;
  padding: 0;
  list-style: none;
}

.legal-content li {
  position: relative;
  padding: 12px 0 12px 28px;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.6;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.legal-content li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 20px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #b6ff00;
  box-shadow: 0 0 16px rgba(182, 255, 0, 0.7);
}

/* RESPONSIVE */
@media (max-width: 960px) {
  .terms-layout {
    grid-template-columns: 1fr;
  }

  .terms-sidebar {
    position: relative;
    top: 0;
    display: flex;
    overflow-x: auto;
    gap: 8px;
    border-radius: 24px;
  }

  .terms-sidebar::-webkit-scrollbar {
    display: none;
  }

  .terms-sidebar button {
    width: auto;
    min-width: max-content;
    margin-bottom: 0;
  }
}

@media (max-width: 900px) {
  .desktop-nav {
    display: none;
  }

  .mobile-nav-actions {
    display: flex;
  }

  .terms-navbar {
    top: 14px;
    width: calc(100% - 28px);
    height: 70px;
    border-radius: 24px;
    padding: 0 14px;
  }
}

@media (max-width: 700px) {
  .terms-page {
    padding: 100px 12px 60px;
  }

  .terms-hero h1 {
    letter-spacing: -2.2px;
  }

  .terms-card {
    padding: 26px;
    border-radius: 28px;
  }

  .legal-content h2 {
    letter-spacing: -1.4px;
  }

  .terms-sidebar {
    padding: 10px;
  }
}

@media (max-width: 480px) {
  .terms-navbar {
    width: calc(100% - 20px);
    height: 66px;
    top: 10px;
    border-radius: 22px;
  }

  .nav-brand {
    gap: 9px;
  }

  .nav-brand-icon {
    width: 40px;
    height: 40px;
    border-radius: 14px;
    font-size: 18px;
  }

  .nav-brand-text h3 {
    font-size: 15px;
  }

  .nav-brand-text span {
    display: none;
  }

  .mobile-home {
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

  .terms-card {
    padding: 22px;
  }

  .legal-content p,
  .legal-content li {
    font-size: 14.5px;
  }
}
</style>