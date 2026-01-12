<!-- Please remove this file from your project -->
<template>
<div>
    <v-img with="100%" :src="bg" style="margin-top: 0px;">

        <div style="padding: 40px; color: aliceblue; display: flex; align-items: center;">
            <v-row>

                <v-col cols="12" md="12" class="fade-in-right">
                    <div class=" container ">

                        <v-card color="transparent" v-show="!showBurger" height="90" elevation="0">

                        </v-card>

                        <div class="">

                            <h1 class="" style="font-size: 1.9rem; font-weight: 900;">TipMe

                                <br>
                                Tipping made easy.</h1>
                            <p class=" mb-4" style="font-size: 1.2rem;">

                                Support creators, service staff, and causes instantly with M-Pesa.<br>

                                <br>
                                <b>Simple, local, and built for Kenya 🇰🇪</b> <br>
                                TipMe is a digital tipping and micro-fundraising platform <br> That lets anyone receive support through M-Pesa using a QR code or link.<br>
                                <br>
                                No app. No hassle. Just scan, tip, and smile.
                            </p>
                            <v-btn rounded style="color: black;" color="green" large >Get started <v-icon right dark>
                                    mdi-arrow-right-circle
                                </v-icon>
                            </v-btn>
                        </div>

                    </div>
                </v-col>

                <v-col cols="12" md="12">

                    <div class="features">
                        <h2>How its works</h2>
                        <p style="font-size: 1.1rem;">Tipping in 4 simple steps</p>

                        <div class="container text-center">
                            <div class="row">
                                <div class="feature box ">
                                    <div class="icon-bg">
                                        <v-img :src="qr" alt="delivery icon" style="margin-left: 10px; margin-top: 10px;" />
                                    </div>

                                    <h3></h3>
                                    <br>
                                    <br>
                                    <br>
                                    <br>
                                    <h4>Scan a QR code or open a link</h4>
                                </div>

                                <div class="feature box">
                                    <div class="icon-bg">
                                        <v-img :src="qr_share" alt="pharmacy support icon" style="margin-left: 10px; margin-top: 10px;" />
                                    </div>
                                    <h3></h3>
                                    <br>
                                    <br>
                                    <br>
                                    <br>
                                    <h4>Share your QR code or link.</h4>
                                </div>

                                <div class="feature box">
                                    <div class="icon-bg">
                                        <v-img :src="amount" alt="affordable prices icon" />
                                    </div>
                                    <h3></h3>
                                    <br>
                                    <br>
                                    <br>
                                    <br>
                                    <h4>Choose an amount & confirm with M-Pesa</h4>
                                </div>

                                <div class="feature box">
                                    <div class="icon-bg">
                                        <v-img :src="chart" alt="affordable prices icon" />
                                    </div>
                                    <h3></h3>
                                    <br>
                                    <br>
                                    <br>
                                    <br>
                                    <h4>Your support goes directly to the recipient</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="container">

                        <div class="d-flex">

                            <div class="box" style="padding: 20px; border-radius: 10px; margin: 20px;">

                            </div>

                            <div class="box" style="padding: 20px; border-radius: 10px; margin: 20px;">
                                <h3></h3>

                            </div>

                            <div class="box" style="padding: 20px; border-radius: 10px; margin: 20px;">

                                <h3></h3>

                            </div>

                            <div class="box" style="padding: 20px; border-radius: 10px; margin: 20px;">

                                <h3></h3>
                            </div>

                        </div>
                    </div>

                    
                </v-col>

           

            </v-row>
        </div>
    </v-img>
</div>
</template>

<script>
import bg from "@/assets/home.svg";
import qr from "@/assets/qr.png";
import amount from "@/assets/amount.png";
import chart from "@/assets/chart.png";
import qr_share from "@/assets/qr-share.png";
import axios from "axios";
import numeral from "numeral";

export default {
    name: 'NuxtTutorial',
    props: {
        showBurger: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            qr,
            amount,
            chart,
            qr_share,
            products: [],
            numeral,
            items_c: [{
                    src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
                },
                {
                    src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
                },
                {
                    src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
                },
                {
                    src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
                },
            ],
            bg,
            pageNotFound: '404 Not Found',
            otherError: 'An error occurred'
        }
    },
    methods: {
        sendData(val) {
            this.$emit("send-data", val);
        },
        async Fetch_Products() {
            let that = this;
            that.products.splice(that.products);
            axios
                .get("https://swisslifeserver-production.up.railway.app/api/products/products/tag/home", {})
                .then(function (response) {
                    if (response.status == 200) {
                        // that.snackbar = true;
                        // that.snackbarText = response.data;
                        that.products = response.data;
                        console.log("products", that.products);
                    } else if (response.status == 400) {

                    }
                })
                .catch(function (error) {
                    console.log(error);

                });
        },
    },
    mounted() {
        this.Fetch_Products();
    }
}
</script>

<style scoped>
.box {
    background-color: rgb(255 255 255 / 30%);
    backdrop-filter: blur(5px);
    border-radius: 12px;
}

.fade-section {
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.8s ease;
    text-align: center;
    padding: 60px;
    background: #f4f4f4;
    margin: 10px;
    border-radius: 10px;
}

/* Active animation */
.fade-in {
    opacity: 1;
    transform: translateY(0);
}

.fade-demo {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    padding: 40px;
}

/* Fade In from Top */
.fade-in-up {
    opacity: 0;
    transform: translateY(30px);
    animation: fadeInUp 1.5s ease forwards;
}

@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Fade In from Bottom */
.fade-in-down {
    opacity: 0;
    transform: translateY(-30px);
    animation: fadeInDown 1.5s ease forwards;
}

@keyframes fadeInDown {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Fade In from Left */
.fade-in-left {
    opacity: 0;
    transform: translateX(-30px);
    animation: fadeInLeft 1.5s ease forwards;
}

@keyframes fadeInLeft {
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

/* Fade In from Right */
.fade-in-right {
    opacity: 0;
    transform: translateX(30px);
    animation: fadeInRight 1.5s ease forwards;
}

@keyframes fadeInRight {
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.features {
    justify-content: space-between;
    align-items: flex-start;
    gap: 2rem;
    padding: 3rem 2rem;
    background: #ffffff00;
    flex-wrap: wrap;
    /* allow wrapping on small screens */
}

.feature {
    position: relative;
    flex: 1;
    text-align: left;
    margin: 9px;
    padding: 1.2rem 1.2rem;
    overflow: hidden;
    min-width: 250px;
    /* prevent text from becoming too narrow */
}

.feature .icon-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    height: 100px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    pointer-events: none;
}

.feature .icon-bg img {
    width: 100px;
    height: auto;
    opacity: 0.1;
    margin-top: 10px;
    margin-left: 5px;
}

.feature h3 {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    position: relative;
    z-index: 1;
}

.feature p {
    font-size: 0.9rem;
    color: #fff;
    position: relative;
    z-index: 1;
    max-width: 260px;
}
</style>
