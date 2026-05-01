<template>
  <v-app class="auth-page" v-resize="onResize">
    <!-- NAVBAR -->
    <nav class="auth-navbar">
      <div class="nav-brand" @click="goTo('/')">
        <div class="nav-brand-icon">T</div>

        <div class="nav-brand-text">
          <h3>TipMe</h3>
          <span>Digital tipping made simple</span>
        </div>
      </div>

      <!-- DESKTOP NAV -->
      <div class="nav-links desktop-nav">
        <button @click="goTo('/')">Home</button>
        <button @click="goTo('/#about')">About</button>
        <button @click="goTo('/#who')">Who Uses It</button>
        <button @click="goTo('/#steps')">How It Works</button>
        <button @click="goTo('/wallet')">Wallet</button>
        <button @click="goTo('/terms')">Terms</button>
      </div>

      <!-- MOBILE NAV -->
      <div class="mobile-nav-actions">
        <button class="mobile-home" @click="goTo('/')">Home</button>

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

          <button @click="handleMobileRoute('/#who')">
            <v-icon size="18" color="#b6ff00">mdi-account-group-outline</v-icon>
            Who Uses It
          </button>

          <button @click="handleMobileRoute('/#steps')">
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

    <!-- BACKGROUND -->
    <div class="auth-bg"></div>

    <main class="auth-shell">
      <!-- BACK BUTTON -->
      <button class="back-btn" @click="$router.back()">
        <v-icon size="20" color="white">mdi-arrow-left</v-icon>
        Back
      </button>

      <v-row align="center" class="auth-grid">
        <!-- AUTH CARD -->
        <v-col cols="12" md="6">
          <div class="auth-card">
            <v-progress-linear
              v-show="progress_bar"
              indeterminate
              color="#b6ff00"
              class="top-progress"
            />

            <v-progress-linear
              v-show="progress_bar2"
              indeterminate
              color="#b6ff00"
              class="top-progress"
            />

            <div class="auth-card-header">
              <div class="auth-pill">
                <span></span>
                {{ login ? "Welcome back" : "Create your TipMe account" }}
              </div>

              <h1>
                {{ login ? "Log in to your wallet." : "Start receiving tips today." }}
              </h1>

              <p>
                {{
                  login
                    ? "Access your TipMe wallet, QR code, transactions and withdrawals."
                    : "Create a profile, set your goal and start receiving digital tips through QR and mobile money."
                }}
              </p>
            </div>

            <!-- TABS -->
            <div class="auth-tabs">
              <button :class="{ active: login }" @click="setAuthTab('login')">
                <v-icon size="18">mdi-login</v-icon>
                Login
              </button>

              <button :class="{ active: register }" @click="setAuthTab('register')">
                <v-icon size="18">mdi-account-plus-outline</v-icon>
                New Account
              </button>
            </div>

            <!-- LOGIN -->
            <div v-show="login" class="auth-form">
              <div class="form-intro">
                <h3>Account login</h3>
                <p>Enter your email and password to continue.</p>
              </div>

              <v-text-field
                dark
                outlined
                rounded
                type="email"
                v-model="auth.email"
                color="#b6ff00"
                placeholder="Enter email"
                prepend-inner-icon="mdi-email-outline"
              />

              <v-text-field
                dark
                outlined
                rounded
                :type="showLoginPassword ? 'text' : 'password'"
                v-model="auth.password"
                color="#b6ff00"
                placeholder="Enter password"
                prepend-inner-icon="mdi-lock-outline"
                :append-icon="showLoginPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                @click:append="showLoginPassword = !showLoginPassword"
              />

              <button class="primary-action" @click="loginAuth">
                <span>Log in</span>
                <v-icon size="18" color="black">mdi-arrow-right</v-icon>
              </button>

              <p class="switch-text">
                New to TipMe?
                <button @click="setAuthTab('register')">Create account</button>
              </p>
            </div>

            <!-- REGISTER -->
            <div v-show="register" class="auth-form">
              <div class="form-intro">
                <h3>Create profile</h3>
                <p>Fill in your profile details to receive tips.</p>
              </div>

              <v-text-field
                dark
                outlined
                rounded
                type="text"
                v-model="username"
                color="#b6ff00"
                placeholder="Enter username"
                prepend-inner-icon="mdi-account-outline"
              />

              <v-text-field
                dark
                outlined
                rounded
                type="text"
                v-model="phone"
                color="#b6ff00"
                placeholder="Phone number"
                prepend-inner-icon="mdi-phone-outline"
              />

              <div class="goal-preview">
                <div>
                  <small>Goal amount</small>
                  <strong>KES {{ goal_amount || 0 }}</strong>
                </div>

                <v-progress-linear
                  :value="goalProgress"
                  color="#b6ff00"
                  height="8"
                  rounded
                />
              </div>

              <v-text-field
                dark
                outlined
                rounded
                type="number"
                v-model="goal_amount"
                color="#b6ff00"
                placeholder="Goal amount"
                prepend-inner-icon="mdi-bullseye-arrow"
              />

              <v-textarea
                dark
                outlined
                rounded
                v-model="description"
                color="#b6ff00"
                label="Description"
                placeholder="Tell supporters what you do or what you are raising tips for"
                prepend-inner-icon="mdi-text-box-outline"
              />

              <v-select
                dark
                outlined
                rounded
                v-model="category"
                :items="items"
                label="Category"
                color="#b6ff00"
                prepend-inner-icon="mdi-shape-outline"
              />

              <v-text-field
                dark
                outlined
                rounded
                type="email"
                v-model="auth.email"
                color="#b6ff00"
                placeholder="Enter email"
                prepend-inner-icon="mdi-email-outline"
              />

              <v-text-field
                dark
                outlined
                rounded
                :type="showRegisterPassword ? 'text' : 'password'"
                v-model="auth.password"
                color="#b6ff00"
                placeholder="Enter password"
                prepend-inner-icon="mdi-lock-outline"
                :append-icon="showRegisterPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                @click:append="showRegisterPassword = !showRegisterPassword"
              />

              <v-text-field
                dark
                outlined
                rounded
                :type="showConfirmPassword ? 'text' : 'password'"
                v-model="password_match"
                color="#b6ff00"
                placeholder="Re-enter password"
                prepend-inner-icon="mdi-lock-check-outline"
                :append-icon="showConfirmPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                @click:append="showConfirmPassword = !showConfirmPassword"
              />

              <div class="terms-check">
                <v-checkbox v-model="checkbox" color="#b6ff00" dark hide-details>
                  <template v-slot:label>
                    <div class="terms-label">
                      I agree to the
                      <NuxtLink to="/terms" @click.stop>
                        Terms and Conditions
                      </NuxtLink>
                      of TipMe
                    </div>
                  </template>
                </v-checkbox>
              </div>

              <button class="primary-action" @click="signUp">
                <span>Create Account</span>
                <v-icon size="18" color="black">mdi-arrow-right</v-icon>
              </button>

              <p class="switch-text">
                Already have an account?
                <button @click="setAuthTab('login')">Log in</button>
              </p>
            </div>
          </div>
        </v-col>

        <!-- RIGHT HERO -->
        <v-col cols="12" md="6" class="d-none d-md-flex">
          <div class="side-panel">
            <div class="side-glow"></div>

            <div class="phone-preview">
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

              <div class="preview-row">
                <div>
                  <small>Recent tip</small>
                  <strong>KES 250</strong>
                </div>
                <span>Completed</span>
              </div>

              <div class="preview-row">
                <div>
                  <small>Payment method</small>
                  <strong>M-Pesa</strong>
                </div>
                <span>Active</span>
              </div>
            </div>

            <div class="floating-note note-one">
              <strong>No app needed</strong>
              <span>Supporters scan and tip instantly</span>
            </div>

            <div class="floating-note note-two">
              <strong>QR Ready</strong>
              <span>Share your tipping link anywhere</span>
            </div>
          </div>
        </v-col>
      </v-row>
    </main>

    <!-- VERIFY SUBMIT DIALOG -->
    <v-dialog v-model="verify_submit" max-width="520">
      <v-card class="dark-dialog">
        <div class="dialog-head">
          <div>
            <h3>Verify your answers</h3>
            <p>Confirm your security answers before submitting.</p>
          </div>

          <v-btn icon @click="verify_submit = false">
            <v-icon color="#ff5c5c">mdi-close</v-icon>
          </v-btn>
        </div>

        <div class="dialog-body">
          <div class="answer-item">
            <strong>{{ q1 }}</strong>
            <span>{{ q11 }}</span>
          </div>

          <div class="answer-item">
            <strong>{{ q2 }}</strong>
            <span>{{ q12 }}</span>
          </div>

          <div class="answer-item">
            <strong>{{ q3 }}</strong>
            <span>{{ q13 }}</span>
          </div>

          <div class="answer-item">
            <strong>{{ q4 }}</strong>
            <span>{{ q14 }}</span>
          </div>

          <div class="answer-item">
            <strong>{{ q5 }}</strong>
            <span>{{ q15 }}</span>
          </div>

          <button class="primary-action" @click="storeSecurityQuestions()">
            Submit questionnaires
          </button>
        </div>
      </v-card>
    </v-dialog>

    <!-- SNACKBARS -->
    <v-snackbar
      v-model="snackbar"
      :timeout="4000"
      color="#111"
      top
      right
    >
      {{ snackbarText }}
    </v-snackbar>

    <v-snackbar
      v-model="snackbar2"
      :timeout="4000"
      color="#ff5c5c"
      top
      right
    >
      {{ snackbarText2 }}
    </v-snackbar>
  </v-app>
