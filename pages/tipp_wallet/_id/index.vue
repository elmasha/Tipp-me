<template>
<div>
    <div class="container">
        <form v-show="false">
            <v-row>
                <v-col cols="12" md="12" sm="12">
                    <div class="container text-center">
                        <div class="">
                            <v-toolbar elevation="0" dark color="black">
                                <v-card-title>Deposit </v-card-title>
                                <v-spacer />
                                <v-btn icon @click="depo_dialog = false">
                                    <v-icon color="red">mdi-close</v-icon>
                                </v-btn>
                            </v-toolbar>

                            <div class="text-center">
                                <div class="col-md-12">
                                    <v-spacer />
                                    <div class="">
                                        <v-form>
                                            <v-text-field width="200" clearable outlined v-model="amount_input" :counter="16" type="number" label="Enter amount">
                                            </v-text-field>
                                            <v-text-field width="200" clearable outlined v-model="pin_input" :counter="16" type="password" label="Enter pin">
                                            </v-text-field>
                                            <div style="margin: 10px; color: red">{{ pin_status }}</div>

                                            <v-btn color="black" class="white--text" @click="verifyPin(pin_input)">Deposit ksh.{{ amount_input }}</v-btn>
                                        </v-form>
                                    </div>
                                </div>
                            </div>
                            <v-card-actions> </v-card-actions>
                        </div>
                        <br />
                        <br />
                        <div class="container">
                            <v-spacer />
                            <div class="d-flex">
                                <v-text-field width="200" clearable flat @change="SearchAccount(user_input)" v-model="user_input" :counter="16" type="text" label="Provide phone number">
                                </v-text-field>
                                <v-btn style="margin: 12px" fab x-small color="black" class="white--text" @click="SearchAccount(user_input)">
                                    <v-icon>mdi-magnify</v-icon>
                                </v-btn>
                                <!-- @change="SearchAccount(user_input)" -->
                            </div>
                        </div>
                    </div>
                </v-col>
                <v-col v-show="false" cols="12" md="12" sm="12">
                    <div class="container text-center">
                        <br />
                        <div class="container">
                            <v-spacer />
                            <div class="d-flex text-center">
                                <v-text-field width="200" clearable outlined v-model="amount_input" :counter="16" type="number" label="Enter amount">
                                </v-text-field>
                            </div>
                        </div>

                        <v-btn color="accent" class="primary--text" @click="Deposit(amount_input)">Send {{ amount_input }}</v-btn>
                    </div>
                </v-col>

                <v-col v-show="!enter_amount" cols="12" md="12" sm="12">
                    <div class="text-center">
                        <div class="container">{{ search_status }}</div>
                    </div>
                </v-col>
            </v-row>
        </form>

        <v-card dark color="black">
            <v-container>
                <!-- <v-chip-group mandatory active-class="primary--text">
                    <v-chip v-for="tag in tags" :key="tag">
                        <span @click="(min = tag.value), (max = tag.last_value), check_ticks(min)">
                            {{ tag.value }}
                        </span>
                    </v-chip>
                </v-chip-group> -->

                <v-row v-resize="onResize">
                    <v-col cols="12" lg="6" md="6">

                        <div class="container">

                            <div class="d-flex">
                                <v-spacer />
                                <div>
                                    <v-progress-circular style="margin:20px;" color="green" width="6" :size="120" :value="goalPercentage">
                                        Tip {{ amount_input }}
                                    </v-progress-circular>

                                </div>
                                <v-spacer />
                            </div>

                            <div class="container">
                                <div class="d-flex">
                                    <v-spacer></v-spacer>

                                    <div class="row">
                                        <button type="button" class="button row" v-for="a in [50,100,200,500,1000,2000,3000,4000,5000]" @click="amount_input=a">

                                            <span class="fold"></span>

                                            <div class="points_wrapper">
                                                <i class="point"></i>
                                                <i class="point"></i>
                                                <i class="point"></i>
                                                <i class="point"></i>
                                                <i class="point"></i>
                                                <i class="point"></i>
                                                <i class="point"></i>
                                                <i class="point"></i>
                                                <i class="point"></i>
                                                <i class="point"></i>
                                            </div>

                                            <span class="inner"><svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5">
                                                    <polyline points="13.18 1.37 13.18 9.64 21.45 9.64 10.82 22.63 10.82 14.36 2.55 14.36 13.18 1.37"></polyline>
                                                </svg> KES {{ a }}</span>
                                        </button>
                                    </div>

                                    <v-spacer></v-spacer>
                                    <!-- <button style="margin: 2px; background-color: aliceblue; color: #000;padding: 10px; font-size: 1.2rem;border-radius: 9px;" v-for="a in [50,100,200,500]" @click="amount_input=a">
                                        KES {{ a }}
                                    </button> -->

                                </div>
                            </div>
                            {{ text }}
                            <div class="d-flex">
                                <v-spacer />
                                <v-card color="black" light min-width="300" dark>
                                    <v-card-text>

                                        <label for="voteCount">Enter amount to tip <b style="color: #C6FF00;">{{user_name}}</b></label>
                                        <v-text-field outlined rounded style="color: white; font-size: 1.5rem;" diable v-model="amount_input" filled placeholder="Enter amount" type="number" dense></v-text-field>

                                        <label for="phoneNumber">Provide you mpesa number</label>
                                        <v-text-field outlined rounded large style="color: white; font-size: 1.5rem;" v-model="mpesa_no" :prefix="phonePrefix" filled placeholder="(75..545 format)" dense></v-text-field>
                                        <span></span>
                                        <br>
                                        <div class="d-flex">
                                            <p style="font-size: 1.1rem;">Tip amount. <b>{{ numeral(amount_input).format("0,0") }} ksh</b>
                                            </p>
                                        </div>

                                        <v-progress-linear v-show="progress_bar" indeterminate color="black"></v-progress-linear>
                                        <!-- Message -->
                                        <v-alert v-if="message" class="mt-4" type="success" dense outlined>
                                            {{ message }}
                                        </v-alert>
                                    </v-card-text>

                                    <div class="container">

                                        <div class="d-flex" @click="stkPush">
                                            <v-spacer />

                                            <div class="text-center">
                                                <h4>Tip me</h4>
                                                <v-btn color="white" fab dark medium @click="stkPush">
                                                    <v-icon color="black">mdi-cash-fast</v-icon>
                                                </v-btn>
                                            </div>
                                            <v-spacer />
                                        </div>

                                        <div class="d-flex" style="padding: 0.8rem;border-radius: 1rem;background-color: antiquewhite;color: black; margin-top: 20px;">
                                            <p style="font-size: 0.9rem;"> An STK push will prompted on the <b>{{ phonePrefix+mpesa_no }}</b> check for an mpesa prompting you to pay <b>{{ numeral(amount_input).format("0,0") }}</b> ksh</p>
                                        </div>

                                    </div>
                                </v-card>
                                <v-spacer />
                            </div>

                        </div>

                    </v-col>
                    <v-col v-show="!imageState" cols="12" lg="6" md="6">
                        <div style="margin-top:50px;" class="container">
                            <v-img :src="home2" contain height="400"></v-img>
                        </div>
                    </v-col>

                </v-row>

            </v-container>
        </v-card>
    </div>
    <v-dialog v-model="pin_dialog">
        <v-card>
            <div class="container">
                <v-card-subtitle>Enter pin</v-card-subtitle>
                <div class="text-center">
                    <div class="col-md-7">
                        <v-spacer />
                        <div class="d-flex text-center">
                            <v-form>
                                <v-text-field width="200" clearable outlined v-model="pin_input" :counter="16" type="password" label="Enter pin">
                                </v-text-field>
                                <v-btn color="accent" class="primary--text">Verify pin</v-btn>
                            </v-form>
                        </div>
                    </div>
                </div>
                <v-card-actions> </v-card-actions>
            </div>
        </v-card>
    </v-dialog>
    <v-dialog v-model="verifyPin_dialog">
        <v-card color="black" dark>
            <div class="container">
                <v-card-subtitle>Enter pin</v-card-subtitle>
                <div class="container">

                    <v-progress-circular style="margin:10px;" color="green" width="6" :size="120" :indeterminate="verifyProgress">
                        <h5>Verifying pin</h5>
                    </v-progress-circular>
                </div>
                <div class="text-center">
                    <div class="col-md-7">
                        <v-spacer />
                        <div class="d-flex text-center">
                            <v-form>

                                <v-btn color="green" class="black--text" @click="verifyAccount">Verify Account</v-btn>
                            </v-form>
                        </div>
                    </div>
                </div>
                <v-card-actions> </v-card-actions>
            </div>
        </v-card>
    </v-dialog>
    <v-snackbar color="primary accent-8" :timeout="6000" v-model="snackbar_s" centered bottom>
        {{ snackbarText_s }}
    </v-snackbar>
    <v-snackbar color="success" :timeout="2000" v-model="snackbar" outlined center>
        {{ snackbarText }}
    </v-snackbar>
    <v-snackbar color="error" :timeout="4000" v-model="snackbarError" outlined center>
        {{ snackbarTextError }}
    </v-snackbar>
