import colors from 'vuetify/es5/util/colors'

export default {
  // Target: https://go.nuxtjs.dev/config-target


  ssr: false,
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s ',
    title: 'tip-mee',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/tp-logo.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  router: {
    middleware: ["auth"],
},

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/countryCode.js",{ src: "~/plugins/pdf.client.js", mode: "client" }
  ],




  googleFonts: {
    download: true,
    families: {
      Quicksand: true,
    },
    display: "Quicksand",
  },


  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    "@nuxtjs/google-fonts",
    '@nuxtjs/moment',
    '@nuxtjs/dayjs'
  ],

  dayjs: {
  locales: ["en"],
  defaultLocale: "en",
  plugins: ["relativeTime"]
},

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: "AIzaSyA0emGzJyErokuL84Eb_Fy4YWRxdXBi6Jo",
          authDomain: "tip-me-c7df5.firebaseapp.com",
          projectId: "tip-me-c7df5",
          storageBucket: "tip-me-c7df5.appspot.com",
          messagingSenderId: "985382951160",
          appId: "1:985382951160:web:aa6e72d419775a0f5f430d",
          measurementId: "G-G3TS444N72"
        },
        services: {
          auth: {
            persistence: "local", // default
            initialize: {
                nAuthStateChangedMutation: "ON_AUTH_STATE_CHANGED_MUTATION",
                subscribeManually: false,
            },
            ssr: false, // default
        }, // authentication
        firestore: true, // firestoreDb
        storage: true, // storage./ Just as example. Can be any other service.
        }
      }
    ]
  ],
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          green: "#C6FF00",
          green2: "#00ff04",
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          green: "#C6FF00",
          green2: "#00ff04",
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
