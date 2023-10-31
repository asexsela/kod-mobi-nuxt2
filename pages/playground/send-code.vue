<script lang="ts">
import Vue from 'vue'
import GrommetIconsCircleInformation from "~/components/icons/info.component.vue";
import Response from "~/components/response.component.vue";
import {KodMobiHeaders, KodMobiSendCodeRequest, KodMobiSendResponseType} from "~/common/types/kod-mobi.type";
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
    sendResponse() {
      return this.$store.getters['kod-mobi.store/sendResponse'];
    },
    sessionId: {
      get() {
        return this.$store.getters['kod-mobi.store/getSessionId'];
      },
      set(value: string) {
        this.$store.commit('kod-mobi.store/setSessionId', value);
      }
    },
    channelType: {
      get() {
        return this.$store.getters['kod-mobi.store/getChannelType'];
      },
      set(value: string) {
        this.$store.commit('kod-mobi.store/setChannelType', value);
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
      return !this.$store.getters['kod-mobi.store/getSessionId'];
    },
    url() {
      return this.$store.getters['kod-mobi.store/getUrl'];
    },
    apiKey() {
      return this.$store.getters['kod-mobi.store/getApiKey'];
    },
    getRequestBody() {
      const params: KodMobiSendCodeRequest = {
        session_id: this.sessionId
      }

      if (this.language) {
        params['lang'] = this.language;
      }

      if (this.channelType) {
        params['type'] = this.channelType;
      }

      return params;
    },
    getHeaders() {
      const headers: KodMobiHeaders = {
        'x-api-key': this.apiKey,
      }

      return headers;
    }
  },
  methods: {
    async sendCode() {
      /*
      * @dev enable loading
      * */
      this.isLoading = true;

      this.$kodmobi
        .init()
        .sendCode()
        .then((_res: KodMobiSendResponseType) => {
          /*
          * @dev add scroll to #send-response
          * */
          setTimeout(() => {
            const element: HTMLElement | null = document.getElementById('send-response')
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
    <h1 class="text-2xl">Отправка кода</h1>

    <Endpoint :method="RestMethod.POST" path="/message/send"/>

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

    <!--  channel type  -->
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">Канал <span class="text-error">*</span></span>
        <span class="label-text-alt"></span>
      </label>
      <select class="select select-bordered w-full" v-model="channelType">
        <option selected :value="null">По умолчанию</option>
        <option value="whatsapp">WhatsApp</option>
        <option value="telegram">Telegram</option>
        <option value="sms">СМС</option>
      </select>
      <label class="label">
        <span class="label-text-alt">Тип канала отправки</span>
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
      <NuxtLink to="/playground/create-session" disabled
                class="flex items-center justify-center gap-2 text-secondary group">
        <GrommetIconsLinkPrevious class="group-hover:-translate-x-2 transition-all"/>
        <span>Создание сессии</span>
      </NuxtLink>
      <button @click="sendCode" :disabled="disabledButton || isLoading" class="btn btn-accent">
        Отправить сообщение
      </button>
      <NuxtLink to="/playground/check-code" disabled
                class="flex items-center justify-center gap-2 text-secondary group">
        <span>Проверка кода</span>
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
    <div id="send-response" class="overflow-auto w-full mt-4">
      <Response v-if="sendResponse" :data="sendResponse"/>
    </div>
  </div>
</template>

