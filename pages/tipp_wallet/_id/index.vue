<template>
  <v-app class="tip-page" v-resize="onResize">
    <div class="tip-bg"></div>

    <!-- TOP BAR -->
    <div class="top-bar">
      <button class="back-btn" @click="$router.back()">
        <v-icon size="20" color="white">mdi-arrow-left</v-icon>
      </button>

      <div class="brand" @click="$router.push('/')">
        <div class="brand-icon">T</div>
        <span>TipMe</span>
      </div>
    </div>

    <main class="tip-wrapper">
      <div class="tip-card">
        <!-- RECEIVER -->
        <div class="receiver">
          <div class="avatar">
            {{ receiverInitial }}
          </div>

          <p>You are tipping</p>

          <h1>{{ user_name || "TipMe User" }}</h1>

          <small>
            Send appreciation using M-Pesa STK Push.
          </small>
        </div>

        <!-- GOAL -->
        <div class="goal-box" v-if="goal_amount">
          <div class="goal-row">
            <span>Goal</span>
            <strong>KES {{ numeral(goal_amount).format("0,0") }}</strong>
          </div>

          <v-progress-linear
            :value="raisedGoalPercentage"
            height="8"
            rounded
            color="#b6ff00"
            background-color="rgba(255,255,255,0.12)"
          />

          <div class="goal-row small">
            <span>Raised</span>
            <strong>KES {{ numeral(goal_raised).format("0,0") }}</strong>
          </div>
        </div>

        <!-- AMOUNT BUTTONS -->
        <div class="amounts">
          <button
            v-for="amount in quickAmounts"
            :key="amount"
            :class="{ active: Number(amount_input) === amount }"
            @click="amount_input = amount"
          >
            KES {{ amount }}
          </button>
        </div>

        <!-- FORM -->
        <div class="form-area">
          <v-text-field
            dark
            outlined
            rounded
            type="number"
            v-model="amount_input"
            color="#b6ff00"
            label="Enter amount"
            placeholder="Example: 200"
          />

          <v-text-field
            dark
            outlined
            rounded
            type="number"
            v-model="mpesa_no"
            :prefix="phonePrefix"
            color="#b6ff00"
            label="Your M-Pesa number"
            placeholder="75..."
          />

          <div class="summary">
            <p>
              STK push will be sent to
              <b>{{ phonePrefix }}{{ mpesa_no || "..." }}</b>
            </p>

            <p>
              Amount:
              <b>KES {{ numeral(amount_input || 0).format("0,0") }}</b>
            </p>
          </div>

          <v-alert v-if="message" type="success" dense outlined>
            {{ message }}
          </v-alert>

          <v-alert v-if="messageError" type="error" dense outlined>
            {{ messageError }}
          </v-alert>

          <button class="tip-btn" :disabled="progress_bar" @click="stkPush">
            <span v-if="!progress_bar">Tip Now</span>
            <span v-else>Sending STK Push...</span>
          </button>
        </div>
      </div>
    </main>

    <!-- PAYMENT STATUS -->
    <v-dialog v-model="paymentDialog" max-width="360">
      <v-card class="dialog-card">
        <div class="dialog-content">
          <v-progress-circular
            v-if="progress_bar"
            indeterminate
            color="#b6ff00"
            :size="70"
            :width="7"
          />

          <v-icon
            v-else-if="message"
            size="70"
            color="#b6ff00"
          >
            mdi-check-circle-outline
          </v-icon>

          <v-icon
            v-else
            size="70"
            color="#ff5c5c"
          >
            mdi-alert-circle-outline
          </v-icon>

          <h3>
            {{ progress_bar ? "Check your phone" : "Payment update" }}
          </h3>

          <p>
            {{
              progress_bar
                ? "Enter your M-Pesa PIN to complete the tip."
                : message || messageError
            }}
          </p>

          <button class="close-btn" @click="paymentDialog = false">
            Close
          </button>
        </div>
      </v-card>
    </v-dialog>

    <!-- SNACKBARS -->
    <v-snackbar v-model="snackbar" :timeout="2500" color="#111" top right>
      {{ snackbarText }}
    </v-snackbar>

    <v-snackbar v-model="snackbarError" :timeout="4000" color="#ff5c5c" top right>
      {{ snackbarTextError }}
    </v-snackbar>
  </v-app>
</template>

<script>
import axios from "axios";
import numeral from "numeral";

