<script lang="ts">
import Vue from 'vue'
import GrommetIconsCircleInformation from "~/components/icons/info.component.vue";
import Response from "~/components/response.component.vue";
import {KodMobiCheckCodeRequest, KodMobiCheckResponseType, KodMobiHeaders} from "~/common/types/kod-mobi.type";
import Endpoint from "~/components/endpoint.component.vue";
import {RestMethod} from "~/common/enums/rest.enum";
import GrommetIconsLinkNext from "~/components/icons/next-link.component.vue";
import GrommetIconsLinkPrevious from "~/components/icons/prev-link.component.vue";
import Challenge from "~/components/challenge.component.vue";
import {ChallengeAction} from "~/common/enums/challenge.enum";

export default Vue.extend({
  data() {
    return {
      isLoading: false
    }
  },
  components: {
    Challenge,
    GrommetIconsLinkPrevious, GrommetIconsLinkNext, Endpoint, Response, GrommetIconsCircleInformation
  },
  computed: {
    RestMethod() {
      return RestMethod
    },
    checkResponse() {
      return this.$store.getters['kod-mobi.store/checkResponse'];
    },
    sessionId: {
      get() {
        return this.$store.getters['kod-mobi.store/getSessionId'];
      },
      set(value: string) {
        this.$store.commit('kod-mobi.store/setSessionId', value);
      }
    },
    code: {
      get() {
        return this.$store.getters['kod-mobi.store/getCode'];
      },
      set(value: string) {
        this.$store.commit('kod-mobi.store/setCode', value);
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
      return !this.$store.getters['kod-mobi.store/getSessionId'] || !this.$store.getters['kod-mobi.store/getCode'];
    },
    url() {
      return this.$store.getters['kod-mobi.store/getUrl'];
    },
    apiKey() {
      return this.$store.getters['kod-mobi.store/getApiKey'];
    },
    getRequestBody() {
      const params: KodMobiCheckCodeRequest = {
        session_id: this.sessionId,
        code: this.code
      }

      if (this.language) {
        params['lang'] = this.language;
      }

      return params;
    },
    getHeaders() {
      const headers: KodMobiHeaders = {
        'x-api-key': this.apiKey,
        'X-CF-TURNSTILE-TOKEN': this.token,
      }

      return headers;
    },
    action: {
      get() {
        return this.$store.getters['challenge.store/getAction'];
      },
      set(value: ChallengeAction) {
        this.$store.commit('challenge.store/setAction', value);
      }
    },
    token: {
      get() {
        return this.$store.getters['challenge.store/getToken'];
      },
      set(value: string | null) {
        this.$store.commit('challenge.store/setToken', value);
      }
    },
    challengeLoading(): boolean {
      const token: string = this.$store.getters['challenge.store/getToken'];
      const siteKey: string = this.$store.getters['kod-mobi.store/getTurnstileSiteKey'];
      return !token && !!siteKey
    }
  },
  mounted() {
    this.resetChallenge();
  },
  methods: {
    resetChallenge() {
      this.token = null;
      this.action = ChallengeAction.CHECK;
    },
    async checkCode() {
      /*
      * @dev enable loading
      * */
      this.isLoading = true;

      this.$kodmobi
        .init()
        .checkCode()
        .then((_res: KodMobiCheckResponseType) => {
          /*
          * @dev add scroll to #send-response
          * */
          setTimeout(() => {
            const element: HTMLElement | null = document.getElementById('check-response')
            element?.scrollIntoView({behavior: 'smooth'});
          }, 1000);
        }).finally(this.resetChallenge);

      this.isLoading = false;
    }
  }
})
</script>

<template>
  <div class="flex flex-col items-center justify-start h-full w-full mt-4 p-4 rounded-2xl bg-base-200">
    <h1 class="text-2xl">Проверка кода</h1>

    <Endpoint :method="RestMethod.POST" path="/message/check"/>

    <!--  phone  -->
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">Session ID <span class="text-error">*</span></span>
        <span class="label-text-alt"></span>
      </label>
      <input v-model="sessionId" type="text" placeholder="Идентификатор сессии" class="input input-bordered w-full"/>
      <label class="label">
        <span class="label-text-alt">Идентификатор сессии</span>
        <span class="label-text-alt">Возвращается в запросе создания сессии</span>
      </label>
    </div>

    <!--  sms code  -->
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">Код из СМС <span class="text-error">*</span></span>
        <span class="label-text-alt"></span>
      </label>
      <input v-model="code" type="text" placeholder="Ваш СМС код" class="input input-bordered w-full"/>
      <label class="label">
        <span class="label-text-alt">СМС код для отправки</span>
        <span class="label-text-alt">не обязательно</span>
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
      <NuxtLink to="/playground/send-code" disabled class="flex items-center justify-center gap-2 text-secondary group">
        <GrommetIconsLinkPrevious class="group-hover:-translate-x-2 transition-all"/>
        <span>Отправка кода</span>
      </NuxtLink>
      <button @click="checkCode" :disabled="disabledButton || isLoading || challengeLoading" class="btn btn-accent">
        {{ challengeLoading ? "Challenge processing..." : "Проверить код" }}
      </button>
      <NuxtLink to="/playground/verify-token" disabled
                class="flex items-center justify-center gap-2 text-secondary group">
        <span>Проверка токена</span>
        <GrommetIconsLinkNext class="group-hover:translate-x-2 transition-all"/>
      </NuxtLink>
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
    <div v-if="checkResponse" id="check-response" class="overflow-auto w-full mt-4">
      <Response :data="checkResponse"/>
    </div>
  </div>
</template>

