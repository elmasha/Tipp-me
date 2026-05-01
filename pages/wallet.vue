<template>
  <div class="wallet-page">
    <!-- NAVBAR -->
    <nav class="wallet-navbar">
      <div class="nav-brand" @click="goTo('/')">
        <div class="nav-brand-icon">T</div>

        <div class="nav-brand-text">
          <h3>TipMe</h3>
          <span>Wallet dashboard</span>
        </div>
      </div>

      <!-- DESKTOP NAV -->
      <div class="nav-links desktop-nav">
        <button @click="goTo('/')">Home</button>
        <button @click="goTo('/#about')">About</button>
        <button class="active" @click="goTo('/wallet')">Wallet</button>
        <button @click="goTo('/terms')">Terms & Conditions</button>
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

          <button class="active" @click="handleMobileRoute('/wallet')">
            <v-icon size="18" color="#b6ff00">mdi-wallet-outline</v-icon>
            Wallet
          </button>

          <button @click="handleMobileRoute('/terms')">
            <v-icon size="18" color="#b6ff00">mdi-file-document-outline</v-icon>
            Terms & Conditions
          </button>
        </div>
      </transition>
    </nav>

    <!-- BACKGROUND -->
    <div class="wallet-bg"></div>

    <div class="wallet-shell">
      <!-- HEADER -->
      <div class="wallet-header">
        <div>
          <div class="eyebrow">TipMe Wallet</div>

          <h1>
            Welcome back,
            <span>{{ user_name || "User" }}</span>
          </h1>

          <p>
            Manage your balance, tips, withdrawals and QR code from one clean dashboard.
          </p>
        </div>

        <div class="header-actions">
          <v-btn class="icon-glass" icon @click="show_qr = !show_qr">
            <v-icon>{{ show_qr ? "mdi-qrcode-remove" : "mdi-qrcode-scan" }}</v-icon>
          </v-btn>

          <v-btn class="icon-glass" icon @click="RefreshPage()">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </div>
      </div>

      <!-- BALANCE + GOAL -->
      <div class="wallet-grid">
        <!-- BALANCE CARD -->
        <div class="balance-card">
          <div class="balance-card-top">
            <div>
              <span>Main wallet</span>

              <h2>KES {{ numeral(balance).format("0,0.00") }}</h2>

              <p>Total Balance</p>
            </div>

            <div class="wallet-status">
              <span></span>
              Active
            </div>
          </div>

          <div class="mini-balances">
            <div>
              <small>Available</small>
              <strong>KES {{ numeral(available_balance).format("0,0.00") }}</strong>
            </div>

            <div>
              <small>Pending</small>
              <strong>KES {{ numeral(pending_balance).format("0,0.00") }}</strong>
            </div>

            <div>
              <small>Locked</small>
              <strong>
                <v-icon x-small color="#b6ff00">mdi-lock-outline</v-icon>
                KES {{ numeral(locked_balance).format("0,0.00") }}
              </strong>
            </div>
          </div>

          <div class="wallet-actions">
            <NuxtLink :to="`/tipp_wallet/${uid}`" class="wallet-action deposit">
              <span>
                <v-icon color="black">mdi-arrow-up-circle</v-icon>
              </span>
              Deposit
            </NuxtLink>

            <button class="wallet-action withdraw" @click="withdraw_dialog = true">
              <span>
                <v-icon color="white">mdi-arrow-down-circle</v-icon>
              </span>
              Withdraw
            </button>

            <button class="wallet-action qr" @click="show_qr = true">
              <span>
                <v-icon color="white">mdi-qrcode-scan</v-icon>
              </span>
              QR Code
            </button>
          </div>
        </div>

        <!-- GOAL CARD -->
        <div class="goal-card">
          <div class="goal-top">
            <div>
              <span>Goal Progress</span>

              <h3>KES {{ numeral(goal_amount).format("0,0.00") }}</h3>

              <p>Target amount</p>
            </div>

            <v-btn icon class="small-icon" @click="RefreshPage()">
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </div>

          <div class="goal-content">
            <div class="goal-copy">
              <small>Raised so far</small>

              <strong>KES {{ numeral(pending_balance).format("0,0.00") }}</strong>

              <p>
                Withdrawals are enabled once your goal is completed.
              </p>
            </div>

            <v-progress-circular
              :size="116"
              :width="9"
              :value="goalPercentage"
              color="#b6ff00"
              class="goal-progress"
            >
              <div class="progress-text">
                <strong>{{ goalPercentage }}%</strong>
                <small>Goal</small>
              </div>
            </v-progress-circular>
          </div>

          <div class="goal-alert">
            <v-icon size="18" color="#b6ff00">mdi-information-outline</v-icon>
            All withdrawals will be done on completion of your goal.
          </div>
        </div>
      </div>

      <!-- TRANSACTIONS -->
      <div class="transactions-section">
        <div class="section-top">
          <div>
            <div class="eyebrow">Activity</div>
            <h2>All transactions</h2>
          </div>

          <div class="transaction-filters">
            <button @click="FetchTransaction()">All</button>

            <button @click="FetchTransactionSearch('Deposit')">
              Tips
              <v-icon size="16" color="#b6ff00">mdi-arrow-up</v-icon>
            </button>

            <button @click="FetchTransactionSearch('Withdraw')">
              Withdrawals
              <v-icon size="16" color="#ff5c5c">mdi-arrow-down</v-icon>
            </button>
          </div>
        </div>

        <div class="transaction-list">
          <div
            v-for="(flight, idx) in all_transactions"
            :key="idx"
            class="transaction-card"
          >
            <div
              class="transaction-icon"
              :class="transactionClass(flight.transaction_type || flight.direction)"
            >
              <v-icon color="white">
                mdi-{{ checkType(flight.transaction_type || flight.direction) }}
              </v-icon>
            </div>

            <div class="transaction-main">
              <div class="transaction-head">
                <div>
                  <h3>{{ flight.transaction_type || flight.direction || "Transaction" }}</h3>
                  <p>{{ flight.reference || flight.refrence || "No reference" }}</p>
                </div>

                <div class="transaction-amount">
                  <strong>
                    KES {{ numeral(flight.gross_amount || flight.amount || 0).format("0,0.00") }}
                  </strong>

                  <span>{{ flight.status || flight.transaction_status || "Completed" }}</span>
                </div>
              </div>

              <div class="transaction-meta">
                <span>
                  Fee:
                  <b>KES {{ numeral(flight.fee_amount || 0).format("0,0.00") }}</b>
                </span>

                <span>
                  Net:
                  <b>
                    KES {{ numeral(flight.net_amount || flight.gross_amount || flight.amount || 0).format("0,0.00") }}
                  </b>
                </span>

                <span>
                  Balance:
                  <b>
                    KES {{ numeral(flight.balance_after || flight.current_balance || 0).format("0,0.00") }}
                  </b>
                </span>

                <span>
                  {{ flight.created_at ? $dayjs(flight.created_at).fromNow() : flight.date }}
                </span>
              </div>
            </div>
          </div>

          <div v-if="!all_transactions || all_transactions.length === 0" class="empty-state">
            <div>
              <v-icon size="44" color="#b6ff00">mdi-receipt-text-outline</v-icon>
              <h3>No transactions yet</h3>
              <p>Your tips, deposits and withdrawals will appear here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- QR DIALOG -->
    <v-dialog v-model="show_qr" max-width="560">
      <v-card class="qr-dialog">
        <div class="dialog-head">
          <div>
            <h3>Receive Tips</h3>
            <p>Show this QR code to receive tips instantly.</p>
          </div>

          <div class="dialog-actions">
            <v-btn icon @click="exportToPDF">
              <v-icon color="#b6ff00">mdi-download</v-icon>
            </v-btn>

            <v-btn icon @click="show_qr = false">
              <v-icon color="#ff5c5c">mdi-close</v-icon>
            </v-btn>
          </div>
        </div>

        <div class="qr-size-tabs">
          <button @click="qr_size = 200">200</button>
          <button @click="qr_size = 300">300</button>
          <button @click="qr_size = 400">400</button>
          <button @click="toggleQrSize">500</button>
        </div>

        <div ref="pdfContent" class="qr-print-area">
          <div class="qr-card">
            <div class="qr-brand">
              <div class="brand-badge">T</div>
              <h4>Scan here to send a Tip</h4>
              <p>{{ user_name }}</p>
            </div>

            <transition name="scale">
              <qr-code :key="qr_size" :text="qr_url" :size="qr_size" />
            </transition>

            <small>{{ qr_url }}</small>
          </div>
        </div>
      </v-card>
    </v-dialog>

    <!-- OTP DIALOG -->
    <v-dialog v-model="depo_dialog" max-width="600">
      <v-card class="dark-dialog">
        <div class="dialog-head">
          <div>
            <h3>Verify your account</h3>
            <p>Confirm your phone number to continue.</p>
          </div>

          <v-btn icon @click="depo_dialog = false">
            <v-icon color="#ff5c5c">mdi-close</v-icon>
          </v-btn>
        </div>

        <div class="dialog-body">
          <div v-show="!code_state">
            <div class="phone-input-row">
              <vue-country-code
                id="codePicker"
                @onSelect="onSelect"
                defaultCountry="ke"
              />

              <v-text-field
                outlined
                dark
                v-model="phone_no_auth"
                :counter="16"
                type="number"
                label="Provide phone number"
              />
            </div>

            <div class="recaptcha-wrap">
              <div
                id="recaptcha-container"
                data-sitekey="AIzaSyA0emGzJyErokuL84Eb_Fy4YWRxdXBi6Jo"
                data-callback="sendForm"
                data-size="visible"
              ></div>
            </div>

            <button class="full-primary" @click="sendOtpForVerification()">
              Request OTP
            </button>
          </div>

          <div v-show="code_state">
            <div class="otp-wrap">
              <v-otp-input
                v-model="code_no"
                :disabled="loading"
                length="6"
              />
            </div>

            <v-progress-circular
              v-show="show66"
              :rotate="360"
              :size="20"
              :width="8"
              :value="timerCount"
              color="secondary"
            >
              {{ timerCount }} sec
            </v-progress-circular>

            <button class="full-primary" @click="ConfirmCode">
              Verify Code
            </button>
          </div>
        </div>
      </v-card>
    </v-dialog>

    <!-- WITHDRAW DIALOG -->
    <v-dialog v-model="withdraw_dialog" max-width="420">
      <v-card class="dark-dialog">
        <div class="dialog-head">
          <div>
            <h3>Withdraw funds</h3>
            <p>Send your available balance to M-Pesa.</p>
          </div>

          <v-btn icon @click="withdraw_dialog = false">
            <v-icon color="#ff5c5c">mdi-close</v-icon>
          </v-btn>
        </div>

        <div class="dialog-body">
          <div class="withdraw-summary">
            <small>Available amount</small>
            <strong>KES {{ numeral(available_balance).format("0,0.00") }}</strong>
          </div>

          <v-text-field
            dark
            outlined
            disabled
            v-model="available_balance"
            type="number"
            label="Available amount"
          />

          <v-text-field
            dark
            outlined
            v-model="withdraw_phone"
            :prefix="phonePrefix"
            placeholder="75..."
            label="M-Pesa number"
          />

          <button class="full-primary" @click="b2c()">
            Withdraw KES {{ numeral(available_balance).format("0,0.00") }}
          </button>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { uuid } from "vue-uuid";
