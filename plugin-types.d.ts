import Vue from 'vue'
import {IKodMobiPlugin} from "~/common/interfaces/kod-mobi.interface";

declare module 'vue/types/vue' {
  // this.$myInjectedFunction inside Vue components
  interface Vue {
    $kodmobi: IKodMobiPlugin
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$myInjectedFunction inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $kodmobi: IKodMobiPlugin
  }
  // nuxtContext.$myInjectedFunction
  interface Context {
    $kodmobi: IKodMobiPlugin
  }
}

declare module 'vuex/types/index' {
  // this.$myInjectedFunction inside Vuex stores
  interface Store<S> {
    $kodmobi: IKodMobiPlugin
  }
}

declare global {
  interface Window {
    turnstile: any
  }
}
