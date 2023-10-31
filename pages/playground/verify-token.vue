<script lang="ts">
import Vue from 'vue'
import GrommetIconsCircleInformation from "~/components/icons/info.component.vue";
import Response from "~/components/response.component.vue";
import {KodMobiHeaders, KodMobiVerifyResponseType, KodMobiVerifyTokenRequest} from "~/common/types/kod-mobi.type";
import Endpoint from "~/components/endpoint.component.vue";
import {RestMethod} from "~/common/enums/rest.enum";
import GrommetIconsLinkNext from "~/components/icons/next-link.component.vue";
import GrommetIconsLinkPrevious from "~/components/icons/prev-link.component.vue";

export default Vue.extend({
  data() {
    return {
      isLoading: false
    }
  },
  components: {GrommetIconsLinkPrevious, GrommetIconsLinkNext, Endpoint, Response, GrommetIconsCircleInformation},
  computed: {
    RestMethod() {
      return RestMethod
    },
    verifyResponse() {
      return this.$store.getters['kod-mobi.store/verifyResponse'];
    },
    verifyToken: {
      get() {
        return this.$store.getters['kod-mobi.store/getVerifyToken'];
      },
      set(value: string) {
        this.$store.commit('kod-mobi.store/setVerifyToken', value);
      }
    },
    language: {
      get() {
        return this.$store.getters['kod-mobi.store/getLang'];
      },
      set(value: string) {
        this.$store.commit('kod-mobi.store/setLang', value);
      }
    },
    disabledButton() {
      return !this.$store.getters['kod-mobi.store/getVerifyToken'] || !this.$store.getters['kod-mobi.store/getSecretKey'];
    },
    url() {
      return this.$store.getters['kod-mobi.store/getUrl'];
    },
    secretKey() {
      return this.$store.getters['kod-mobi.store/getSecretKey'];
    },
    getRequestBody() {
      const params: KodMobiVerifyTokenRequest = {
        verify_token: this.verifyToken,
      }

      if (this.language) {
        params['lang'] = this.language;
      }

      return params;
    },
    getHeaders() {
      const headers: KodMobiHeaders = {
        'x-api-key': this.secretKey,
      }

      return headers;
    }
  },
  methods: {
    async verify() {
      /*
      * @dev enable loading
      * */
      this.isLoading = true;

      this.$kodmobi
        .init()
        .verifyToken()
        .then((_res: KodMobiVerifyResponseType) => {
          /*
          * @dev add scroll to #send-response
          * */
          setTimeout(() => {
            const element: HTMLElement | null = document.getElementById('verify-response')
            element?.scrollIntoView({behavior: 'smooth'});
          }, 1000);
        });

      this.isLoading = false;
    }
  }
})
</script>

<template>
  <div class="flex flex-col items-center justify-start h-full w-full mt-4 p-4 rounded-2xl bg-base-200">
    <h1 class="text-2xl">Проверка токена</h1>

    <Endpoint :method="RestMethod.POST" path="/message/verify"/>

    <div v-if="!secretKey" class="alert alert-info mb-6">
      <GrommetIconsCircleInformation/>
      <span>Для выполнения запроса нужно заполнить <strong>secret key</strong> в настройках!</span>
    </div>

    <!--  sms code  -->
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">Verify Token <span class="text-error">*</span></span>
        <span class="label-text-alt"></span>
      </label>
      <input v-model="verifyToken" type="text" placeholder="Verify Token" class="input input-bordered w-full"/>
      <label class="label">
        <span class="label-text-alt">Verify Token для проверки</span>
        <span class="label-text-alt">возвращается в проверке кода</span>
      </label>
    </div>

    <!--  language  -->
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">Язык</span>
        <span class="label-text-alt"></span>
      </label>
      <select class="select select-bordered w-full" v-model="language">
        <option selected value="en">English</option>
        <option value="ru">Русский</option>
      </select>
      <label class="label">
        <span class="label-text-alt">Язык</span>
        <span class="label-text-alt">не обязательно</span>
      </label>
    </div>

    <!--  handler button  -->
    <div class="mt-4 grid grid-cols-3 gap-2 items-center w-full">
      <NuxtLink to="/playground/check-code" disabled
                class="flex items-center justify-center gap-2 text-secondary group">
        <GrommetIconsLinkPrevious class="group-hover:-translate-x-2 transition-all"/>
        <span>Проверка кода</span>
      </NuxtLink>
      <button @click="verify" :disabled="disabledButton || isLoading" class="btn btn-accent">
        Проверить токен
      </button>
      <div></div>
    </div>

    <!--  request json  -->
    <div class="overflow-auto w-full mt-4">
      <div class="text-xl mb-2">Headers:</div>
      <Response :data="getHeaders"/>
    </div>

    <!--  request json  -->
    <div class="overflow-auto w-full mt-4">
      <div class="text-xl mb-2">Request body:</div>
      <Response :data="getRequestBody"/>
    </div>

    <!--  response json  -->
    <div v-if="verifyResponse" id="verify-response" class="overflow-auto w-full mt-4">
      <div class="text-xl mb-3">Response:</div>
      <Response :data="verifyResponse"/>
    </div>
  </div>
</template>

