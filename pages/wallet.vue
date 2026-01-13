<template>
<div>
    <v-card class="pa-3 mb-3" color="black" dark>
        <v-row class="container">
            <v-col cols="12" sm="1" md="1"></v-col>
            <v-col cols="12" sm="10" md="10">
                <v-row class="">
                    <v-col cols="12" sm="12" md="12">
                        <div class="" style="color: white;">
                            <div class="d-flex">
                                <h4>Welcome back, <br> {{ user_name }}</h4>
                                <v-spacer></v-spacer>
                                <v-btn icon @click="show_qr = !show_qr">
                                    <v-icon>{{ show_qr ? "mdi-qrcode-remove" : "mdi-qrcode-scan" }}</v-icon>
                                </v-btn>
                            </div>
                        </div>
                    </v-col>
                    <v-col cols="12" sm="12" md="12" class="parallax_about2">
                        <v-card color="transparent" dark rounded shaped class="text-center " >
                            <v-row >
                                <v-col cols="12" sm="6" md="6" >

                                    <div class="text-center ">
                                        <v-card-subtitle>Tipp Me Wallet</v-card-subtitle>

                                        <div class="d-flex">
                                            <v-spacer></v-spacer>
                                            <div class="d-flex">
                                                <div class="text-center">
                                                    <h2 style="margin-top: 35px; font-size: 1rem;margin-right: 6px;">Ksh.</h2>
                                                    <h1 style="font-weight: 1200; font-size: 3rem">{{ numeral(balance).format("0,0.00") }}</h1>
                                                    <p style="color: white; "><strong>Total Balance</strong></p>
                                                </div>
                                            </div>
                                            <v-spacer></v-spacer>
                                        </div>
                                    </div>
                                    <div class="text-center">

                                        <div class="d-flex">
                                            <v-spacer></v-spacer>
                                            <div class="d-flex">
                                                <div class="text-center" style="margin: 8px;">
                                                    <p style="color: white; ">{{ numeral(available_balance).format("0,0.00") }} <br><b style="font-size:0.7rem"> Available Balance</b></p>

                                                </div>

                                                <div class="text-center" style="margin: 8px;">
                                                    <p style="color: white; ">{{ numeral(pending_balance).format("0,0.00") }} <br><b style="font-size:0.7rem">Pending Balance</b></p>

                                                </div>
                                                <div class="text-center" style="margin: 8px;">
                                                    <p style="color: white; ">
                                                        <v-icon x-small>mdi-lock-outline</v-icon> {{ numeral(locked_balance).format("0,0.00") }} <br><b style="font-size:0.7rem">Locked Balance</b>
                                                    </p>

                                                </div>
                                            </div>
                                            <v-spacer></v-spacer>
                                        </div>
                                    </div>
                                   <br>
                                    <div>
                                        <div class="text-center">
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <div class="d-flex">
                                                    <div class="d-flex">
                                                        <div style="margin: 8px" class="text-center">

                                                            <v-btn style="margin: 0px" fab small color="#202020" class="green2--text text-center" :to="`/tipp_wallet/${uid}`">
                                                                <v-icon>mdi-arrow-up-circle</v-icon>
                                                            </v-btn>
                                                            <h5>Deposit</h5>
                                                        </div>
                                                        <!-- @click="withdraw_dialog = true  " -->

                                                        <div style="margin: 8px" class="text-center">

                                                            <v-btn style="margin: 0px" fab small color="#202020" class="red--text text-center" @click="CheckGoalProgress()">
                                                                <v-icon>mdi-arrow-down-circle</v-icon>
                                                            </v-btn>
                                                            <h5>Withdraw</h5>
                                                        </div>

                                                        <div style="margin: 8px" class="text-center">

                                                            <v-btn style="margin: 0px" fab small color="#202020" class="purple--text text-center" @click="withdraw_dialog = true">
                                                                <v-icon>mdi-swap-horizontal</v-icon>
                                                            </v-btn>
                                                            <h5>Transfer</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <v-spacer></v-spacer>
                                            </v-card-actions>
                                        </div>
                                    </div>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" >
                                    <div class="">
                                        <v-card elevation="0" color="green" light class="parallax_about">
                                            <v-card-title class="black--text">Goal Progress
                                                <v-spacer />
                                                <v-btn @click="RefreshPage()" icon>
                                                    <v-icon>mdi-refresh</v-icon>
                                                </v-btn>
                                            </v-card-title>
                                            <v-card-text>

                                                <div class="goal-box text-start">

                                                    <div class="d-flex">
                                                        <div>

                                                            <p>My Goal: KES <b>{{goal_amount }}</b></p>
                                                            <small>
                                                                Raised KES <b>{{ goal_raised   }}</b>
                                                            </small>
                                                            <div>

                                                            </div>
                                                        </div>
                                                        <v-spacer></v-spacer>
                                                        <div class="text-center">

                                                            <v-progress-circular :size="100" :width="6" :value="goalPercentage" color="black">
                                                                <p style="font-size: large;"><br>Goal <br> {{ goalPercentage }} %</p>
                                                            </v-progress-circular>
                                                        </div>
                                                    </div>

                                                </div>
                                            </v-card-text>

                                        </v-card>

                                    </div>
                                    <div class="text-start">
                                        <v-alert border="top" colored-border type="info" elevation="0">
                                            <p style="font-size: 0.9rem;">All widthdrawals will be done on Completion of your goal.</p>
                                        </v-alert>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                        <v-row>
                            <v-col cols="12" sm="12" md="12">
                                <div class=" grey--text">
                                    <h4 style="margin: 10px">All transactions</h4>
                                </div>
                                <v-chip-group style="margin: 8px" v-model="selection" active-class="black  white--text" column>
                                    <v-chip @click="FetchTransaction()">All</v-chip>

                                    <v-chip @click="FetchTransactionSearch('Deposit')">Tips <v-icon color="green2">mdi-arrow-up</v-icon>
                                    </v-chip>

                                    <v-chip @click="FetchTransactionSearch('Withdraw')">Withdrawals <v-icon color="red">mdi-arrow-down</v-icon>
                                    </v-chip>

                                </v-chip-group>
                            </v-col>
                            <v-col cols="12" sm="8" md="8">
                                <div class="">
                                    <div class="">
                                        <v-card v-scroll.self="onScroll" class="overflow-x-hidden" max-height="900" color="black" dark elevation="0" outlined>
                                            <div class="row" align="start" id="all_items">
                                                <div v-for="(flight, idx) in all_transactions" :key="idx" class="col-md-9">
                                                    <v-card class="text-start" elevation="0" color="black" dark outlined>
                                                        <v-list-item three-line>
                                                            <v-list-item-content>
                                                                <div :color="checkColor(flight.transaction_type)" class="text-overline mb-4">
                                                                    {{ flight.transaction_type }}
                                                                </div>
                                                                <div class="text-overline mb-2">
                                                                    <div class="d-flex">
                                                                        <div>
                                                                            Bal. {{ flight.balance_after }}
                                                                        </div>
                                                                        <v-spacer></v-spacer>
                                                                        <div>

                                                                            <div>
                                                                                {{ flight.status }}
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                <v-list-item-title class="text-h5 mb-1">
                                                                    <div class="d-flex">
                                                                        <div class="d-flex">
                                                                            Ksh. {{ flight.gross_amount }}
                                                                            <v-icon style="margin-start: 8px" :color="checkColor(flight.transaction_type)">mdi-{{ checkType(flight.transaction_type) }}</v-icon>
                                                                        </div>
                                                                        <v-spacer></v-spacer>
                                                                        <div>
                                                                            <v-btn icon :color="checkColor(flight.direction)">
                                                                                <v-icon>mdi-{{ checkType(flight.direction) }}</v-icon>
                                                                            </v-btn>

                                                                        </div>
                                                                    </div>
                                                                </v-list-item-title>
                                                                <div>
                                                                    <div>
                                                                        <p style="font-size: 0.9rem; color: #C6FF00;"> fee {{ flight.fee_amount }} -> net {{ flight.net_amount }} </p>
                                                                    </div>
                                                                </div>
                                                                <v-list-item-subtitle>
                                                                    <div class="d-flex">
                                                                        <p style="font-size: 0.9rem; color: #808080;"> {{ flight.reference }}</p>
                                                                        <v-spacer></v-spacer>
                                                                        {{
                                                $moment(flight.print_date).format("MMM Do YYYY, h:mm a")
                                            }}
                                                                    </div>
                                                                </v-list-item-subtitle>
                                                                <v-list-item-subtitle :color="checkColor(flight.transaction_type)">{{ flight.transaction_status }}</v-list-item-subtitle>
                                                                <v-list-item-title> </v-list-item-title>
                                                            </v-list-item-content>
                                                        </v-list-item>

                                                        <div style="background-color: black">
                                                            <v-card-actions>
                                                                <div class="d-flex green--text">
                                                                    <v-icon color="green" small>mdi-id-copy</v-icon>
                                                                    {{ flight.refrence }}
                                                                </div>

                                                            </v-card-actions>
                                                        </div>
                                                    </v-card>
                                                </div>
                                            </div>
                                        </v-card>

                                    </div>
                                </div>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>

            </v-col>
            <v-col cols="12" sm="1" md="1"></v-col>
        </v-row>
    </v-card>

    <v-dialog v-model="show_qr" max-width="700">
        <v-card>
            <v-card-actions>

                Show QR code to receive tips
                <v-spacer></v-spacer>

                <v-btn icon @click="show_qr = false">
                    <v-icon color="red">mdi-close</v-icon>
                </v-btn>
            </v-card-actions>

            <div class="d-flex">
                <v-spacer></v-spacer>
                <div v-show="show_qr">
                    <div class="bar--code black--text">
                        <div class="container">
                            <h4>Scan here to send a Tip</h4>
                            <qr-code :to="`/tipp/${account_id}`" style="padding: 10px" id="qrCode12" :text="`https://tip-mee.netlify.app/tipp_wallet/${uid}`" :size="200"></qr-code>
                            <p style="margin: 10px; color: red"></p>
                        </div>
                    </div>
                </div>
                <v-spacer></v-spacer>

            </div>

        </v-card>
    </v-dialog>
    <v-dialog v-model="depo_dialog" max-width="600">
        <v-card>
            <div class="">
                <v-toolbar elevation="0" dark color="black">
                    <v-card-title>Verify your account </v-card-title>
                    <v-spacer />
                    <v-btn icon @click="depo_dialog = false">
                        <v-icon color="red">mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-row>
                    <v-col>
                        <div class="container">
                            <form>
                                <v-row>
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
                            </form>
                        </div>
                    </v-col>
                </v-row>
                <v-card-actions> </v-card-actions>
            </div>
        </v-card>
    </v-dialog>
    <v-dialog v-model="withdraw_dialog" width="300">
        <v-card>
            <div class="">
                <v-toolbar elevation="0" dark color="black">
                    <v-card-title>Withdraw </v-card-title>
                    <v-spacer />
                    <v-btn icon @click="withdraw_dialog = false">
                        <v-icon color="red">mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>

                <div class="text-center">
                    <div class="col-md-12">
                        <v-spacer />
                        <div class="">
                            <v-form>
                                <v-text-field width="200" clearable outlined v-model="balance" disabled type="number" label="Enter amount">
                                </v-text-field>

                                <label for="phoneNumber">Provide you mpesa number</label>
                                <v-text-field v-model="withdraw_phone" :prefix="phonePrefix" filled placeholder="(75..545 format)" dense></v-text-field>

                                <v-btn color="black" class="white--text" @click="b2c()">Withdraw ksh. <strong>-{{ withdraw_phone }}</strong></v-btn>
                            </v-form>
                        </div>
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import {
    uuid
} from "vue-uuid";
import moment from "moment";
import dayjs from "@nuxtjs/dayjs";