</div>
</template>

<script>
import CryptoJS from "crypto-js";
import {
    uuid
} from "vue-uuid";
import moment from "moment";
import dayjs from "@nuxtjs/dayjs";
import axios from "axios";
import numeral from "numeral";

const keyValue = "fd85b4945YF'i"; // your key value (eg: key)
const ivKey = "smslt";
export default {
    data() {
        return {
            CheckoutRequestID: null,
            timerEnabled: false,
            show6: false,
            timerCount: 25,
            numeral,
            phonePrefix: "254",
            user_name: "",
            user_id: 0,
            goal_amount: 0,
            goal_raised: 0,
            UID: this.$route.params.id,
            verifyMSG: "",
            verifyProgress: false,
            imageState: false,
            windowSize: {
                x: 0,
                y: 0,
            },
            mpesa_no: "",
            steps: 1,
            tickSize: "2",
            min: 1,
            max: 300000,
            tags: [{
                    active: true,
                    value: 1,
                    last_value: 10,
                    title: "Jason Oner",
                },
                {
                    active: true,
                    value: 10,
                    last_value: 100,
                    title: "Mike Carlson",
                },
                {
                    value: 100,
                    last_value: 1000,
                    title: "Cindy Baker",
                },
                {
                    value: 1000,
                    last_value: 10000,
                    title: "Ali Connors",
                },
                {
                    value: 10000,
                    last_value: 100000,
                    title: "Ali Connors",
                },
            ],
            text: "",
            home: require("@/assets/mpesa.png"),
            home2: require("@/assets/deposit.svg"),
            duration: 0,
            pin_input: "",
            pin_dialog: false,
            enter_amount: true,
            amount_input: "",
            user_input: "",
            count_account: 0,
            send_accountNo: "",
            status: false,
            timerEnabled2: false,
            show6: false,
            timerCount2: 10,
            timerEnabled: false,
            show6: false,
            timerCount: 2,
            search_status: "",
            account_id: "",
            balance: 0,
            encryptedText: "",
            user_name: "",
            user_phone: "",
            totalBalance: 0,
            walletType: "Tip wallets",
            auth_state: false,
            user_name: "",
            user_phone: "",
            account_id: "",
            pin: null,
            phone: "",
            security_key: null,
            verifyPin_dialog: false,
            message: null,
            snackbar_s: false,
            snackbarText_s: "",
            snackbar: false,
            snackbarError: false,
            snackbarText: "",
            snackbarTextError: "",
        };
    },
    computed: {
        goalPercentage() {
            if (!this.amount_input) return 0
            const percent =
                (this.amount_input / this.goal_amount) * 100

            return Math.min(percent.toFixed(1), 100)
        }
    },
    mounted() {
        this.user_id = 0;
        this.checkUser();
        console.log("UID ", this.$route.params.id);
        if (this.$route.params.id != null) {
            this.FetchProfile();
            this.FetchWallet();
        }
    },
    created() {
        this.checkUser();
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
                    this.StkQuery();
                    this.timerCount = 25;
                }
            },
            immediate: true, // This ensures the watcher is triggered upon creation
        },

    },
    methods: {
        StkQuery() {
            let that = this;
            that.snackbar_s = true;
            that.snackbarText_s = "Checking payment status...";
            that.message = null;
            axios
                .post("https://tipp-meserver-production-5316.up.railway.app/api/payments/stk-push/query", {
                    checkoutRequestId: that.CheckoutRequestID,
                })
                .then(function (response) {
                    console.log("StkPush Query", response.data);

                    if (response.status == 200) {
                        that.progress_bar = false;
                        // that.snackbar = true;
                        // that.snackbarText = response.data.ResultDesc;
                        that.timerCount = 25;
                        that.timerEnabled = false;

                        if (response.data.ResultCode == "2001") {
                            that.messageError = "You provide a wrong pin";
                            that.snackbarError = true;
                            that.snackbarError = "You provide a wrong pin";
                        } else if (response.data.ResultCode == "1032") {
                            that.messageError = "You Cancled this transaction";
                            that.snackbarError = true;
                            that.snackbarError = "You provide a wrong pin";
                        } else if (response.data.ResultCode == "1") {
                            that.messageError = "The balance is insufficient for the transaction."
                            that.snackbarError = true;
                            that.snackbarError = "You provide a wrong pin";
                        }

                    }
                })
                .catch(function (error) {
                    that.snackbarError = true;
                    that.snackbarTextError = error;
                    that.timerCount = 25;
                    that.timerEnabled = false;
                    that.progress_bar = false;
                });
        },
        async stkPush() {

            let that = this;
            let phone = that.phonePrefix + that.mpesa_no;
            if (phone.length != 12) {
                that.snackbarTextError = "Phone number should be 12 digits including country code";
                that.snackbarError = true;
                return;
            }

            axios
                .post(`https://tipp-meserver-production-5316.up.railway.app/api/payments/stk-push`, {
                    uid: that.UID,
                    profile_id: that.user_id,
                    phone: phone,
                    amount: that.amount_input
                })
                .then(function (response) {
                    console.log("Show profile", response.data);
                    that.CheckoutRequestID = response.data.CheckoutRequestID;
                    that.message = "📲 Payment initiated. Enter Mpesa PIN to confirm.";
                    if (response.status == 200) {
                        that.snackbar = true;
                        that.snackbarText = that.message;
                        // that.timerEnabled = true;
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
                .get(`https://tipp-meserver-production-5316.up.railway.app/api/profiles/uid/${that.UID}`, {

                })
                .then(function (response) {
                    console.log("Show profile", response.data);
                    that.user_name = response.data.username;
                    that.user_id = response.data.user_id;
                    that.goal_amount = response.data.goal_amount;
                    that.goal_raised = response.data.goal_raised;
                    // that.FetchTransaction();
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
        async FetchWallet() {
            let that = this;
            axios
                .get(`https://tipp-meserver-production-5316.up.railway.app/api/wallets/get-wallet/${that.UID}`, {

                })
                .then(function (response) {
                    console.log("Show wallet", response.data);
                    // that.user_name = response.data.username;
                    that.balance = response.data.total_balance;
                    // that.user_id = response.data.id;
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
        verifyAccount() {
            this.verifyProgress = true;
            this.timerEnabled2 = true;
            if (this.$route.params.id === this.$fire.auth.currentUser) {
                this.verifyMSG = "Verification successful"
            } else {
                this.verifyMSG = "Verification failed";
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
                        console.log("Pin ", this.decrypteData(this.pin), "key ", this.security_key);
                    });
                });
        },
        FetchWallet() {
            const db = this.$fire.firestore;
            db.collection("Tipp_user")
                .doc(this.$fire.auth.currentUser.uid)
                .collection("Tipp_wallet")
                .where("user_uid", "==", this.$fire.auth.currentUser.uid)
                .get()
                .then((queryResult) => {
                    queryResult.forEach((doc) => {
                        this.balance = doc.data().balance;
                        this.account_id = doc.data().Account_id;
                        this.balance = doc.data().balance;
                        this.user_name = doc.data().user_name;
                        this.user_phone = doc.data().user_phone;
                        console.log(this.user_name, "", this.balance);
                    });
                });
        },
        encrypteData(data) {
            if (this.$fire.auth.currentUser.uid == null) {} else {
                if (data != null) {
                    const key = CryptoJS.PBKDF2(this.$fire.auth.currentUser.uid, "salt", {
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
            if (this.$fire.auth.currentUser.uid == null) {} else {
                if (data) {
                    const key = CryptoJS.PBKDF2(this.$fire.auth.currentUser.uid, "salt", {
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
        Check(val) {
            return val;
        },
        checkUser() {
            if (this.$fire.auth.currentUser != null) {
                this.secretKey = this.$fire.auth.currentUser.uid;
                this.uid = this.$fire.auth.currentUser.uid;
                this.FetchUser();
                this.FetchWallet();
            } else {
                this.auth_state = false;
            }
        },
        onResize() {
            this.windowSize = {
                x: window.innerWidth,
                y: window.innerHeight
            }
            console.log("size", this.windowSize.x);
            if (this.windowSize.x < 700) {
                this.imageState = true;
            } else {
                this.imageState = false;
            }
            return this.windowSize;
        },
        checkAmount(val) {
            if (val >= 1000) {
                const tol = val / 1000;

                return tol;
            } else if (val >= 10000) {
                const tol = val / 2;

                return tol;
            } else if (val >= 100000) {
                const tol = val / 2;

                return tol;
            } else {

                return val;
            }
        },
        check_ticks(val1) {
            if (val1 > 100) {
                this.steps = 10;
                // this.tickSize = "1000";
            } else if (val1 > 1000) {
                this.steps = 100;
                // this.tickSize = "1000";
            } else if (val1 > 10000) {
                this.steps = 10000;
                // this.tickSize = "1000";
            } else if (val1 > 100000) {
                this.steps = 10000;
                // this.tickSize = "1000";
            }
        },
        // FetchUser() {
        //     const db = this.$fire.firestore;
        //     db.collection("Tipp_user")
        //         .doc(this.$fire.auth.currentUser.uid)
        //         .collection("Tipp_wallet")
        //         .where("user_uid", "==", this.$fire.auth.currentUser.uid)
        //         .get()
        //         .then((queryResult) => {
        //             queryResult.forEach((doc) => {
        //                 this.account_id = doc.data().Account_id;
        //                 this.balance = doc.data().balance;
        //                 this.user_name = doc.data().user_name;
        //                 this.user_phone = doc.data().user_phone;
        //                 console.log(this.user_name, "", this.balance);
        //             });
        //         });
        // },
        SearchAccount(val) {
            const db = this.$fire.firestore;
            this.send_accountNo = "";
            this.search_status = "";
            this.enter_amount = false;
            this.timerEnabled = true;
            db.collection("Tipp_user")
                .where("user_name", "==", val)
                .get()
                .then((queryResult) => {
                    queryResult.forEach((doc) => {
                        this.count_account = queryResult.size;
                        this.send_accountNo = doc.data().Account_id;
                        this.enter_amount = true;
                        console.log(this.count_account, "Data", doc.data().Account_id);
                    });
                });
        },
        checkId() {
            this.decrypteData(this.$route.params.id);
            console.log(this.decrypteData(this.$route.params.id));
        },
        encrypteData(data) {
            if (this.$fire.auth.currentUser.uid == null) {} else {
                if (data != null) {
                    const key = CryptoJS.PBKDF2(this.$fire.auth.currentUser.uid, "salt", {
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
        textChange(val) {
            if (val == "") {
                return true;
            } else {
                return false;
            }
        },
        decrypteData(data) {
            if (this.$fire.auth.currentUser.uid == null) {} else {
                if (data) {
                    const key = CryptoJS.PBKDF2(this.$fire.auth.currentUser.uid, "salt", {
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
        checkValue(val) {
            this.search_status = " Fetching accounts...";
            this.timerEnabled = false;
            this.timerCount = 2;
            console.log("Account count", val);
            if (val == 0) {
                if (this.user_input == "") {
                    this.search_status = "";
                    this.send_accountNo = "";
                    this.enter_amount = false;
                    this.count_account = 0;
                } else if (this.user_input != "") {
                    this.search_status = "No user available";
                    this.send_accountNo = "";
                    this.enter_amount = false;
                    this.count_account = 0;
                }
            } else if (val > 0) {
                if (this.user_input == "") {
                    this.search_status = "";
                    this.send_accountNo = "";
                    this.count_account = 0;
                } else {
                    this.search_status = "";
                    this.send_accountNo = "";
                    this.count_account = 0;
                }
            }
        },
        updateUser(val) {
            if (val == 0) {
                this.search_status = "No user available";
                this.send_accountNo = "";
                this.count_account = 0;
                this.enter_amount = false;
            } else {
                this.search_status = "";
                this.send_accountNo = "";
                this.count_account = 0;
                this.enter_amount = true;
            }
        },
        Deposit(val) {
            const db = this.$fire.firestore;

            let ID = uuid.v1();

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

            const transactionDetails = {
                user_name: this.user_name,
                amount: val,
                payment_method: "Mpesa",
                transaction_id: ID,
                previous_balance: this.balance,
                current_balance: this.totalBalance,
                account_id: this.account_id,
                transaction_status: "Successful transaction",
                date: new Date(),
                // Add more fields as needed
            };

            db.runTransaction(async (transaction) => {
                    transaction.get(docRef2).then((sfDoc) => {
                        // Add one person to the city population.
                        // Note: this could be done without a transaction
                        //       by updating the population using FieldValue.increment()
                        var totalBalance = sfDoc.data().balance;
                        // transaction.update(sfDocRef, {
                        //     balance: this.encrypteData(totalBalance)
                        // });
                    });
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
                    });
                    console.log(this.totalBalance);
                })
                .then((docRef) => {
                    console.log("Pin set Successfully ");
                    this.snackbar = true;
                    this.snackbarText = "Pin set Successfully ";
                })
                .catch((error) => {
                    this.snackbar2 = true;
                    this.snackbarText2 = error;
                    this.progress_bar = false;
                    console.error("Error adding listing: ", error);
                });
        },
        // checkUser() {
        //     if (this.$fire.auth.currentUser != null) {
        //         this.FetchUser();
        //     } else {
        //         this.auth_state = false;
        //     }
        // },
    },
};
</script>

<style scoped>
/* From Uiverse.io by ilkhoeri */
.button {
    --h-button: 48px;
    --w-button: 102px;
    --round: 0.75rem;
    cursor: pointer;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: all 0.25s ease;
    background: radial-gradient(65.28% 65.28% at 50% 100%,
            rgba(223, 113, 255, 0.8) 0%,
            rgba(223, 113, 255, 0) 100%),
        linear-gradient(0deg, #7a5af8, #7a5af8);
    border-radius: var(--round);
    border: none;
    font-size: 1.5rem;
    outline: none;
    padding: 12px 18px;
    margin: 6px;
}

.button::before,
.button::after {
    content: "";
    position: absolute;
    inset: var(--space);
    transition: all 0.5s ease-in-out;
    border-radius: calc(var(--round) - var(--space));
    z-index: 0;
}

.button::before {
    --space: 1px;
    background: linear-gradient(177.95deg,
            rgba(255, 255, 255, 0.19) 0%,
            rgba(255, 255, 255, 0) 100%);
}

.button::after {
    --space: 2px;
    background: radial-gradient(65.28% 65.28% at 50% 100%,
            rgba(223, 113, 255, 0.8) 0%,
            rgba(223, 113, 255, 0) 100%),
        linear-gradient(0deg, #7a5af8, #7a5af8);
}

.button:active {
    transform: scale(0.95);
}

.fold {
    z-index: 1;
    position: absolute;
    top: 0;
    right: 0;
    height: 1rem;
    width: 1rem;
    display: inline-block;
    transition: all 0.5s ease-in-out;
    background: radial-gradient(100% 75% at 55%,
            rgba(223, 113, 255, 0.8) 0%,
            rgba(223, 113, 255, 0) 100%);
    box-shadow: 0 0 3px black;
    border-bottom-left-radius: 0.5rem;
    border-top-right-radius: var(--round);
}

.fold::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 150%;
    height: 150%;
    transform: rotate(45deg) translateX(0%) translateY(-18px);
    background-color: #e8e8e8;
    pointer-events: none;
}

.button:hover .fold {
    margin-top: -1rem;
    margin-right: -1rem;
}

.points_wrapper {
    overflow: hidden;
    width: 100%;
    height: 100%;
    pointer-events: none;
    position: absolute;
    z-index: 1;
}

.points_wrapper .point {
    bottom: -10px;
    position: absolute;
    animation: floating-points infinite ease-in-out;
    pointer-events: none;
    width: 2px;
    height: 2px;
    background-color: #fff;
    border-radius: 9999px;
}

@keyframes floating-points {
    0% {
        transform: translateY(0);
    }

    85% {
        opacity: 0;
    }

    100% {
        transform: translateY(-55px);
        opacity: 0;
    }
}

.points_wrapper .point:nth-child(1) {
    left: 10%;
    opacity: 1;
    animation-duration: 2.35s;
    animation-delay: 0.2s;
}

.points_wrapper .point:nth-child(2) {
    left: 30%;
    opacity: 0.7;
    animation-duration: 2.5s;
    animation-delay: 0.5s;
}

.points_wrapper .point:nth-child(3) {
    left: 25%;
    opacity: 0.8;
    animation-duration: 2.2s;
    animation-delay: 0.1s;
}

.points_wrapper .point:nth-child(4) {
    left: 44%;
    opacity: 0.6;
    animation-duration: 2.05s;
}

.points_wrapper .point:nth-child(5) {
    left: 50%;
    opacity: 1;
    animation-duration: 1.9s;
}

.points_wrapper .point:nth-child(6) {
    left: 75%;
    opacity: 0.5;
    animation-duration: 1.5s;
    animation-delay: 1.5s;
}

.points_wrapper .point:nth-child(7) {
    left: 88%;
    opacity: 0.9;
    animation-duration: 2.2s;
    animation-delay: 0.2s;
}

.points_wrapper .point:nth-child(8) {
    left: 58%;
    opacity: 0.8;
    animation-duration: 2.25s;
    animation-delay: 0.2s;
}

.points_wrapper .point:nth-child(9) {
    left: 98%;
    opacity: 0.6;
    animation-duration: 2.6s;
    animation-delay: 0.1s;
}

.points_wrapper .point:nth-child(10) {
    left: 65%;
    opacity: 1;
    animation-duration: 2.5s;
    animation-delay: 0.2s;
}

.inner {
    z-index: 2;
    gap: 6px;
    position: relative;
    width: 100%;
    color: white;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.5;
    transition: color 0.2s ease-in-out;
}

.inner svg.icon {
    width: 18px;
    height: 18px;
    transition: fill 0.1s linear;
}

.button:focus svg.icon {
    fill: white;
}

.button:hover svg.icon {
    fill: transparent;
    animation:
        dasharray 1s linear forwards,
        filled 0.1s linear forwards 0.95s;
}

@keyframes dasharray {
    from {
        stroke-dasharray: 0 0 0 0;
    }

    to {
        stroke-dasharray: 68 68 0 0;
    }
}

@keyframes filled {
    to {
        fill: white;
    }
}
</style>