export default {
  name: "TipPage",

  data() {
    return {
      numeral,

      UID: this.$route.params.id,

      phonePrefix: "254",
      mpesa_no: "",
      amount_input: "",

      user_name: "",
      user_id: 0,
      goal_amount: 0,
      goal_raised: 0,

      quickAmounts: [50, 100, 200, 500, 1000, 2000],

      CheckoutRequestID: null,

      progress_bar: false,
      paymentDialog: false,

      message: null,
      messageError: null,

      snackbar: false,
      snackbarText: "",

      snackbarError: false,
      snackbarTextError: "",

      paymentCheckTimer: null,
    };
  },

  computed: {
    receiverInitial() {
      if (!this.user_name) return "T";
      return this.user_name.charAt(0).toUpperCase();
    },

    raisedGoalPercentage() {
      if (!this.goal_amount || Number(this.goal_amount) <= 0) return 0;

      const percent =
        (Number(this.goal_raised || 0) / Number(this.goal_amount)) * 100;

      return Math.min(Number(percent.toFixed(1)), 100);
    },
  },

  mounted() {
    if (this.$route.params.id) {
      this.UID = this.$route.params.id;
      this.FetchProfile();
    }
  },

  beforeDestroy() {
    if (this.paymentCheckTimer) {
      clearTimeout(this.paymentCheckTimer);
    }
  },

  methods: {
    onResize() {},

    validateTipForm() {
      const amount = Number(this.amount_input);
      const phone = this.phonePrefix + this.mpesa_no;

      if (!amount || amount <= 0) {
        this.snackbarError = true;
        this.snackbarTextError = "Enter a valid tip amount";
        return false;
      }

      if (!this.mpesa_no) {
        this.snackbarError = true;
        this.snackbarTextError = "Enter your M-Pesa number";
        return false;
      }

      if (phone.length !== 12) {
        this.snackbarError = true;
        this.snackbarTextError =
          "Phone number should be 12 digits including 254";
        return false;
      }

      if (!this.user_id) {
        this.snackbarError = true;
        this.snackbarTextError = "Receiver profile is still loading";
        return false;
      }

      return true;
    },

    async stkPush() {
      if (!this.validateTipForm()) return;

      const phone = this.phonePrefix + this.mpesa_no;

      this.progress_bar = true;
      this.paymentDialog = true;
      this.message = null;
      this.messageError = null;

      axios
        .post(
          "https://tipserver-production.up.railway.app/api/payments/stk-push",
          {
            uid: this.UID,
            profile_id: this.user_id,
            phone,
            amount: this.amount_input,
          }
        )
        .then((response) => {
          this.CheckoutRequestID = response.data.CheckoutRequestID;

          this.message = "STK Push sent. Enter your M-Pesa PIN.";

          this.snackbar = true;
          this.snackbarText = this.message;

          this.startPaymentStatusCheck();
        })
        .catch((error) => {
          this.progress_bar = false;
          this.paymentDialog = false;

          this.snackbarError = true;
          this.snackbarTextError =
            error.response?.data?.message ||
            error.message ||
            "Failed to send STK Push";
        });
    },

    startPaymentStatusCheck() {
      if (!this.CheckoutRequestID) return;

      if (this.paymentCheckTimer) {
        clearTimeout(this.paymentCheckTimer);
      }

      this.paymentCheckTimer = setTimeout(() => {
        this.StkQuery();
      }, 25000);
    },

    StkQuery() {
      axios
        .post(
          "https://tipserver-production.up.railway.app/api/payments/stk-push/query",
          {
            checkoutRequestId: this.CheckoutRequestID,
          }
        )
        .then((response) => {
          this.progress_bar = false;

          const resultCode = String(response.data.ResultCode);

          if (resultCode === "0") {
            this.message = "Payment confirmed. Thank you for tipping.";
            this.snackbar = true;
            this.snackbarText = this.message;
            this.FetchProfile();
            return;
          }

          if (resultCode === "2001") {
            this.messageError = "Wrong M-Pesa PIN entered.";
          } else if (resultCode === "1032") {
            this.messageError = "Transaction cancelled.";
          } else if (resultCode === "1") {
            this.messageError = "Insufficient M-Pesa balance.";
          } else {
            this.messageError =
              response.data.ResultDesc || "Payment could not be completed.";
          }

          this.snackbarError = true;
          this.snackbarTextError = this.messageError;
        })
        .catch((error) => {
          this.progress_bar = false;

          this.messageError =
            error.response?.data?.message ||
            error.message ||
            "Failed to check payment status";

          this.snackbarError = true;
          this.snackbarTextError = this.messageError;
        });
    },

    FetchProfile() {
      axios
        .get(
          `https://tipserver-production.up.railway.app/api/profiles/uid/${this.UID}`
        )
        .then((response) => {
          this.user_name = response.data.username || "";
          this.user_id = response.data.user_id || response.data.id || 0;
          this.goal_amount = response.data.goal_amount || 0;
          this.goal_raised = response.data.goal_raised || 0;
        })
        .catch((error) => {
          this.snackbarError = true;
          this.snackbarTextError =
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch profile";
        });
    },
  },
};
</script>

