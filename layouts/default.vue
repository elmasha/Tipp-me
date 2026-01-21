<template>
<v-app dark style="background-color: black;" v-resize="onResize">

    <v-app-bar elevation="0" color="black" dark :clipped-left="clipped" fixed app>
        <v-app-bar-nav-icon @click="drawer = !drawer" />

        <v-spacer />

        <div v-show="!showBurger">
            <v-list class="d-flex" style="background-color: black;">

                <v-list-item>
                    <nuxt-link id="link" to="/" style="margin: 4px;">Home</nuxt-link>
                </v-list-item>
                <v-list-item>
                    <nuxt-link id="link" to="/" style="margin: 4px;">About</nuxt-link>
                </v-list-item>
                <v-list-item>
                    <nuxt-link id="link" to="/wallet" style="margin: 4px;">Wallet</nuxt-link>
                </v-list-item>
                <v-list-item>
                    <nuxt-link id="link" to="/terms" style="margin: 4px;">T & C</nuxt-link>
                </v-list-item>

            </v-list>
        </div>

        <v-spacer />

        <v-btn icon v-show="false">
            <v-icon>mdi-chart-line-stacked</v-icon>
        </v-btn>
        <v-btn icon v-show="!auth_state">
            <v-icon>mdi-bell-badge</v-icon>
        </v-btn>

        <v-btn v-show="auth_state" icon @click="logout()">
            <v-icon>mdi-logout</v-icon>
        </v-btn>
    </v-app-bar>
    <v-navigation-drawer  fixed dark color="black" v-model="drawer" :mini-variant="miniVariant" :clipped="clipped"  app>
        <v-list>
            <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
                <v-list-item-action>
                    <v-icon color="green">{{ item.icon }}</v-icon>
                     
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title >{{ item.title }}</v-list-item-title>
                </v-list-item-content>

            </v-list-item>
        </v-list>
    </v-navigation-drawer>
    <v-main>
        <v-container>
            <Nuxt />
        </v-container>
    </v-main>

    <v-footer style="background-color: black;" dark :absolute="!fixed" app>
        <div>
            <div class="d-flex">
                <v-spacer />
                <div class="d-flex">
                    <h5 style="color: #C6FF00;">Tip-mee</h5>
                    <span>&copy; {{ new Date().getFullYear() }}</span>
                </div>
            </div>
        </div>

    </v-footer>
</v-app>
</template>

<script>
export default {
    name: 'DefaultLayout',
    data() {
        return {
            windowSize: {
                x: window.innerHeight,
                y: window.innerWidth,
            },
            showBurger: false,
            home: require("@/assets/user.png"),
            clipped: false,
            auth_state: false,
            drawer: false,
            fixed: false,
            items: [{
                    title: 'Home',
                    to: '/',
                },
                {
                    title: 'About',
                    to: '/',
                },
                {
                    title: 'Wallet',
                    to: '/wallet',
                },
                {
                    title: 'Terms & Conditions',
                    to: '/terms',
                }
            ],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: '',
            uid:null,
        }
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

        async scrollToSection1(val) {
            this.$router.push({
                path: `/${val}`,
            });
        },
        logout() {
            this.$fire.auth.signOut();
            window.location.reload(true);
        },
        FetchUser() {
            const db = this.$fire.firestore;
            db.collection("Tipp_user")
                .where("user_uid", "==", this.$fire.auth.currentUser.uid)
                .get()
                .then((queryResult) => {
                    queryResult.forEach((doc) => {
                        this.security_key = doc.data().security_key;
                        // console.log(doc.data())
                        console.log(this.decrypteData(doc.data().pin))

                    });
                });
        },
        checkUser() {
            
        },
        mounted() {
           if (this.$fire.auth.currentUser.uid != null) {
                // this.uid = this.$fire.auth.currentUser.uid;
                this.auth_state = true;
                console.log(this.auth_state)
            } else {
                this.auth_state = false;
                 console.log(this.auth_state)
            }
        },
    },
}
</script>

<style>
* {
    font-family: "Quicksand";
}

#nav_bar_links {
    color: #fff;
    font-weight: 500;

    font-size: 16px;
    transition: color 0.3s;
    background-color: rgba(206, 243, 211, 0.226);
    padding: 8px;
    border-radius: 10px;
}

#link {
    text-decoration: none;
    color: #fff;
    font-weight: 800;
    transition: 0.3s;
}

#link:hover {
    color: #C6FF00;
    font-weight: 800;
}
</style>