import axios from "axios";
import firebase from "firebase/compat/app";
import CryptoJS from "crypto-js";
import Vue from "vue";
import numeral from "numeral";
import VueQRCodeComponent from "vue-qrcode-component";

Vue.component("qr-code", VueQRCodeComponent);

const ivKey = "smslt";

export default {
  middleware: "auth",

  name: "WalletPage",

  data() {
    return {
      mobileMenu: false,

      qr_size: 160,
      phonePrefix: "254",
      code_state: false,
      appVerifier: null,
      code_no: null,
      show66: false,
      phone_no_auth: null,
      numeral,
      scrollInvoked: 0,

      UID: this.$fire.auth.currentUser ? this.$fire.auth.currentUser.uid : null,

      security_key: null,
      withdraw_dialog: false,
      pin_status: "",
      pin_status2: "",
      withdraw_pin_input: "",
      withdraw_phone: "",
      pin_input: "",
      amount_input: "",
      depo_dialog: false,
      uid: null,
      show_qr: false,
      show_qr1: false,
      password: "",
      secretKey: null,
      secret_iv: "smslt",
      encryptionMethod: "AES-256-CBC",
      encryptedText: "",
      user_name: "",
      user_phone: "",
      account_id: "",
      pin: null,
      withdraw_amount_input: "",
      user_input: "",
      count_account: 0,
      send_accountNo: "",
      status: false,
      timerEnabled: false,
      show6: false,
      timerCount: 2,
      search_status: "",
      balance: 0,
      available_balance: 0,
      locked_balance: 0,
      pending_balance: 0,
      goal_amount: 0,
      goal_raised: 0,
      user_id: 0,
      totalBalance: 0,
      withdraw_totalBalance: 0,
      walletType: "Tip wallets",
      all_transactions: [],
      qr_url: "",
      loading: false,
    };
  },

  computed: {
    goalPercentage() {
      if (!this.goal_amount || Number(this.goal_amount) <= 0) return 0;

      const percent =
        (Number(this.pending_balance) / Number(this.goal_amount)) * 100;

      return Math.min(Number(percent.toFixed(1)), 100);
    },
  },

  mounted() {
    this.checkUser();
    this.FetchProfile();
    this.FetchWallet();
  },

  methods: {
    goTo(path) {
      this.$router.push(path);
    },

    handleMobileRoute(path) {
      this.mobileMenu = false;
      this.goTo(path);
    },

    toggleQrSize() {
      this.qr_size = 500;
    },

    async exportToPDF() {
      if (process.server) return;

      const html2canvas = (await import("html2canvas")).default;
      const jsPDF = (await import("jspdf")).default;

      const element = this.$refs.pdfContent;

      const canvas = await html2canvas(element, {
        scale: 2,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save(`${this.user_name || "tipme"}-qr.pdf`);
    },

    CheckGoalProgress() {
      if (Number(this.goalPercentage) === 100) {
        this.withdraw_dialog = true;
      } else {
        alert(
          `Not able to withdraw \nYour Goal progress is at ${this.goalPercentage} %`
        );
      }
    },

    configureRecaptcha() {
      window.recaptchaVerifier = new this.$fireModule.auth.RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "visible",
          callback: (response) => {
            console.log(response);
          },
        }
      );
    },

    sendOtpForVerification() {
      if (!this.phone_no_auth) {
        this.snackbar2 = true;
        this.snackbarText2 = "Provide phone number";
        return;
      }

      this.progress_bar = true;
      this.configureRecaptcha();

      const phoneNumber = "+254" + this.phone_no_auth;
      this.appVerifier = window.recaptchaVerifier;

      firebase.auth().languageCode = "en";

      firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, this.appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          this.confirmation_Result = confirmationResult;
          this.code_state = true;
          this.progress_bar = false;
          this.snackbar = true;
          this.snackbarText = "OTP sent successfully";
        })
        .catch((error) => {
          this.progress_bar = false;
          console.log("Error", error);
          this.snackbar2 = true;
          this.snackbarText2 = error.message || error;
        });
    },

    ConfirmCode() {
      if (!this.code_no) {
        this.snackbar2 = true;
        this.snackbarText2 = "Provide code sent to you";
        return;
      }

      const credential = firebase.auth.PhoneAuthProvider.credential(
        this.confirmation_Result.verificationId,
        this.code_no
      );

      this.progress_bar = true;

      firebase
        .auth()
        .signInWithCredential(credential)
        .then(() => {
          this.progress_bar = false;
          this.snackbar = true;
          this.snackbarText = "Phone verified successfully";
        })
        .catch((error) => {
          this.progress_bar = false;
          console.log("Error", error);
          this.snackbar2 = true;
          this.snackbarText2 = error.message || error;
        });
    },

    onSelect({ name, iso2, dialCode }) {
      console.log(name, iso2, dialCode);
    },

    RefreshPage() {
      this.checkUser();
      this.FetchProfile();
      this.FetchWallet();
    },

    onScroll() {
      this.scrollInvoked++;
    },

    async stkPush() {
      const that = this;

      axios
        .post(
          `https://tipserver-production.up.railway.app/api/payments/stk-push`,
          {
            uid: that.UID,
            profile_id: that.user_id,
            phone: that.phone_no2,
            amount: that.amount_input,
          }
        )
        .then(function (response) {
          console.log("STK response", response.data);
        })
        .catch(function (error) {
          console.log(error);
          that.snackbarText2 = error.message;
          that.snackbar2 = true;
        });
    },

    async b2c() {
      const that = this;
      const phone = that.phonePrefix + that.withdraw_phone;

      if (phone.length !== 12) {
        that.snackbarTextError =
          "Phone number should be 12 digits including country code";
        that.snackbarError = true;
        return;
      }

      if (Number(this.available_balance) <= 0) {
        that.snackbarTextError = "You have no available balance to withdraw";
        that.snackbarError = true;
        return;
      }

      axios
        .post(
          `https://tipserver-production.up.railway.app/api/b2c/withdraw`,
          {
            uid: that.UID,
            user_id: that.user_id,
            phone,
            amount: that.available_balance,
          }
        )
        .then(function (response) {
          console.log("Withdraw response", response.data);

          if (response.status === 200) {
            that.withdraw_dialog = false;
            that.RefreshPage();
          }
        })
        .catch(function (error) {
          console.log(error);
          that.snackbarText2 = error.message;
          that.snackbar2 = true;
        });
    },

    async FetchProfile() {
      const that = this;

      if (!that.UID) return;

      axios
        .get(
          `https://tipserver-production.up.railway.app/api/profiles/uid/${that.UID}`
        )
        .then(function (response) {
          console.log("Show profile", response.data);

          that.user_name = response.data.username;
          that.user_id = response.data.user_id || response.data.id;
          that.goal_amount = response.data.goal_amount || 0;
          that.goal_raised = response.data.goal_raised || 0;
          that.qr_url = response.data.avatar_url || "";

          that.FetchTransaction();
        })
        .catch(function (error) {
          console.log(error);
          that.snackbarText2 = error.message;
          that.snackbar2 = true;
        });
    },

    async FetchWallet() {
      const that = this;

      if (!that.UID) return;

      axios
        .get(
          `https://tipserver-production.up.railway.app/api/wallets/get-wallet/${that.UID}`
        )
        .then(function (response) {
          console.log("Show wallet", response.data);

          that.balance = response.data.total_balance || 0;
          that.available_balance = response.data.available_balance || 0;
          that.pending_balance = response.data.pending_balance || 0;
          that.locked_balance = response.data.locked_balance || 0;
        })
        .catch(function (error) {
          console.log(error);
          that.snackbarText2 = error.message;
          that.snackbar2 = true;
        });
    },

    checkColor(val) {
      if (val === "CREDIT" || val === "Deposit" || val === "Tips") {
        return "green";
      }

      if (val === "DEBIT" || val === "Withdraw") {
        return "red";
      }

      return "grey";
    },

    checkType(val) {
      if (val === "CREDIT" || val === "Deposit") {
        return "arrow-up";
      }

      if (val === "DEBIT" || val === "Withdraw") {
        return "arrow-down";
      }

      if (val === "Tips") {
        return "hand-coin";
      }

      return "swap-horizontal";
    },

    transactionClass(val) {
      if (val === "CREDIT" || val === "Deposit" || val === "Tips") {
        return "is-credit";
      }

      if (val === "DEBIT" || val === "Withdraw") {
        return "is-debit";
      }

      return "is-neutral";
    },

    FetchTransaction() {
      const that = this;

      if (!that.user_id) return;

      axios
        .get(
          `https://tipserver-production.up.railway.app/api/wallets/get-ledger/${that.user_id}`
        )
        .then(function (response) {
          console.log("transactions", response.data);

          if (response.status === 200) {
            that.all_transactions = response.data || [];
          }
        })
        .catch(function (error) {
          console.log(error);
          that.snackbarText2 = error.message;
          that.snackbar2 = true;
        });
    },

    FetchTransactionSearch(val) {
      const db = this.$fire.firestore;

      this.all_transactions.splice(0, this.all_transactions.length);

      db.collection("Tipp_user")
        .doc(this.$fire.auth.currentUser.uid)
        .collection("All_transactions")
        .where("transaction_type", "==", val)
        .get()
        .then((queryResult6) => {
          queryResult6.forEach((doc) => {
            const data = {
              id: doc.id,
              transaction_type: doc.data().transaction_type,
              user_name: doc.data().user_name,
              amount: doc.data().amount,
              payment_method: doc.data().payment_method,
              transaction_id: doc.data().transaction_id,
              previous_balance: doc.data().previous_balance,
              current_balance: doc.data().current_balance,
              account_id: doc.data().account_id,
              transaction_status: doc.data().transaction_status,
              date: doc.data().print_date,
            };

            this.all_transactions.push(data);
          });
        });
    },

    verifyPin(val) {
      if (val === this.decrypteData(this.pin)) {
        this.Deposit(this.amount_input);
        this.pin_status = "";
      } else {
        this.pin_status = "Invalid pin. \nProvide a valid pin number";
      }
    },

    verifyPin2(val) {
      if (val === this.decrypteData(this.pin)) {
        this.Withdraw(this.withdraw_amount_input);
        this.pin_status2 = "";
      } else {
        this.pin_status2 = "Invalid pin. \nProvide a valid pin number";
      }
    },

    FetchUser() {
      const db = this.$fire.firestore;

      db.collection("Tipp_user")
        .where("user_uid", "==", this.$fire.auth.currentUser.uid)
        .get()
        .then((queryResult) => {
          queryResult.forEach((doc) => {
            this.security_key = doc.data().security_key;
            this.user_name = doc.data().user_name;
            this.phone = doc.data().phone;
            this.account_id = doc.data().Account_id;
            this.pin = doc.data().pin;
          });
        });
    },

    encrypteData(data) {
      if (!this.$fire.auth.currentUser.uid) return;

      if (data != null) {
        const key = CryptoJS.PBKDF2(this.$fire.auth.currentUser.uid, "salt", {
          keySize: 256 / 32,
          iterations: 1000,
        });

        const iv = CryptoJS.enc.Utf8.parse(ivKey);

        const encrypted = CryptoJS.AES.encrypt(String(data), key, {
          iv,
          mode: CryptoJS.mode.CBC,
        });

        this.encryptedText = encrypted.ciphertext.toString(CryptoJS.enc.Hex);

        return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
      }
    },

    decrypteData(data) {
      if (!this.$fire.auth.currentUser.uid) return;

      if (data) {
        const key = CryptoJS.PBKDF2(this.$fire.auth.currentUser.uid, "salt", {
          keySize: 256 / 32,
          iterations: 1000,
        });

        const iv = CryptoJS.enc.Utf8.parse(ivKey);

        const decrypted = CryptoJS.AES.decrypt(
          {
            ciphertext: CryptoJS.enc.Hex.parse(data),
          },
          key,
          {
            iv,
            mode: CryptoJS.mode.CBC,
          }
        );

        return decrypted.toString(CryptoJS.enc.Utf8);
      }
    },

    Check(val) {
      return val;
    },

    checkUser() {
      if (this.$fire.auth.currentUser != null) {
        this.secretKey = this.$fire.auth.currentUser.uid;
        this.uid = this.$fire.auth.currentUser.uid;
        this.UID = this.$fire.auth.currentUser.uid;

        this.FetchUser();
        this.FetchWallet();
      } else {
        this.auth_state = false;
      }
    },

    Deposit(val) {
      const db = this.$fire.firestore;
      const ID = uuid.v1();

      const docRef2 = db
        .collection("Tipp_user")
        .doc(this.$fire.auth.currentUser.uid)
        .collection("Tipp_wallet")
        .doc(this.$fire.auth.currentUser.uid);

      const docRefTransaction = db
        .collection("Tipp_user")
        .doc(this.$fire.auth.currentUser.uid)
        .collection("Tipp_wallet")
        .doc(this.$fire.auth.currentUser.uid)
        .collection("Tipp_wallet_transaction")
        .doc();

      const docRefAllTransaction = db
        .collection("Tipp_user")
        .doc(this.$fire.auth.currentUser.uid)
        .collection("All_transactions")
        .doc();

      db.runTransaction(async (transaction) => {
        this.totalBalance = Number(val) + Number(this.balance);

        transaction.update(docRef2, {
          balance: this.totalBalance,
        });

        transaction.set(docRefTransaction, {
          transaction_type: "Deposit",
          user_name: this.user_name,
          amount: val,
          payment_method: "Mpesa",
          transaction_id: ID,
          previous_balance: this.balance,
          current_balance: this.totalBalance,
          account_id: this.account_id,
          transaction_status: "Successful transaction",
          date: new Date(),
          print_date: this.$dayjs(new Date()).format("YYYY/MM/DD HH:mm:ss"),
        });

        transaction.set(docRefAllTransaction, {
          transaction_type: "Deposit",
          user_name: this.user_name,
          amount: val,
          wallet_type: this.walletType,
          payment_method: "Mpesa",
          transaction_id: ID,
          previous_balance: this.balance,
          current_balance: this.totalBalance,
          account_id: this.account_id,
          transaction_status: "Successful transaction",
          date: new Date(),
          print_date: this.$dayjs(new Date()).format("YYYY/MM/DD HH:mm:ss"),
        });
      })
        .then(() => {
          this.snackbar = true;
          this.depo_dialog = false;
          this.snackbarText = "Deposit successful";
          this.FetchWallet();
          this.FetchTransaction();
          this.amount_input = "";
          this.pin_input = "";
        })
        .catch((error) => {
          this.snackbar2 = true;
          this.snackbarText2 = error;
          this.progress_bar = false;
          console.error("Error adding listing: ", error);
        });
    },

    Withdraw(val) {
      const db = this.$fire.firestore;
      const ID = uuid.v1();

      const docRef2 = db
        .collection("Tipp_user")
        .doc(this.$fire.auth.currentUser.uid)
        .collection("Tipp_wallet")
        .doc(this.$fire.auth.currentUser.uid);

      const docRefTransaction = db
        .collection("Tipp_user")
        .doc(this.$fire.auth.currentUser.uid)
        .collection("Tipp_wallet")
        .doc(this.$fire.auth.currentUser.uid)
        .collection("Tipp_wallet_transaction")
        .doc();

      const docRefAllTransaction = db
        .collection("Tipp_user")
        .doc(this.$fire.auth.currentUser.uid)
        .collection("All_transactions")
        .doc();

      db.runTransaction(async (transaction) => {
        this.withdraw_totalBalance = Number(this.balance) - Number(val);

        transaction.update(docRef2, {
          balance: this.withdraw_totalBalance,
        });

        transaction.set(docRefTransaction, {
          transaction_type: "Withdraw",
          user_name: this.user_name,
          amount: val,
          payment_method: "Tipp me wallet",
          transaction_id: ID,
          previous_balance: this.balance,
          current_balance: this.withdraw_totalBalance,
          account_id: this.account_id,
          transaction_status: "Successful transaction",
          date: new Date(),
          print_date: this.$dayjs(new Date()).format("YYYY/MM/DD HH:mm:ss"),
        });

        transaction.set(docRefAllTransaction, {
          transaction_type: "Withdraw",
          user_name: this.user_name,
          amount: val,
          wallet_type: this.walletType,
          payment_method: "Tipp me wallet",
          transaction_id: ID,
          previous_balance: this.balance,
          current_balance: this.withdraw_totalBalance,
          account_id: this.account_id,
          transaction_status: "Successful transaction",
          date: new Date(),
          print_date: this.$dayjs(new Date()).format("YYYY/MM/DD HH:mm:ss"),
        });
      })
        .then(() => {
          this.snackbar = true;
          this.withdraw_dialog = false;
          this.snackbarText = "Withdraw successful";
          this.FetchWallet();
          this.FetchTransaction();
          this.amount_input = "";
          this.pin_input = "";
        })
        .catch((error) => {
          this.snackbar2 = true;
          this.snackbarText2 = error;
          this.progress_bar = false;
          console.error("Error adding listing: ", error);
        });
    },

    setPin() {
      if (this.password_status === false) {
        this.snackbar2 = true;
        this.snackbarText2 = "Password does not match";
      } else {
        this.progress_bar = true;

        const db = this.$fire.firestore;

        const docRef = db
          .collection("Tipp_user")
          .doc(this.$fire.auth.currentUser.uid);

        const docRef2 = db
          .collection("Tipp_user")
          .doc(this.$fire.auth.currentUser.uid)
          .collection("Tipp_wallet")
          .doc(this.$fire.auth.currentUser.uid);

        const newData = {
          Account_id: this.encrypteData(
            this.$fire.auth.currentUser.uid +
              this.user_name +
              this.phone +
              new Date()
          ),
        };

        const newData2 = {
          balance: this.encrypteData(Number("0")),
          previous_balance: this.encrypteData(Number("0")),
        };

        db.runTransaction(async (transaction) => {
          transaction.update(docRef, newData);
          transaction.update(docRef2, newData2);
        })
          .then(() => {
            this.snackbar = true;
            this.snackbarText = "Account set successfully";
          })
          .catch((error) => {
            this.snackbar2 = true;
            this.snackbarText2 = error;
            console.error("Error adding listing: ", error);
          });
      }
    },
  },
};
</script>

