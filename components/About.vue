<template>
<v-app dark style="background-color: black;color: white;" class="parallax">
    <div>

        <div class="">
            <div class="container">
                <div class="text-center my-12">
                    <div class="container">

                        <h1 style="color: #C6FF00;">WHO IS TIPME FOR?</h1>

                    </div>

                </div>
                <div class="d-flex" style="margin-left: 30px;">
                    <v-spacer></v-spacer>
                    <v-row class="container">

                        <v-col cols="12" md="4">
                            <div class="container">

                                <h2 class="" style="font-size: 1.9rem; font-weight: 900;color: #c8ff006c;">
                                    FOR CREATORS <br>
                                </h2>
                                <p class=" mb-4" style="font-size: 1rem;">
                                    Monetize your audience early

                                    You don’t need thousands of followers to earn. <br>
                                    With TipMe, 100 true fans can support you consistently.<br>

                                    Share your TipMe link or QR code on:<br>

                                    -Instagram bio<br>

                                    -TikTok profile<br>

                                    -YouTube descriptions<br>

                                    -WhatsApp status<br>
                                </p>
                                <v-btn large outlined rounded>
                                    Learn More
                                    <v-icon right dark>
                                        mdi-arrow-top-right
                                    </v-icon>
                                </v-btn>
                            </div>
                        </v-col>
                        <v-col cols="12" md="4"></v-col>
                        <v-col cols="12" md="4">
                            <div class="">

                                <h2 class="" style="font-size: 1.9rem; font-weight: 900;color: #c8ff006c;">FOR BUSINESSES & <br> RESTAURANTS
                                </h2>
                                <p class=" mb-4" style="font-size: 1rem;">
                                    Modern tipping without the headache

                                    No cash handling <br>

                                    No disputes <br>

                                    Tips go directly to staff <br>

                                    Simple QR codes on tables or receipts <br>

                                    Let customers tip easily and fairly.
                                </p>
                                <v-btn large outlined rounded>
                                    Learn More
                                    <v-icon right dark>
                                        mdi-arrow-top-right
                                    </v-icon>
                                </v-btn>
                            </div>
                        </v-col>
                        <v-col cols="12" md="12"></v-col>
                        <v-col cols="12" md="4"></v-col>
                        <v-col cols="12" md="4">
                            <div class="" >

                                <h2 class="" style="font-size: 1.9rem; font-weight: 900;color: #c8ff006c;">GOALS & <br> TRANSPARENCY
                                </h2>
                                <p class=" mb-4" style="font-size: 1rem;">
                                    Raise with confidence <br>

                                    Set a goal. <br>
                                    Track how much you’ve raised. <br>
                                    Build trust with supporters. <br>

                                    People give more when they see progress.
                                </p>
                                <v-btn large outlined rounded>
                                    Learn More
                                    <v-icon right dark>
                                        mdi-arrow-top-right
                                    </v-icon>
                                </v-btn>
                            </div>
                        </v-col>
                        <v-col cols="12" md="4"></v-col>
                        <v-col cols="12" md="4"></v-col>
                    </v-row>
                    <v-spacer></v-spacer>
                </div>
            </div>

        </div>
    </div>
</v-app>
</template>

<script>
export default {
    name: 'EmptyLayout',
    layout: 'empty',
    props: {
        error: {
            type: Object,
            default: null
        }
    },
    data() {
        return {

            pageNotFound: '404 Not Found',
            otherError: 'An error occurred'
        }
    },
    //   head () {
    //     const title =
    //       this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    //     return {
    //       title
    //     }
    //   }
}
</script>

<style scoped>
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

.float-container {
    position: relative;
    /* adjust as needed */
    justify-content: center;
    align-items: center;
}

.floating-image {
    height: auto;
    animation: float 4s ease-in-out infinite;
}

/* Smooth floating effect */
@keyframes float {
    0% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-15px);
    }

    100% {
        transform: translateY(0);
    }
}

.box {
    background-color: rgb(255 255 255 / 30%);
    backdrop-filter: blur(5px);
}

.box1 {
    background-color: rgb(255 255 255 / 30%);
    backdrop-filter: blur(14px);
}

.box1 {
    background-color: #c8ff006c;
    backdrop-filter: blur(14px);
}

.parallax {
    background-image: url('~/assets/more.svg');
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
</style>
