export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'spa',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: 'online shop dashboard',
    bodyAttrs: {
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'online shop dashboard' }
    ],
    link: [
      { rel: 'stylesheet', type: 'text/css', href: '/assets2/aboutstyle.cscs' },
      { rel: 'stylesheet', type: 'text/css', href: '/assets2/adminstyle.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/assets2/loginstyle.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/assets2/formstyle.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/assets2/shopstyle.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/assets2/style.css' },
    
    ],
    script: [
      {
        src: '/assets2/app.js',
        type: 'text/javascript'
      },
      {
        src: '/assets2/script.js',
        type: 'text/javascript'
      },
      {
        src: '/assets2/shopscript.js',
        type: 'text/javascript'
      },
      {
        src: '/assets2/aboutscript.js',
        type: 'text/javascript'
      }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    // 'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
      baseURL: 'http://localhost/online-shop-backend/public/'
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  },
  srcDir: __dirname,
  buildDir: '.nuxt/admin'
}