<style scoped>
.wallet-page {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  color: #ffffff;
  background: #050505;
  padding: 120px 18px 70px;
  font-family: "Inter", "Poppins", Arial, sans-serif;
}

/* NAVBAR */
.wallet-navbar {
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
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
}

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
.wallet-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 12% 10%, rgba(182, 255, 0, 0.2), transparent 28%),
    radial-gradient(circle at 90% 20%, rgba(0, 255, 153, 0.14), transparent 24%),
    radial-gradient(circle at 50% 100%, rgba(255, 255, 255, 0.06), transparent 30%),
    linear-gradient(135deg, #050505 0%, #080808 48%, #020202 100%);
}

.wallet-bg::after {
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

.wallet-shell {
  position: relative;
  z-index: 2;
  max-width: 1180px;
  margin: 0 auto;
}

.wallet-header {
  min-height: 110px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
  margin-bottom: 22px;
}

.eyebrow {
  display: inline-flex;
  margin-bottom: 10px;
  padding: 7px 12px;
  border-radius: 999px;
  color: #b6ff00;
  background: rgba(182, 255, 0, 0.08);
  border: 1px solid rgba(182, 255, 0, 0.16);
  font-size: 12px;
  font-weight: 900;
}

.wallet-header h1 {
  margin: 0;
  font-size: clamp(32px, 5vw, 58px);
  line-height: 0.95;
  letter-spacing: -3px;
  font-weight: 950;
}

.wallet-header h1 span {
  color: #b6ff00;
}

.wallet-header p {
  max-width: 560px;
  margin: 16px 0 0;
  color: rgba(255, 255, 255, 0.62);
  font-size: 15px;
  line-height: 1.7;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.icon-glass {
  background: rgba(255, 255, 255, 0.08) !important;
  color: #ffffff !important;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.wallet-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 22px;
  margin-bottom: 28px;
}

.balance-card,
.goal-card,
.transaction-card,
.dark-dialog,
.qr-dialog {
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.095), rgba(255, 255, 255, 0.035)),
    rgba(8, 8, 8, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.09);
  box-shadow: 0 35px 90px rgba(0, 0, 0, 0.42);
  backdrop-filter: blur(20px);
}

