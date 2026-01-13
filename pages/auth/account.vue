<template>
<v-app class="container parallax" style="background-color: black;color: white;" v-resize="onResize">
    <div class="container">
        <v-btn icon color="white" @click="$router.back()">
            <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
    </div>
    <v-row>
        <v-col cols="12" md="6">
            <div class="">
                <v-progress-linear v-show="progress_bar" indeterminate color="green"></v-progress-linear>
                <v-progress-linear v-show="progress_bar2" indeterminate color="green"></v-progress-linear>
            </div>
            <v-card dark elevation="0" color="transparent" class="box">
                <v-tabs dark color="green" center-active :show-arrows="true" class="text-center">
                    <v-tab v-show="!auth_state" value="two" @click="(register = true), (login = false)">
                        <span>New Account</span></v-tab>

                </v-tabs>

                <div>
                    <form>

                        <div class="contianer" style="margin: 30px;">
                            <v-text-field type="text" v-model="username" color="green" placeholder="Enter username" outlined rounded>
                            </v-text-field>

                            <v-text-field type="text" v-model="phone" color="green" placeholder="Phone number" outlined rounded>
                            </v-text-field>

                            <v-progress-linear style="width: 90%;margin-left: 20px;" :size="10" width="1" :value="goal_amount" :max="10000" color="green" rounded/>
                            <v-text-field type="number" v-model="goal_amount" color="green" placeholder="Goal amount" outlined rounded>
                            </v-text-field>
                            

                            <v-textarea v-model="description" filled name="description" color="green" label="Description" outlined rounded></v-textarea>

                            <!-- <v-select :items="items" label="Standard"></v-select> -->
                            <v-select v-model="category" :items="items" label="Label" color="green" outlined rounded></v-select>

                            <v-text-field type="email" v-model="email" placeholder="Enter email" color="green" outlined rounded>
                            </v-text-field>
                            <v-checkbox v-model="checkbox" color="green">
                                <template v-slot:label>
                                    <div>
                                        I agree to the
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on }">
                                                <nuxt-link stytle="color:blue;" to="/terms" @click.stop v-on="on">
                                                    Terms and Condtions
                                                </nuxt-link t>
                                            </template>
                                        </v-tooltip>
                                        od TipMe
                                    </div>
                                </template>
                            </v-checkbox>
                        </div>

                        <!-- <v-row>
                                <v-col cols="12" md="12" v-show="!code_state">
                                    <div class="container text-center">
                                        <br />

                                        <div class="container">
                                            <v-spacer />
                                            <div class="d-flex text-center">
                                                <div>
                                                    <vue-country-code style="padding: 10px 6px 10px 6px" color="white" id="codePicker" elevation="0" aria-orientation="vertical" @onSelect="onSelect" defaultCountry="ke">
                                                    </vue-country-code>
                                                </div>

                                                <v-text-field width="200" outlined v-model="phone_no_auth" :counter="16" type="number" label="Provide phone number"></v-text-field>
                                            </div>
                                        </div>

                                        <div class="d-flex">
                                            <v-spacer />
                                            <div id="recaptcha-container" data-sitekey="AIzaSyA0emGzJyErokuL84Eb_Fy4YWRxdXBi6Jo" data-callback="sendForm" data-size="visible"></div>
                                            <v-spacer />
                                        </div>

                                        <v-btn color="black" class="green--text" @click="sendOtpForVerification()">Request OTP</v-btn>
                                    </div>
                                </v-col>
                                <v-col v-show="code_state" cols="12" md="12" sm="12">
                                    <div class="container">
                                        <div class="d-flex">
                                            <v-spacer />
                                            <v-otp-input v-model="code_no" :disabled="loading" @finish="onFinish" length="6"></v-otp-input>
                                            <v-spacer />
                                        </div>

                                        <v-progress-circular v-show="show66" :rotate="360" :size="20" :width="8" :value="timerCount" color="secondary">
                                            {{ timerCount }} sec
                                        </v-progress-circular>
                                    </div>
                                    <div class="container">
                                        <v-btn color="black" class="green--text" @click="ConfirmCode">Verify Code</v-btn>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col v-show="code_state_otp" cols="12" md="12" sm="12">
                            <div class="container">
                                <div class="d-flex">
                                    <v-otp-input v-model="code_no" :disabled="loading" @finish="onFinish" length="6"></v-otp-input>
                                </div>

                                <v-progress-circular v-show="show66" :rotate="360" :size="20" :width="8" :value="timerCount" color="secondary">
                                    {{ timerCount }} sec
                                </v-progress-circular>
                            </div>
                            <div class="container">
                                <v-btn color="black" class="green--text" @click="ConfirmCode">Verify Code</v-btn>
                            </div>
                        </v-col> -->

                    </form>
                </div>

                <v-btn rounded color="green" style="color: black;" class="black-text" width="100%" @click="loginAnonymously1">Sign Up</v-btn>

            </v-card>
        </v-col>
        <v-col cols="12" md="6" lg="6" v-show="!showBurger">
            <div>
                <v-img :src="home" height="700" contain style="margin: 100px;" />

            </div>

        </v-col>

    </v-row>
    <v-dialog v-model="verify_submit">
        <v-card elevation="0">
            <div class="container">
                <p>Verify your answers before submitting</p>
            </div>
            <v-card-title>{{ q1 }}</v-card-title>
            <v-card-subtitle>{{ q11 }}</v-card-subtitle>
            <v-card-title>{{ q2 }}</v-card-title>
            <v-card-subtitle>{{ q12 }}</v-card-subtitle>
            <v-card-title>{{ q3 }}</v-card-title>
            <v-card-subtitle>{{ q13 }}</v-card-subtitle>
            <v-card-title>{{ q4 }}</v-card-title>
            <v-card-subtitle>{{ q14 }}</v-card-subtitle>
            <v-card-title>{{ q5 }}</v-card-title>
            <v-card-subtitle>{{ q15 }}</v-card-subtitle>
            <v-card-actions>
                <v-btn color="black" class="green--text" @click="storeSecurityQuestions()">Submit questioneirs</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-snackbar color="white--text" :timeout="4000" v-model="snackbar" center>
        {{ snackbarText }}
    </v-snackbar>
    <v-snackbar color="red" :timeout="4000" v-model="snackbar2" outlined bottom center>
        {{ snackbarText2 }}
    </v-snackbar>
