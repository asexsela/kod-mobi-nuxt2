<script lang="ts">
import Vue from 'vue'
import GrommetIconsCircleInformation from "~/components/icons/info.component.vue";
import Response from "~/components/response.component.vue";
import {KodMobiCreateResponseType, KodMobiCreateSessionRequest, KodMobiHeaders} from "~/common/types/kod-mobi.type";
import Endpoint from "~/components/endpoint.component.vue";
import {RestMethod} from "~/common/enums/rest.enum";
import GrommetIconsLinkNext from "~/components/icons/next-link.component.vue";

export default Vue.extend({
  data() {
    return {
      isLoading: false
    }
  },
  components: {GrommetIconsLinkNext, Endpoint, Response, GrommetIconsCircleInformation},
  computed: {
    RestMethod() {
      return RestMethod
    },
    createResponse() {
      return this.$store.getters['kod-mobi.store/createResponse'];
    },
    sessionId() {
      return this.$store.getters['kod-mobi.store/getSessionId'];
    },
    phone: {
      get() {
        return this.$store.getters['kod-mobi.store/getPhone'];
      },
      set(value: string) {
        this.$store.commit('kod-mobi.store/setPhone', value);
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
    code: {
      get() {
        return this.$store.getters['kod-mobi.store/getCode'];
      },
      set(value: string) {
        this.$store.commit('kod-mobi.store/setCode', value);
      }
    },
    sending: {
      get() {
        return this.$store.getters['kod-mobi.store/getSending'];
      },
      set(value: string) {
        this.$store.commit('kod-mobi.store/setSending', value);
      }
    },
    disabledButton() {
      return !this.$store.getters['kod-mobi.store/getPhone'];
    },
    url() {
      return this.$store.getters['kod-mobi.store/getUrl'];
    },
    apiKey() {
      return this.$store.getters['kod-mobi.store/getApiKey'];
    },
    getRequestBody() {
      const params: KodMobiCreateSessionRequest = {
        phone: this.phone,
        send: this.sending,
      }

      if (this.code) {
        params['code'] = this.code;
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
    async createCode() {
      /*
      * @dev enable loading
      * */
      this.isLoading = true;

      this.$kodmobi
        .init()
        .createSession()
        .then((_res: KodMobiCreateResponseType) => {
          /*
          * @dev add scroll to #create-response
          * */
          setTimeout(() => {
            const element: HTMLElement | null = document.getElementById('create-response')
            element?.scrollIntoView({behavior: 'smooth'});
          }, 1000);
        });

        /*
        * @dev disable loading
        * */
        this.isLoading = false;
      }
    }
  })
</script>

<template>
  <div class="flex flex-col items-center justify-start h-full w-full mt-4 p-4 rounded-2xl bg-base-200">
    <h1 class="text-2xl">Создание сессии</h1>

    <Endpoint :method="RestMethod.POST" path="/message/create"/>

    <div class="alert alert-info mb-6">
      <GrommetIconsCircleInformation/>
      <span>Если сессия для номера телефона уже существует, то сообщение не будет отправлено!</span>
    </div>

    <!--  phone  -->
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">Номер телефона <span class="text-error">*</span></span>
        <span class="label-text-alt"></span>
      </label>
      <input v-model="phone" type="text" placeholder="Ваш номер телефона" class="input input-bordered w-full"/>
      <label class="label">
        <span class="label-text-alt">Номер телефона для получения СМС</span>
        <span class="label-text-alt"></span>
      </label>
    </div>

    <!--  channel type  -->
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">Канал</span>
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

    <!--  sms code  -->
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">СМС Код</span>
        <span class="label-text-alt"></span>
      </label>
      <input v-model="code" type="text" placeholder="Ваш СМС код" class="input input-bordered w-full"/>
      <label class="label">
        <span class="label-text-alt">СМС код для отправки</span>
        <span class="label-text-alt">не обязательно</span>
      </label>
    </div>

    <!--   sending flag   -->
    <div class="form-control w-full">
      <label class="cursor-pointer label">
        <span class="label-text">Отправить сообщение</span>
        <input type="checkbox" class="toggle toggle-primary" v-model="sending"/>
      </label>
    </div>

    <!--  handler button  -->
    <div class="mt-4 grid grid-cols-3 gap-2 items-center w-full">
      <div></div>
      <button @click="createCode" :disabled="disabledButton || isLoading" class="btn btn-accent">
        Создать сессию
      </button>
      <NuxtLink to="/playground/send-code" disabled class="flex items-center justify-center gap-2 text-secondary group">
        <span>Отправка кода</span>
        <GrommetIconsLinkNext class="group-hover:translate-x-2 transition-all" />
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
    <div v-if="createResponse" id="create-response" class="overflow-auto w-full mt-4">
      <div class="text-xl mb-2">Response:</div>
      <Response :data="createResponse"/>
    </div>
  </div>
</template>