.balance-card {
  position: relative;
  overflow: hidden;
  border-radius: 36px;
  padding: 32px;
}

.balance-card::before {
  content: "";
  position: absolute;
  width: 320px;
  height: 320px;
  top: -160px;
  right: -120px;
  border-radius: 50%;
  background: rgba(182, 255, 0, 0.18);
  filter: blur(30px);
}

.balance-card-top {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  gap: 18px;
}

.balance-card-top span,
.goal-top span {
  color: rgba(255, 255, 255, 0.55);
  font-size: 13px;
  font-weight: 700;
}

.balance-card-top h2 {
  margin: 12px 0 8px;
  font-size: clamp(38px, 6vw, 68px);
  line-height: 0.95;
  letter-spacing: -3px;
  font-weight: 950;
}

.balance-card-top p,
.goal-top p {
  margin: 0;
  color: rgba(255, 255, 255, 0.5);
}

.wallet-status {
  height: 36px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 13px;
  border-radius: 999px;
  color: #b6ff00;
  background: rgba(182, 255, 0, 0.08);
  border: 1px solid rgba(182, 255, 0, 0.17);
  font-size: 12px;
  font-weight: 900;
}

.wallet-status span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #b6ff00;
  box-shadow: 0 0 14px rgba(182, 255, 0, 0.9);
}