</template>

<script>
import CryptoJS from "crypto-js";
import firebase from "firebase/compat/app";
import axios from "axios";

const ivKey = "smslt";

export default {
  name: "AuthPage",

  data() {
    return {
      mobileMenu: false,
      showLoginPassword: false,
      showRegisterPassword: false,
      showConfirmPassword: false,

      password_match: null,
      checkbox: false,
      showHeroCard: true,
      showBurger: true,
      windowSize: {
        x: process.client ? window.innerWidth : 0,
        y: process.client ? window.innerHeight : 0,
      },

      items: ["Service Worker", "Content Creator", "Dj", "Personal"],
      UID: null,
      verify_submit: false,

      q1: "Question 1",
      q2: "Question 2",
      q3: "Question 3",
      q4: "Question 4",
      q5: "Question 5",

      q11: null,
      q12: null,
      q13: null,
      q14: null,
      q15: null,

      show: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,

      password_status: false,
      pass_status: "",
      pin: null,
      verify_pin: null,
      auth_state: false,
      security_quiz: false,
      security_key: false,
      secretKey: null,
      set_Pin: false,

      code_state1: false,
      code_state: false,
      show66: false,

      progress_bar: false,
      progress_bar2: false,

      snackbar: false,
      snackbarText: "No error message",
      snackbar2: false,
      snackbarText2: "",

      login: true,
      register: false,

      user_name: "",
      first_name: "",
      last_name: "",
      phone_no: "",
      phone_no2: "",
      email: "",
      user_uid: null,
      verified: false,
      user_image: "",

      auth: {
        email: "",
        password: "",
      },

      image: null,
      randomNineDigitNumber: null,
      code_no: "",
      code_no2: "",
      request_no: null,
      appVerifier: null,
      appVerifier2: null,
      confirmation_Result: null,

      phone: "",
      county: "",

      loader: null,
      loading: false,
      loading2: false,
      user_state: "",

      code_state_otp: false,
      timerCount: 30,
      timerEnabled: false,

      user_id: "",
      uid: "",
      username: "",
      display_name: "",
      category: "Content Creator",
      description: "",
      avatar_url: "",
      goal_amount: "",
    };
  },

  computed: {
    goalProgress() {
      const goal = Number(this.goal_amount || 0);
      if (!goal) return 0;

      return Math.min((goal / 10000) * 100, 100);
    },
  },

  watch: {
    timerEnabled(value) {
      if (value) {
        setTimeout(() => {
          this.timerCount--;
        }, 1000);
      }
    },

    timerCount: {
      handler(value) {
        if (value > 0 && this.timerEnabled) {
          setTimeout(() => {
            this.timerCount--;
          }, 1000);
        } else if (value === 0) {
          this.code_state = false;
          this.timerEnabled = false;
          this.snackbar2 = true;
          this.snackbarText2 = "Time out";
        }
      },
      immediate: true,
    },
  },

  created() {
    this.generateRandomNumber();
  },

  mounted() {
    this.onResize();
  },

  methods: {
    goTo(path) {
      this.$router.push(path);
    },

    handleMobileRoute(path) {
      this.mobileMenu = false;
      this.goTo(path);
    },

    setAuthTab(tab) {
      if (tab === "login") {
        this.login = true;
        this.register = false;
      } else {
        this.login = false;
        this.register = true;
      }
    },

    loginAuth() {
      const that = this;

      if (!this.auth.email || !this.auth.password) {
        this.snackbar2 = true;
        this.snackbarText2 = "Provide email and password";
        return;
      }

      that.progress_bar = true;

      const mAuth = this.$fire.auth;

      mAuth
        .signInWithEmailAndPassword(this.auth.email, this.auth.password)
        .then(() => {
          that.progress_bar = false;
          that.$router.push("/wallet");
        })
        .catch(function (error) {
          that.snackbarText2 = error.message;
          that.snackbar2 = true;
          that.progress_bar = false;
        });
    },

    signUp() {
      if (
        !this.username ||
        !this.category ||
        !this.description ||
        !this.goal_amount ||
        !this.phone ||
        !this.auth.email ||
        !this.auth.password
      ) {
        this.snackbar2 = true;
        this.snackbarText2 = "Provide input from the required fields";
        return;
      }

      if (this.checkbox === false) {
        this.snackbar2 = true;
        this.snackbarText2 = "Agree to the terms and conditions";
        return;
      }

      if (this.password_match !== this.auth.password) {
        this.snackbar2 = true;
        this.snackbarText2 = "Passwords do not match";
        return;
      }

      const mAuth = this.$fire.auth;
      this.progress_bar2 = true;

      mAuth
        .createUserWithEmailAndPassword(this.auth.email, this.auth.password)
        .then((user) => {
          this.UID = user.user.uid;
          this.StoreUSer(user.user.uid);
          this.show_auth = true;
        })
        .catch((error) => {
          console.log(error);
          this.snackbar2 = true;
          this.snackbarText2 = error.message || "Failed to create account";
          this.progress_bar2 = false;
        });
    },

    onResize() {
      if (!process.client) return;

      this.windowSize = {
        x: window.innerWidth,
        y: window.innerHeight,
      };

      if (this.windowSize.x < 950) {
        this.showBurger = true;
        this.showHeroCard = true;
      } else {
        this.showBurger = false;
      }

      return this.windowSize;
    },

    async StoreUSer(val) {
      const that = this;

      axios
        .post(`https://tipserver-production.up.railway.app/api/user/add_users`, {
          uid: val,
          phone: that.phone,
        })
        .then(function (response) {
          console.log("Place user", response.data);

          that.StoreProfile(response.data);
          that.user_id = response.data.id;
          that.uid = val;
        })
        .catch(function (error) {
          console.log(error);

          if (error.response && error.response.status === 409) {
            that.snackbar2 = true;
            that.snackbarText2 = "Profile exists";
          } else {
            that.snackbar2 = true;
            that.snackbarText2 = "Something went wrong. Try again later.";
          }

          that.progress_bar2 = false;
        });
    },

    async FetchProfile() {
      const that = this;

      axios
        .get(`https://tipserver-production.up.railway.app/api/profiles/uid/${that.UID}`)
        .then(function (response) {
          console.log("Show profile", response.data);
        })
        .catch(function (error) {
          console.log(error);
          that.snackbarText2 = error.message;
          that.snackbar2 = true;
        });
    },

    async StoreProfile(val) {
      const that = this;

      axios
        .post(`https://tipserver-production.up.railway.app/api/profiles/create_profile`, {
          user_id: val.id,
          uid: that.UID,
          username: that.username,
          display_name: that.username + "_tp",
          category: that.category,
          description: that.description,
          avatar_url: `https://tip-mee.netlify.app/tipp_wallet/${that.UID}`,
          goal_amount: that.goal_amount,
        })
        .then(function (response) {
          console.log("Place profile", response.data);

          that.progress_bar2 = false;
          that.snackbar = true;
          that.snackbarText = "Account created successfully";

          that.$router.push({
            path: "/wallet",
          });
        })
        .catch(function (error) {
          console.log(error);

          if (error.response && error.response.status === 409) {
            that.snackbar2 = true;
            that.snackbarText2 = "Profile exists";
          } else {
            that.snackbar2 = true;
            that.snackbarText2 = "Something went wrong. Try again later.";
          }

          that.progress_bar2 = false;
        });
    },

    loginAnonymously1() {
      if (
        !this.name ||
        !this.username ||
        !this.category ||
        !this.description ||
        !this.goal_amount ||
        !this.phone ||
        !this.email
      ) {
        this.snackbar2 = true;
        this.snackbarText2 = "Provide input from the required fields";
        return;
      }

      if (this.checkbox === false) {
        this.snackbar2 = true;
        this.snackbarText2 = "Agree to the terms and conditions";
        return;
      }

      this.$fire.auth
        .signInAnonymously()
        .then((user) => {
          this.UID = user.user.uid;
          this.StoreUSer(user.user.uid);
          this.show_auth = true;
        })
        .catch((error) => {
          this.snackbarText2 = error.message;
          this.snackbar2 = true;
          this.showLogin = false;
        });
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
      if (this.phone_no === "") {
        this.snackbar2 = true;
        this.snackbarText2 = "Provide phone number";
        return;
      }

      this.progress_bar = true;
      this.configureRecaptcha();

      const phoneNumber = "+254" + this.phone_no;
      this.appVerifier = window.recaptchaVerifier;

      firebase.auth().languageCode = "en";

      firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, this.appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          this.confirmation_Result = confirmationResult;
          this.progress_bar = false;
          this.timerEnabled = true;

          if (this.confirmation_Result.verificationId == null) {
            this.code_state_otp = true;
            this.code_state = false;
          }

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
        .then((user) => {
          this.StoreUSer(user.user.uid);
        })
        .catch((error) => {
          this.progress_bar = false;
          console.log("Error", error);
          this.snackbar2 = true;
          this.snackbarText2 = error.message || error;
        });
    },

    SecurityQuestions() {
      const db = this.$fire.firestore;

      if (!this.q11 || !this.q12 || !this.q13 || !this.q14 || !this.q15) {
        this.snackbar2 = true;
        this.snackbarText2 = "Please answer all available questions.";
        return;
      }

      const docRefUpdate = db
        .collection("Tipp_user")
        .doc(this.$fire.auth.currentUser.uid);

      const docRefNew = db
        .collection("Tipp_user")
        .doc(this.$fire.auth.currentUser.uid)
        .collection("Security_questions")
        .doc(this.$fire.auth.currentUser.uid);

      const newData = {
        "What's your mothers middle name?": this.encrypteData(this.q11),
        "In which county were you born?": this.encrypteData(this.q12),
        "What's your favorite food?": this.encrypteData(this.q13),
        "What's your father's first name?": this.encrypteData(this.q14),
        "What's your favorite childhood game?": this.encrypteData(this.q15),
      };

      const updateData = {
        security_quiz: true,
      };

      db.runTransaction(async (transaction) => {
        transaction.set(docRefNew, newData);
        transaction.update(docRefUpdate, updateData);
      })
        .then(() => {
          this.snackbar = true;
          this.progress_bar2 = false;
          this.snackbarText = "Answers submitted";

          if (this.FetchUserPin) {
            this.FetchUserPin();
          }
        })
        .catch((error) => {
          this.snackbar2 = true;
          this.snackbarText2 = error.message || error;
          this.progress_bar2 = false;
          console.error("Error adding listing: ", error);
        });
    },

    onSelect({ name, iso2, dialCode }) {
      console.log(name, iso2, dialCode);
    },

    encrypteData(data) {
      if (this.secretKey == null) {
        this.pass_status = "Unable to detect key";
        return;
      }

      if (data != null) {
        const key = CryptoJS.PBKDF2(this.secretKey, "salt", {
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
      if (this.secretKey == null) {
        this.pass_status = "Unable to detect key";
        return;
      }

      if (data) {
        const key = CryptoJS.PBKDF2(this.secretKey, "salt", {
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

    CheckPassword(val, val2) {
      if (val === val2) {
        this.pass_status = "Password matches";
        return true;
      }

      this.pass_status = "Password does not match";
      return false;
    },

    generateRandomNumber() {
      const digits = "DY*1234FA6789";
      let randomNumber = "";
      const length = 9;

      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        randomNumber += digits[randomIndex];
      }

      this.randomNineDigitNumber = randomNumber;

      return randomNumber;
    },

    checkUser() {
      if (this.$fire.auth.currentUser != null) {
        this.secretKey = this.$fire.auth.currentUser.uid;
      } else {
        this.auth_state = false;
      }
    },
  },
};
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  color: #ffffff;
  background: #050505;
  padding: 120px 18px 70px;
  font-family: "Inter", "Poppins", Arial, sans-serif;
}

/* NAVBAR */
.auth-navbar {
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
  gap: 6px;
  flex: 1;
  white-space: nowrap;
}

.nav-links button {
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

.nav-links button:hover {
  color: black;
  background: linear-gradient(135deg, #b6ff00, #00ff99);
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

.mobile-menu button:hover {
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
.auth-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 12% 10%, rgba(182, 255, 0, 0.2), transparent 28%),
    radial-gradient(circle at 90% 20%, rgba(0, 255, 153, 0.14), transparent 24%),
    radial-gradient(circle at 50% 100%, rgba(255, 255, 255, 0.06), transparent 30%),
    linear-gradient(135deg, #050505 0%, #080808 48%, #020202 100%);
}

.auth-bg::after {
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

.auth-shell {
  position: relative;
  z-index: 2;
  max-width: 1180px;
  margin: 0 auto;
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

.auth-grid {
  min-height: calc(100vh - 190px);
}

/* AUTH CARD */
.auth-card {
  position: relative;
  overflow: hidden;
  padding: 32px;
  border-radius: 36px;

  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.095), rgba(255, 255, 255, 0.035)),
    rgba(8, 8, 8, 0.9);

  border: 1px solid rgba(255, 255, 255, 0.09);
  box-shadow: 0 35px 90px rgba(0, 0, 0, 0.42);
  backdrop-filter: blur(20px);
}

.auth-card::before {
  content: "";
  position: absolute;
  width: 320px;
  height: 320px;
  top: -170px;
  right: -140px;
  border-radius: 50%;
  background: rgba(182, 255, 0, 0.15);
  filter: blur(30px);
}

.top-progress {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.auth-card-header,
.auth-tabs,
.auth-form {
  position: relative;
  z-index: 2;
}

.auth-pill {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 18px;
  padding: 8px 13px;
  border-radius: 999px;
  color: #b6ff00;
  background: rgba(182, 255, 0, 0.08);
  border: 1px solid rgba(182, 255, 0, 0.16);
  font-size: 12px;
  font-weight: 900;
}

.auth-pill span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #b6ff00;
  box-shadow: 0 0 16px rgba(182, 255, 0, 0.8);
}

.auth-card-header h1 {
  margin: 0;
  font-size: clamp(34px, 5vw, 58px);
  line-height: 0.95;
  letter-spacing: -3px;
  font-weight: 950;
}

.auth-card-header p {
  margin: 18px 0 0;
  max-width: 480px;
  color: rgba(255, 255, 255, 0.62);
  font-size: 15px;
  line-height: 1.7;
}

/* TABS */
.auth-tabs {
  margin-top: 28px;
  padding: 6px;
  border-radius: 999px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  background: rgba(255, 255, 255, 0.06);
}

.auth-tabs button {
  height: 48px;
  border: 0;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.66);
  background: transparent;
  cursor: pointer;
  font-weight: 900;
}

.auth-tabs button.active {
  color: black;
  background: linear-gradient(135deg, #b6ff00, #00ff99);
}

/* FORM */
.auth-form {
  margin-top: 26px;
}

.form-intro {
  margin-bottom: 18px;
}

.form-intro h3 {
  margin: 0;
  font-size: 23px;
  letter-spacing: -0.8px;
}

.form-intro p {
  margin: 6px 0 0;
  color: rgba(255, 255, 255, 0.52);
  font-size: 14px;
}

.goal-preview {
  margin-bottom: 18px;
  padding: 16px;
  border-radius: 22px;
  background: rgba(182, 255, 0, 0.07);
  border: 1px solid rgba(182, 255, 0, 0.14);
}

.goal-preview div {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.goal-preview small {
  color: rgba(255, 255, 255, 0.58);
}

.goal-preview strong {
  color: #b6ff00;
}

.terms-check {
  margin: -4px 0 18px;
}

.terms-label {
  color: rgba(255, 255, 255, 0.68);
  font-size: 14px;
  line-height: 1.5;
}

.terms-label a {
  color: #b6ff00;
  text-decoration: none;
  font-weight: 900;
}

.primary-action {
  width: 100%;
  height: 54px;
  border: 0;
  border-radius: 999px;
  padding: 0 22px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  color: black;
  font-weight: 950;
  background: linear-gradient(135deg, #b6ff00, #00ff99);
  box-shadow: 0 20px 50px rgba(182, 255, 0, 0.2);
}

.switch-text {
  margin: 18px 0 0;
  text-align: center;
  color: rgba(255, 255, 255, 0.58);
  font-size: 14px;
}

.switch-text button {
  border: 0;
  background: transparent;
  color: #b6ff00;
  cursor: pointer;
  font-weight: 900;
}

/* SIDE PANEL */
.side-panel {
  position: relative;
  width: 100%;
  min-height: 690px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.side-glow {
  position: absolute;
  width: 520px;
  height: 520px;
  border-radius: 50%;
  background: rgba(182, 255, 0, 0.14);
  filter: blur(70px);
}

.phone-preview {
  position: relative;
  z-index: 2;
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

.preview-row {
  margin-top: 18px;
  padding: 17px;
  border-radius: 22px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: rgba(255, 255, 255, 0.065);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.preview-row small {
  display: block;
  color: rgba(255, 255, 255, 0.52);
  margin-bottom: 5px;
}

.preview-row strong {
  font-size: 17px;
}

.preview-row > span {
  color: #b6ff00;
  font-size: 12px;
  font-weight: 800;
}

.floating-note {
  position: absolute;
  z-index: 3;
  padding: 16px 18px;
  border-radius: 22px;
  background: rgba(10, 10, 10, 0.78);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(18px);
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.45);
}

.floating-note strong {
  display: block;
  font-size: 17px;
  margin-bottom: 4px;
}

.floating-note span {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.55);
}

.note-one {
  top: 110px;
  left: 10px;
}

.note-two {
  right: 0;
  bottom: 130px;
}

/* DIALOG */
.dark-dialog {
  border-radius: 30px !important;
  color: white;
  overflow: hidden;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.095), rgba(255, 255, 255, 0.035)),
    rgba(8, 8, 8, 0.96) !important;
  border: 1px solid rgba(255, 255, 255, 0.09);
}

.dialog-head {
  padding: 24px;
  display: flex;
  justify-content: space-between;
  gap: 14px;
  align-items: flex-start;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
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

.answer-item {
  padding: 14px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.answer-item strong {
  display: block;
  margin-bottom: 5px;
  color: #b6ff00;
}

.answer-item span {
  color: rgba(255, 255, 255, 0.7);
}

/* VUETIFY OVERRIDES */
::v-deep .v-text-field--outlined fieldset,
::v-deep .v-textarea fieldset,
::v-deep .v-select fieldset {
  border-color: rgba(255, 255, 255, 0.14) !important;
}

::v-deep .v-label {
  color: rgba(255, 255, 255, 0.62) !important;
}

::v-deep input,
::v-deep textarea {
  color: white !important;
}

::v-deep .v-input__slot {
  background: rgba(255, 255, 255, 0.035) !important;
}

/* RESPONSIVE */
@media (max-width: 1120px) {
  .nav-brand-text span {
    display: none;
  }

  .nav-links {
    gap: 4px;
  }

  .nav-links button {
    padding: 9px 10px;
    font-size: 12px;
  }
}

@media (max-width: 900px) {
  .desktop-nav {
    display: none;
  }

  .mobile-nav-actions {
    display: flex;
  }

  .auth-navbar {
    top: 14px;
    width: calc(100% - 28px);
    height: 70px;
    border-radius: 24px;
    padding: 0 14px;
  }
}

@media (max-width: 700px) {
  .auth-page {
    padding: 100px 12px 60px;
  }

  .auth-card {
    border-radius: 28px;
    padding: 24px;
  }

  .auth-card-header h1 {
    letter-spacing: -2px;
  }

  .auth-tabs {
    grid-template-columns: 1fr;
    border-radius: 22px;
  }

  .auth-tabs button {
    border-radius: 18px;
  }

  .dialog-head {
    padding: 20px;
  }

  .dialog-body {
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .auth-navbar {
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