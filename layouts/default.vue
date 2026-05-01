<template>
<v-app dark style="background-color: black;" v-resize="onResize">

   
    
    <v-main>
        
            <Nuxt />
       
    </v-main>

    <v-footer class="tipme-footer" dark app>
  <div class="footer-inner">
    <div class="footer-brand">
      <div class="footer-logo">
        T
      </div>

      <div>
        <h4>TipMe</h4>
        <p>Digital tipping made simple</p>
      </div>
    </div>

    <div class="footer-links">
      <NuxtLink style="color:#fff" to="/">Home</NuxtLink>
      <NuxtLink style="color:#fff" to="/wallet">Wallet</NuxtLink>
      <NuxtLink style="color:#fff" to="/terms">Terms</NuxtLink>
    </div>

    <div class="footer-copy">
      &copy; {{ new Date().getFullYear() }} TipMe. All rights reserved.
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
           if (this.$fire.auth.currentUser != null) {
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
.tipme-footer {
  background: rgba(5, 5, 5, 0.96) !important;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px);
  padding: 22px 18px !important;
}

.footer-inner {
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 22px;
  flex-wrap: wrap;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.footer-logo {
  width: 40px;
  height: 40px;
  border-radius: 14px;
  display: grid;
  place-items: center;

  color: black;
  font-size: 18px;
  font-weight: 950;

  background: linear-gradient(135deg, #b6ff00, #00ff99);
  box-shadow: 0 0 26px rgba(182, 255, 0, 0.26);
}

.footer-brand h4 {
  margin: 0;
  color: white;
  font-size: 16px;
  line-height: 1;
}

.footer-brand p {
  margin: 5px 0 0;
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 8px;
  color:#fff;
  flex-wrap: wrap;
}

.footer-links a {
  padding: 9px 13px;
  border-radius: 999px;

  color: rgba(255, 255, 255, 0.68);
  text-decoration: none;
  font-size: 13px;
  font-weight: 800;
  transition: 0.2s ease;
}

.footer-links a:hover {
  color: black;
  background: linear-gradient(135deg, #b6ff00, #00ff99);
}

.footer-copy {
  color: rgba(255, 255, 255, 0.48);
  font-size: 13px;
  font-weight: 600;
}

@media (max-width: 700px) {
  .tipme-footer {
    padding: 20px 14px !important;
  }

  .footer-inner {
    align-items: flex-start;
    flex-direction: column;
  }

  .footer-links {
    width: 100%;
  }

  .footer-copy {
    width: 100%;
    padding-top: 8px;
    border-top: 1px solid rgba(255, 255, 255, 0.07);
  }
}


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