.mini-balances {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-top: 32px;
}

.mini-balances div {
  padding: 18px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(255, 255, 255, 0.075);
}

.mini-balances small {
  display: block;
  margin-bottom: 8px;
  color: rgba(255, 255, 255, 0.5);
}

.mini-balances strong {
  font-size: 15px;
}

.wallet-actions {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 26px;
}

.wallet-action {
  height: 52px;
  min-width: 140px;
  border: 0;
  border-radius: 999px;
  padding: 0 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-decoration: none;
  cursor: pointer;
  font-weight: 900;
  color: white;
}

.wallet-action span {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: grid;
  place-items: center;
}

.wallet-action.deposit {
  color: black;
  background: linear-gradient(135deg, #b6ff00, #00ff99);
  box-shadow: 0 18px 44px rgba(182, 255, 0, 0.2);
}

.wallet-action.deposit span {
  background: rgba(0, 0, 0, 0.08);
}

.wallet-action.withdraw,
.wallet-action.qr {
  background: rgba(255, 255, 255, 0.08);
}

.wallet-action.withdraw span {
  background: rgba(255, 92, 92, 0.18);
}

.wallet-action.qr span {
  background: rgba(255, 255, 255, 0.08);
}

.goal-card {
  border-radius: 36px;
  padding: 28px;
}

.goal-top {
  display: flex;
  justify-content: space-between;
  gap: 14px;
}

.goal-top h3 {
  margin: 10px 0 6px;
  font-size: 34px;
  letter-spacing: -1px;
}

.small-icon {
  background: rgba(255, 255, 255, 0.07) !important;
  color: white !important;
}

.goal-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 22px;
  margin-top: 34px;
}

