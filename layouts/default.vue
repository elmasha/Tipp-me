<template>
<v-app dark style="background-color: black;">
    
    <v-app-bar height="90" elevation="0" color="black" dark :clipped-left="clipped" fixed app>
        <v-btn icon to="/">
            <v-icon>mdi-chevron-left</v-icon>
        </v-btn>

        <v-spacer />

        <v-btn icon v-show="false">
          <v-icon>mdi-chart-line-stacked</v-icon>
      </v-btn>
        <v-btn icon  v-show="!auth_state">
          <v-icon>mdi-bell-badge</v-icon>
      </v-btn>
        <v-list style="background-color: black;" v-show="!auth_state">


                <v-list-item >
                    <v-list-item-avatar>
                        <v-img :src="home"></v-img>
                    </v-list-item-avatar>
                </v-list-item>

        </v-list>
        <v-btn v-show="!auth_state" icon @click="logout()">
            <v-icon>mdi-logout</v-icon>
        </v-btn>
    </v-app-bar>
    <!-- <v-navigation-drawer  fixed dark color="black" v-model="drawer" :mini-variant="miniVariant" :clipped="clipped"  app>
        <v-list>
            <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
                <v-list-item-action>
                    <v-icon color="green">{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer> -->
    <v-main>
        <v-container>
            <Nuxt />
        </v-container>
    </v-main>

    <v-footer style="background-color: black;" dark :absolute="!fixed" app>
    <div>
        <div class="d-flex">
            <v-spacer/>
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
          home: require("@/assets/user.png"),
            clipped: false,
            auth_state:false,
            drawer: false,
            fixed: false,
            items: [{
                    icon: 'mdi-account',
                    title: 'Account',
                    to: '/'
                },
                {
                    icon: 'mdi-wallet',
                    title: 'Wallet',
                    to: '/inspire'
                }
            ],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: ''
        }
    },
    methods: {
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
            if (this.$fire.auth.currentUser != null) {

              this.secretKey = this.$fire.auth.currentUser.uid;
              this.FetchUser();
              this.auth_state = true;
            } else {
                this.auth_state = false;
            }
        },
        mounted() {
          this.checkUser();
        },
    },
}
</script>
<style>
* {
  font-family: "Quicksand";
}
</style>