</v-app>
</template>

<script>
import CryptoJS from "crypto-js";
import firebase from "firebase/compat/app";
import axios from "axios";

const keyValue = "fd85b4945YF'i"; // your key value (eg: key)
const ivKey = "smslt";

export default {
    data() {
        return {
            checkbox: false,
            showHeroCard: true,
            showBurger: true,
            windowSize: {
                x: window.innerHeight,
                y: window.innerWidth,
            },
            items: ['Service Worker', 'Content Creator', 'Dj', 'Personal'],
            UID: null,
            verify_submit: false,
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
            home: require("@/assets/money.png"),
            progress_bar: false,
            progress_bar2: false,
            snackbar: false,
            snackbarText: "No error message",
            snackbar2: false,
            showLogin: false,
            snackbarText2: "",
            login: false,
            register: true,
            user_name: "",
            first_name: "",
            last_name: "",
            phone_no: "",
            phone_no2: "",
            email: "",
            user_uid: null,
            verified: false,
            user_image: "",
            password: "",
            auth: {
                email: "",
                password: "",
            },
            image: null,
            randomNineDigitNumber: null,
            code_state: false,
            phone_no: "",
            code_no: "",
            code_no2: "",
            request_no: null,
            appVerifier: null,
            confirmation_Result: null,
            phone: "",
            county: "",
            progress_bar: false,
            progress_bar2: false,
            loader: null,
            loading: false,
            loading2: false,
            user_state: "",
            progress_bar: false,
            code_state: false,
            code_state_otp: false,
            phone_no: "",
            code_no: "",
            request_no: null,
            appVerifier2: null,
            confirmation_Result: null,
            phone: "",
            county: "",
            progress_bar: false,
            progress_bar2: false,
            timerCount: 30,
            timerEnabled: false,
            user_id: "",
            uid: "",
            username: "",
            display_name: "",
            category: "Creator",
            description: "",
            avatar_url: "",
            goal_amount: "",
        };
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
                } else if (value == 0) {
                    this.code_state = false;
                    this.timerEnabled = false;
                    this.snackbar2 = true;
                    this.snackbarText2 = "Time out";
                }
            },
            immediate: true, // This ensures the watcher is triggered upon creation
        },
    },
    mounted() {
        this.checkUser();
    },
    created() {
        this.generateRandomNumber();
    },
    methods: {
        onResize() {
            this.windowSize = {
                x: window.innerWidth,
                y: window.innerHeight,
            };
            console.log("size", this.windowSize.x);
            if (this.windowSize.x < 950) {
                this.showBurger = true;
                this.showHeroCard = true;
            } else {
                this.showBurger = false;
            }
            return this.windowSize;
        },
        async StoreUSer(val) {
            let that = this;
            axios
                .post(`https://tipp-meserver-production-5b51.up.railway.app/api/user/add_users`, {
                    uid: val,
                    phone: that.phone,
                })
                .then(function (response) {
                    console.log("Place user", response.data);
                    that.StoreProfile(response.data)
                    that.user_id = response.data.id;
                    that.uid = val;
                    if (response.status == 200) {
                        // that.snackbar = true;
                        // that.snackbarText = response.data;
                    } else if (response.status == 400) {
                        // that.snackbar2 = true;
                        // that.snackbarText2 = response.data.message;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    that.snackbarText2 = error.message;
                    that.snackbar2 = true;
                });

        },
        async FetchProfile() {
            let that = this;
            axios
                .get(`https://tipp-meserver-production-5b51.up.railway.app/api/profiles/uid/${that.UID}`, {

                })
                .then(function (response) {
                    console.log("Show profile", response.data);
                    if (response.status == 200) {
                        // that.snackbar = true;
                        // that.snackbarText = response.data;
                    } else if (response.status == 400) {
                        // that.snackbar2 = true;
                        // that.snackbarText2 = response.data.message;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    that.snackbarText2 = error.message;
                    that.snackbar2 = true;
                });

        },
        async StoreProfile(val) {
            let that = this;
            axios
                .post(`https://tipp-meserver-production-5b51.up.railway.app/api/profiles/create_profile`, {
                    user_id: val.id,
                    uid: that.UID,
                    username: that.username,
                    display_name: that.username + "_tp",
                    category: that.category,
                    description: that.description,
                    avatar_url: `https://tip-mee.netlify.app/tipp_wallet/${that.UID}`,
                    goal_amount: that.goal_amount
                })
                .then(function (response) {
                    console.log("Place profile", response.data);
                    alert("Account created successfully")
                    if (response.status == 200) {
                        // that.snackbar = true;
                        // that.snackbarText = response.data;
                    } else if (response.status == 400) {
                        // that.snackbar2 = true;
                        // that.snackbarText2 = response.data.message;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    that.snackbarText2 = error.message;
                    that.snackbar2 = true;
                });

        },
        loginAnonymously1() {
            this.$fire.auth
                .signInAnonymously()
                .catch(function (error) {
                    this.snackbarText = error.message;
                    this.snackbar = true;
                    this.showLogin = false;
                })
                .then((user) => {
                    //we are signed in
                    const start_time = this.$dayjs(new Date()).format("YYYY/MM/DD HH:mm:ss");
                    this.UID = user.user.uid;
                    this.StoreUSer(user.user.uid)
                    this.show_auth = true;
                });
        },
        FetchUserPin() {
            const db = this.$fire.firestore;
            db.collection("Tipp_user")
                .where("user_uid", "==", this.$fire.auth.currentUser.uid)
                .get()
                .then((queryResult) => {
                    queryResult.forEach((doc) => {
                        this.security_key = doc.data().security_key;
                        this.user_name = doc.data().user_name;
                        if (doc.data().pin == null) {
                            this.set_Pin = true;
                            this.login = false;
                            this.register = false;
                            this.auth_state = true;
                            this.security_quiz = false;
                            this.progress_bar = false;
                        } else if (doc.data().security_quiz == false) {
                            this.set_Pin = false;
                            this.login = false;
                            this.register = false;
                            this.auth_state = true;
                            this.security_quiz = true;
                            this.progress_bar = false;
                        } else {
                            this.$router.push({
                                path: "/",
                            });
                        }

                        // console.log(doc.data())
                        console.log(this.decrypteData(doc.data().pin));
                    });
                });
        },
        configureRecaptcha() {
            window.recaptchaVerifier = new this.$fireModule.auth.RecaptchaVerifier(
                "recaptcha-container", {
                    size: "visible",
                    callback: (response) => {
                        console.log(response);
                    },
                }
            );
        },
        // handle otpsend
        sendOtpForVerification() {
            if (this.phone_no == "") {
                this.snackbar2 = true;
                this.snackbarText2 = "Provide phone number";
            } else {
                this.progress_bar = true;
                this.configureRecaptcha();
                const phoneNumber = "+254" + this.phone_no; //user phone number
                this.appVerifier = window.recaptchaVerifier;
                console.log("init SMS", this.appVerifier2, "\n", phoneNumber);
                firebase.auth().languageCode = "en";
                firebase
                    .auth()
                    .signInWithPhoneNumber(phoneNumber, this.appVerifier)
                    .then((confirmationResult) => {
                        // SMS sent. Prompt user to type the code from the message, then sign the
                        // user in with confirmationResult.confirm(code).

                        window.confirmationResult = confirmationResult;
                        this.confirmation_Result = confirmationResult;
                        this.progress_bar = false;
                        this.timerEnabled = true;
                        if (this.confirmation_Result.verificationId != null) {
                            this.code_state_otp = true;
                            this.code_state = false;
                        }
                        console.log("Result", this.confirmation_Result, "OTP sent");
                        this.snackbar = true;
                        this.snackbarText = "OTP was successfully";
                        //this.$toast.success("Otp sent successfully");
                    })
                    .catch((error) => {
                        // Error; SMS not sent
                        this.progress_bar = false;
                        console.log("Error", error);
                        this.snackbar2 = true;
                        this.snackbarText2 = error;
                    });
            }
        },
        ConfirmCode() {
            console.log("Code sent to you.", this.code_no);

            var credential = firebase.auth.PhoneAuthProvider.credential(
                this.confirmation_Result.verificationId,
                this.code_no
            );
            if ((this.code_no = "")) {
                this.snackbar2 = true;
                this.snackbarText2 = "Provide Code sent to you";
                console.log("Provide Code sent to you");
            } else {
                console.log("Verify Code", this.code_no);
                this.progress_bar = true;
                firebase
                    .auth()
                    .signInWithCredential(credential)
                    .then((user) => {
                        // SMS sent. Prompt user to type the code from the message, then sign the
                        // user in with confirmationResult.confirm(code).
                        //this.$toast.success("Otp sent successfully");
                        //this.storeUserDetails();
                        this.StoreUSer(user.user.uid)
                    })
                    .catch((error) => {
                        this.progress_bar = false;
                        // Error; SMS not sent
                        console.log("Error", error);
                        this.snackbar2 = true;
                        this.snackbarText2 = error;
                    });
            }
        },
        storeUserDetails() {
            const db = this.$fire.firestore;
            db.collection("Tipp_user")
                .doc(this.$fire.auth.currentUser.uid)
                .set({
                    user_name: this.user_name,
                    name: this.first_name + "_" + this.last_name,
                    member: false,
                    phone: this.phone_no,
                    pin: null,
                    security_quiz: false,
                    user_uid: this.$fire.auth.currentUser.uid,
                })
                .then((docRef) => {
                    console.log("Registration  success: ");
                    this.snackbar = true;
                    this.progress_bar = false;
                    this.snackbarText = "Registration success";
                    this.FetchUserPin();
                })
                .catch((error) => {
                    this.snackbar2 = true;
                    this.snackbarText2 = error;
                    this.progress_bar = false;
                    console.error("Error adding listing: ", error);
                });
        },
        setPin() {
            if (this.password_status == false) {
                this.snackbar2 = true;
                this.snackbarText2 = "Password does not match";
            } else {
                this.progress_bar = true;
                const db = this.$fire.firestore;

                const docRef = db.collection("Tipp_user").doc(this.$fire.auth.currentUser.uid);
                const docRef2 = db
                    .collection("Tipp_user")
                    .doc(this.$fire.auth.currentUser.uid)
                    .collection("Tipp_wallet")
                    .doc(this.$fire.auth.currentUser.uid);

                const newData = {
                    pin: this.encrypteData(this.verify_pin),
                    Account_id: this.encrypteData(
                        this.$fire.auth.currentUser.uid + this.user_name + this.phone + new Date()
                    ),
                    // Add more fields as needed
                };

                const newData2 = {
                    pin: this.encrypteData(this.verify_pin),
                    Account_id: this.encrypteData(
                        this.$fire.auth.currentUser.uid + this.user_name + this.phone + new Date()
                    ),
                    user_name: this.user_name,
                    user_uid: this.$fire.auth.currentUser.uid,
                    balance: "0",
                    // Add more fields as needed
                };

                db.runTransaction(async (transaction) => {
                        transaction.update(docRef, newData);
                        transaction.set(docRef2, newData2);
                    })
                    .then((docRef) => {
                        console.log("Pin set Successfully ");
                        this.snackbar = true;
                        this.snackbarText = "Pin set Successfully ";
                        this.progress_bar = false;
                        this.FetchUserPin();
                    })
                    .catch((error) => {
                        this.snackbar2 = true;
                        this.snackbarText2 = error;
                        this.progress_bar = false;
                        console.error("Error adding listing: ", error);
                    });
            }
        },
        storeSecurityQuestions() {
            const db = this.$fire.firestore;
            if (
                (this.q11 == null) |
                (this.q12 == null) |
                (this.q13 == null) |
                (this.q14 == null) |
                (this.q15 == null)
            ) {
                this.snackbar2 = true;
                this.snackbarText2 = "Please answer all available questions.";
            } else {
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
                    .then((docRef) => {
                        console.log("Answers submitted");
                        this.snackbar = true;
                        this.progress_bar2 = false;
                        this.snackbarText = "Answers submitted";
                        this.FetchUserPin();
                    })
                    .catch((error) => {
                        this.snackbar2 = true;
                        this.snackbarText2 = error;
                        this.progress_bar2 = false;
                        console.error("Error adding listing: ", error);
                    });
            }
        },

        onSelect({
            name,
            iso2,
            dialCode
        }) {
            console.log(name, iso2, dialCode);
        },
        encrypteData(data) {
            if (this.secretKey == null) {
                this.pass_status = "UnAble detect key";
            } else {
                if (data != null) {
                    const key = CryptoJS.PBKDF2(this.secretKey, "salt", {
                        keySize: 256 / 32,
                        iterations: 1000,
                    });
                    const iv = CryptoJS.enc.Utf8.parse(ivKey); // Convert string to WordArray
                    const encrypted = CryptoJS.AES.encrypt(data, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CBC,
                    });

                    this.encryptedText = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
                    return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
                }
            }
        },
        decrypteData(data) {
            if (this.secretKey == null) {
                this.pass_status = "UnAble detect key";
            } else {
                if (data) {
                    const key = CryptoJS.PBKDF2(this.secretKey, "salt", {
                        keySize: 256 / 32,
                        iterations: 1000,
                    });
                    const iv = CryptoJS.enc.Utf8.parse(ivKey);
                    const decrypted = CryptoJS.AES.decrypt({
                            ciphertext: CryptoJS.enc.Hex.parse(data),
                        },
                        key, {
                            iv: iv,
                            mode: CryptoJS.mode.CBC,
                        }
                    );
                    return decrypted.toString(CryptoJS.enc.Utf8);
                }
            }
        },
        Check(val) {},
        CheckPassword(val, val2) {
            if (val == val2) {
                this.pass_status = "Password matches";
                return true;
            } else {
                this.pass_status = "Password does not match";
                return false;
            }
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
                this.FetchUserPin();
                this.secretKey = this.$fire.auth.currentUser.uid;
            } else {
                this.auth_state = false;
            }
        },
    },
};
</script>

<style scoped>
.box {
    background-color: rgb(255 255 255 / 30%);
    backdrop-filter: blur(5px);
    border-radius: 12px;
}

.parallax {
    background-image: url('~/assets/more.svg');
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
</style>