import axios from "axios";
import firebase from "firebase/compat/app";
import CryptoJS from "crypto-js";
import Vue from "vue";
import numeral from "numeral";
import VueQRCodeComponent from "vue-qrcode-component";
// Register the Vue component
Vue.component("qr-code", VueQRCodeComponent);

const keyValue = "fd85b4945YF'i"; // your key value (eg: key)
const ivKey = "smslt";

export default {
    name: "IndexPage",
    data() {
        return {
            phonePrefix: "254",
            code_state: false,
            appVerifier: null,
            code_no: null,
            show66: false,
            phone_no_auth: null,
            numeral,
            scrollInvoked: 0,
            UID: this.$fire.auth.currentUser ?
                this.$fire.auth.currentUser.uid : null,
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
            home: require("@/assets/money.png"),
            password: "",
            secretKey: null,
            secret_iv: "smslt",
            encryptionMethod: "AES-256-CBC",
            encryptedText: "",
            user_name: "",
            user_phone: "",
            account_id: "",
            pin: null,
            amount_input: "",
            withdraw_amount_input: "",
            user_input: "",
            count_account: 0,
            send_accountNo: "",
            status: false,
            timerEnabled: false,
            show6: false,
            timerCount: 2,
            search_status: "",
            account_id: "",
            balance: 0,
            available_balance: 0,
            locked_balance: 0,
            pending_balance: 0,
            goal_amount: 0,
            goal_raised: 0,
            user_id: 0,
            encryptedText: "",
            totalBalance: 0,
            withdraw_totalBalance: 0,
            walletType: "Tip wallets",
            all_transactions: [],
        };
    },
    methods: {
        CheckGoalProgress() {
            if (this.goalPercentage === 100) {
                this.withdraw_dialog = true;
            } else {
                alert(`Not able to withdraw \nYour Goal progess is at ${this.goalPercentage} %`)
            }
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
            if (this.phone_no_auth == "") {
                this.snackbar2 = true;
                this.snackbarText2 = "Provide phone number";
            } else {
                this.progress_bar = true;
                this.configureRecaptcha();
                const phoneNumber = "+254" + this.phone_no_auth; //user phone number
                this.appVerifier = window.recaptchaVerifier;
                console.log("init SMS", this.appVerifier, "\n", phoneNumber);
                firebase.auth().languageCode = "en";
                firebase
                    .auth()
                    .signInWithPhoneNumber(phoneNumber, this.appVerifier)
                    .then((confirmationResult) => {
                        // SMS sent. Prompt user to type the code from the message, then sign the
                        // user in with confirmationResult.confirm(code).

                        window.confirmationResult = confirmationResult;
                        this.confirmation_Result = confirmationResult;
                        this.code_state = true;
                        this.progress_bar = false;
                        console.log("Result", this.confirmation_Result, "OTP sent");
                        this.snackbar = true;
                        this.snackbarText = "OTP was successfully";
                        // this.$toast.success("Otp sent successfully");
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
                        // this.storeUserDetails();
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
        onSelect({
            name,
            iso2,
            dialCode
        }) {
            console.log(name, iso2, dialCode);
        },
        RefreshPage() {
            // window.location.reload();
            this.checkUser();
            this.FetchProfile();
            this.FetchWallet();
        },
        onScroll() {
            this.scrollInvoked++
        },
        async stkPush() {
            let that = this;
            axios
                .post(`https://tipp-meserver-production-5b51.up.railway.app/api/payments/stk-push`, {
                    uid: that.UID,
                    profile_id: that.user_id,
                    phone: that.phone_no2,
                    amount: that.amount_input
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
        async b2c() {
            let that = this;
            let phone = that.phonePrefix + that.withdraw_phone;
            if (phone.length != 12) {
                that.snackbarTextError = "Phone number should be 12 digits including country code";
                that.snackbarError = true;
                return;
            }

            axios
                .post(`https://tipp-meserver-production-5b51.up.railway.app/api/b2c/withdraw`, {
                    uid: that.UID,
                    user_id: that.user_id,
                    phone: phone,
                    amount: that.balance
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
        async FetchProfile() {
            let that = this;
            axios
                .get(`https://tipp-meserver-production-5b51.up.railway.app/api/profiles/uid/${that.UID}`, {

                })
                .then(function (response) {
                    console.log("Show profile", response.data);
                    that.user_name = response.data.username;
                    that.user_id = response.data.id;
                    that.goal_amount = response.data.goal_amount;
                    that.goal_raised = response.data.goal_raised;
                    that.FetchTransaction();
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
                .get(`https://tipp-meserver-production-5b51.up.railway.app/api/wallets/get-wallet/${that.UID}`, {

                })
                .then(function (response) {
                    console.log("Show wallet", response.data);
                    // that.user_name = response.data.username;
                    that.balance = response.data.total_balance;
                    that.available_balance = response.data.available_balance;
                    that.pending_balance = response.data.pending_balance;
                    that.locked_balance = response.data.locked_balance;
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
        checkColor(val) {
            if (val == "CREDIT") {
                return "green2";
            } else if (val == "DEBIT") {
                return "red";
            } else if (val == "Tips") {
                return "blue";
            }
        },
        checkType(val) {
            if (val == "CREDIT") {
                return "arrow-up";
            } else if (val == "DEBIT") {
                return "arrow-down";
            } else if (val == "Tips") {
                return "hand-coin";
            }
        },
        FetchTransaction() {
            let that = this;
            axios
                .get(`https://tipp-meserver-production-5b51.up.railway.app/api/wallets/get-ledger/${that.user_id}`, {

                })
                .then(function (response) {
                    console.log("transactions", response.data);
                    if (response.status == 200) {
                        that.all_transactions = response.data;
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
        FetchTransactionSearch(val) {
            let start = new Date("2020-01-01");
            const db = this.$fire.firestore;

            this.all_transactions.splice(this.all_transactions);
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
                        console.log("Orders", this.all_transactions);
                    });
                });
        },
        verifyPin(val) {
            if (val === this.decrypteData(this.pin)) {
                this.Deposit(this.amount_input);
                console.log("PIn match");
                this.pin_status = "";
            } else {
                console.log("PIn not match");
                this.pin_status = "Invalid pin. \nProvide a valid pin number";
            }
        },
        verifyPin2(val) {
            if (val === this.decrypteData(this.pin)) {
                this.Withdraw(this.withdraw_amount_input);
                console.log("PIn match");
                this.pin_status2 = "";
            } else {
                console.log("PIn not match");
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
                this.FetchTransaction();
            } else {
                this.auth_state = false;
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
                transaction_status: "Deposit Successful",
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

                    const start_time = this.$dayjs(new Date()).format("YYYY/MM/DD HH:mm:ss");
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
                        transaction_status: "Withdraw Successful",
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
                    console.log(this.totalBalance);
                })
                .then((docRef) => {
                    console.log("Pin set Successfully ");
                    this.snackbar = true;
                    this.depo_dialog = false;
                    this.snackbarText = "Pin set Successfully ";
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

                    const start_time = this.$dayjs(new Date()).format("YYYY/MM/DD HH:mm:ss");
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
                    console.log(this.withdraw_totalBalance);
                })
                .then((docRef) => {
                    console.log("Pin set Successfully ");
                    this.snackbar = true;
                    this.withdraw_dialog = false;
                    this.snackbarText = "Pin set Successfully ";
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
                    Account_id: this.encrypteData(
                        this.$fire.auth.currentUser.uid + this.user_name + this.phone + new Date()
                    ),
                    // Add more fields as needed
                };

                const newData2 = {
                    balance: this.encrypteData(Number("0")),
                    previous_balance: this.encrypteData(Number("0")),
                    // Add more fields as needed
                };

                db.runTransaction(async (transaction) => {
                        transaction.update(docRef, newData);
                        transaction.update(docRef2, newData2);
                    })
                    .then((docRef) => {
                        console.log("Pin set Successfully ");
                        this.snackbar = true;
                        this.snackbarText = "Account set set Successfully ";
                    })
                    .catch((error) => {
                        this.snackbar2 = true;
                        this.snackbarText2 = error;
                        console.error("Error adding listing: ", error);
                    });
            }
        },
    },
    created() {
        //this.setPin();
    },
    computed: {
        goalPercentage() {
            if (!this.goal_amount) return 0
            const percent =
                (this.goal_raised / this.goal_amount) * 100

            return Math.min(percent.toFixed(1), 100)
        }
    },
    mounted() {
         this.user_id = 0;
        this.checkUser();
        this.FetchProfile();
        this.FetchWallet();
    },
};
</script>

<style scoped>
/* *{
        color:#202020;
    } */

.parallax_about {
    /* Background image */
    background-image: url('~/assets/hh.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

.parallax_about2 {
    /* Background image */
    background-image: url('~/assets/g.png');
    background-position: center;
    background-repeat: no-repeat;
}
</style>