.goal-copy small {
  display: block;
  color: rgba(255, 255, 255, 0.52);
  margin-bottom: 8px;
}

.goal-copy strong {
  display: block;
  font-size: 24px;
  margin-bottom: 16px;
}

.goal-copy p {
  max-width: 250px;
  margin: 0;
  color: rgba(255, 255, 255, 0.58);
  line-height: 1.6;
}

.progress-text {
  text-align: center;
}

.progress-text strong {
  display: block;
  color: white;
  font-size: 22px;
}

.progress-text small {
  color: rgba(255, 255, 255, 0.55);
}

.goal-alert {
  margin-top: 28px;
  padding: 14px 16px;
  border-radius: 20px;
  display: flex;
  gap: 10px;
  align-items: flex-start;
  color: rgba(255, 255, 255, 0.72);
  background: rgba(182, 255, 0, 0.07);
  border: 1px solid rgba(182, 255, 0, 0.14);
  font-size: 13px;
  line-height: 1.5;
}

.transactions-section {
  margin-top: 28px;
}

.section-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 18px;
  margin-bottom: 18px;
}

.section-top h2 {
  margin: 0;
  font-size: 34px;
  letter-spacing: -1.5px;
}

.transaction-filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.transaction-filters button {
  height: 40px;
  border: 0;
  border-radius: 999px;
  padding: 0 14px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  color: white;
  font-weight: 800;
  background: rgba(255, 255, 255, 0.08);
}