<style scoped>
.tip-page {
  min-height: 100vh;
  background: #050505;
  color: white;
  padding: 20px;
  font-family: "Inter", "Poppins", Arial, sans-serif;
}

.tip-bg {
  position: fixed;
  inset: 0;
  background:
    radial-gradient(circle at top left, rgba(182, 255, 0, 0.18), transparent 30%),
    linear-gradient(135deg, #050505, #090909);
  pointer-events: none;
}

.top-bar {
  position: relative;
  z-index: 2;
  max-width: 520px;
  margin: 0 auto 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.back-btn {
  width: 42px;
  height: 42px;
  border: 0;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.08);
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 900;
  cursor: pointer;
}

.brand-icon {
  width: 38px;
  height: 38px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  color: black;
  background: linear-gradient(135deg, #b6ff00, #00ff99);
}

.tip-wrapper {
  position: relative;
  z-index: 2;
  min-height: calc(100vh - 90px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.tip-card {
  width: 100%;
  max-width: 520px;
  padding: 28px;
  border-radius: 30px;
  background: rgba(10, 10, 10, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.09);
  box-shadow: 0 35px 90px rgba(0, 0, 0, 0.45);
}

.receiver {
  text-align: center;
  margin-bottom: 24px;
}

.avatar {
  width: 76px;
  height: 76px;
  margin: 0 auto 16px;
  border-radius: 26px;
  display: grid;
  place-items: center;
  color: black;
  font-size: 34px;
  font-weight: 950;
  background: linear-gradient(135deg, #b6ff00, #00ff99);
}

.receiver p {
  margin: 0;
  color: rgba(255, 255, 255, 0.55);
  font-size: 14px;
}

.receiver h1 {
  margin: 8px 0;
  color: #b6ff00;
  font-size: 34px;
  letter-spacing: -1px;
}

.receiver small {
  color: rgba(255, 255, 255, 0.6);
}

.goal-box {
  padding: 16px;
  margin-bottom: 20px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.055);
}

.goal-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.goal-row.small {
  margin-top: 10px;
  margin-bottom: 0;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
}

.amounts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 9px;
  margin-bottom: 20px;
}

.amounts button {
  height: 48px;
  border: 0;
  border-radius: 16px;
  color: white;
  font-weight: 900;
  background: rgba(255, 255, 255, 0.08);
}

.amounts button.active {
  color: black;
  background: linear-gradient(135deg, #b6ff00, #00ff99);
}

.summary {
  padding: 14px;
  margin-bottom: 16px;
  border-radius: 18px;
  background: rgba(182, 255, 0, 0.08);
}

.summary p {
  margin: 0 0 6px;
  color: rgba(255, 255, 255, 0.75);
  font-size: 13px;
}

.summary p:last-child {
  margin-bottom: 0;
}

.summary b {
  color: white;
}

.tip-btn {
  width: 100%;
  height: 54px;
  border: 0;
  border-radius: 999px;
  color: black;
  font-weight: 950;
  background: linear-gradient(135deg, #b6ff00, #00ff99);
}

.tip-btn:disabled {
  opacity: 0.7;
}

.dialog-card {
  border-radius: 26px !important;
  background: #080808 !important;
  color: white;
}

.dialog-content {
  padding: 28px;
  text-align: center;
}

.dialog-content h3 {
  margin: 18px 0 8px;
}

.dialog-content p {
  color: rgba(255, 255, 255, 0.65);
}

.close-btn {
  width: 100%;
  height: 46px;
  margin-top: 18px;
  border: 0;
  border-radius: 999px;
  color: black;
  font-weight: 900;
  background: linear-gradient(135deg, #b6ff00, #00ff99);
}

::v-deep .v-text-field--outlined fieldset {
  border-color: rgba(255, 255, 255, 0.16) !important;
}

::v-deep input {
  color: white !important;
}

@media (max-width: 520px) {
  .tip-page {
    padding: 14px;
  }

  .tip-wrapper {
    align-items: flex-start;
  }

  .tip-card {
    padding: 22px;
    border-radius: 24px;
  }

  .amounts {
    grid-template-columns: repeat(2, 1fr);
  }

  .receiver h1 {
    font-size: 28px;
  }
}
</style>