.transaction-filters button:hover {
  background: rgba(182, 255, 0, 0.14);
}

.transaction-list {
  display: grid;
  gap: 14px;
}

.transaction-card {
  border-radius: 28px;
  padding: 18px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.transaction-icon {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 17px;
}

.transaction-icon.is-credit {
  background: linear-gradient(135deg, #b6ff00, #00ff99);
}

.transaction-icon.is-debit {
  background: linear-gradient(135deg, #ff5c5c, #ff9a9a);
}

.transaction-icon.is-neutral {
  background: rgba(255, 255, 255, 0.1);
}

.transaction-main {
  flex: 1;
  min-width: 0;
}

.transaction-head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.transaction-head h3 {
  margin: 0;
  font-size: 17px;
  letter-spacing: -0.3px;
}

.transaction-head p {
  margin: 7px 0 0;
  color: rgba(255, 255, 255, 0.5);
  font-size: 13px;
  word-break: break-word;
}

.transaction-amount {
  text-align: right;
  flex-shrink: 0;
}

.transaction-amount strong {
  display: block;
  font-size: 18px;
}

.transaction-amount span {
  display: inline-flex;
  margin-top: 7px;
  padding: 5px 9px;
  border-radius: 999px;
  color: #b6ff00;
  background: rgba(182, 255, 0, 0.08);
  font-size: 11px;
  font-weight: 900;
}

.transaction-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.transaction-meta span {
  padding: 7px 10px;
  border-radius: 999px;
  color: rgba(255, 255, 255, 0.56);
  background: rgba(255, 255, 255, 0.055);
  font-size: 12px;
}

.transaction-meta b {
  color: white;
}

.empty-state {
  min-height: 280px;
  border-radius: 30px;
  display: grid;
  place-items: center;
  text-align: center;
  background: rgba(255, 255, 255, 0.045);
  border: 1px dashed rgba(255, 255, 255, 0.12);
}

.empty-state h3 {
  margin: 12px 0 8px;
}

.empty-state p {
  margin: 0;
  color: rgba(255, 255, 255, 0.54);
}

.dark-dialog,
.qr-dialog {
  border-radius: 30px !important;
  color: white;
  overflow: hidden;
}

.dialog-head {
  padding: 24px;
  display: flex;
  justify-content: space-between;
  gap: 14px;
  align-items: flex-start;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.dialog-actions {
  display: flex;
  gap: 6px;
}

.dialog-head h3 {
  margin: 0;
  font-size: 25px;
  letter-spacing: -1px;
}

.dialog-head p {
  margin: 7px 0 0;
  color: rgba(255, 255, 255, 0.56);
  font-size: 14px;
}

.dialog-body {
  padding: 24px;
}

.phone-input-row {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.recaptcha-wrap,
.otp-wrap {
  display: flex;
  justify-content: center;
  margin: 18px 0;
}

.full-primary {
  width: 100%;
  height: 52px;
  border: 0;
  border-radius: 999px;
  color: black;
  cursor: pointer;
  font-weight: 950;
  background: linear-gradient(135deg, #b6ff00, #00ff99);
}

.withdraw-summary {
  padding: 18px;
  margin-bottom: 18px;
  border-radius: 22px;
  background: rgba(182, 255, 0, 0.08);
  border: 1px solid rgba(182, 255, 0, 0.15);
}

.withdraw-summary small {
  display: block;
  color: rgba(255, 255, 255, 0.55);
  margin-bottom: 8px;
}

.withdraw-summary strong {
  font-size: 26px;
}

.qr-size-tabs {
  padding: 18px 24px 0;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.qr-size-tabs button {
  height: 36px;
  border: 0;
  border-radius: 999px;
  padding: 0 14px;
  color: white;
  cursor: pointer;
  font-weight: 800;
  background: rgba(255, 255, 255, 0.08);
}

.qr-size-tabs button:hover {
  background: rgba(182, 255, 0, 0.16);
}

.qr-print-area {
  padding: 24px;
  display: flex;
  justify-content: center;
}

.qr-card {
  width: 100%;
  max-width: 430px;
  padding: 28px;
  border-radius: 30px;
  text-align: center;
  background: white;
  color: black;
}

.qr-brand {
  margin-bottom: 20px;
}

.brand-badge {
  width: 48px;
  height: 48px;
  margin: 0 auto 12px;
  border-radius: 17px;
  display: grid;
  place-items: center;
  color: black;
  font-weight: 950;
  background: linear-gradient(135deg, #b6ff00, #00ff99);
}

.qr-brand h4 {
  margin: 0;
  font-size: 20px;
}

.qr-brand p {
  margin: 6px 0 0;
  color: #666;
}

.qr-card small {
  display: block;
  margin-top: 18px;
  color: #777;
  word-break: break-all;
}

.scale-enter-active,
.scale-leave-active {
  transition: 0.25s ease;
}

.scale-enter,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.96);
}

::v-deep .v-text-field--outlined fieldset {
  border-color: rgba(255, 255, 255, 0.16) !important;
}

::v-deep .v-label {
  color: rgba(255, 255, 255, 0.62) !important;
}

::v-deep input {
  color: white !important;
}

/* TABLET */
@media (max-width: 960px) {
  .wallet-grid {
    grid-template-columns: 1fr;
  }

  .section-top {
    align-items: flex-start;
    flex-direction: column;
  }

  .goal-content {
    align-items: flex-start;
  }
}

/* MOBILE NAV */
@media (max-width: 900px) {
  .desktop-nav {
    display: none;
  }

  .mobile-nav-actions {
    display: flex;
  }

  .wallet-navbar {
    top: 14px;
    width: calc(100% - 28px);
    height: 70px;
    border-radius: 24px;
    padding: 0 14px;
  }
}

/* MOBILE */
@media (max-width: 700px) {
  .wallet-page {
    padding: 100px 12px 60px;
  }

  .wallet-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .header-actions {
    width: 100%;
    justify-content: flex-end;
  }

  .balance-card,
  .goal-card {
    border-radius: 28px;
    padding: 22px;
  }

  .balance-card-top {
    flex-direction: column;
  }

  .mini-balances {
    grid-template-columns: 1fr;
  }

  .wallet-actions {
    display: grid;
    grid-template-columns: 1fr;
  }

  .wallet-action {
    width: 100%;
  }

  .goal-content {
    flex-direction: column;
  }

  .transaction-card {
    border-radius: 24px;
  }

  .transaction-head {
    flex-direction: column;
  }

  .transaction-amount {
    text-align: left;
  }

  .phone-input-row {
    flex-direction: column;
  }

  .dialog-head {
    padding: 20px;
  }

  .dialog-body {
    padding: 20px;
  }
}

/* SMALL MOBILE */
@media (max-width: 480px) {
  .wallet-navbar {
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
}
</style>