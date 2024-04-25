import {Context, Plugin} from '@nuxt/types'
import {Inject} from "@nuxt/types/app";
import {
  KodMobiChannelType, KodMobiCheckCodeRequest, KodMobiCheckResponseType,
  KodMobiCreateResponseType,
  KodMobiCreateSessionRequest,
  KodMobiSendCodeRequest, KodMobiSendResponseType, KodMobiVerifyResponseType, KodMobiVerifyTokenRequest
} from "~/common/types/kod-mobi.type";
import {KodMobiLang} from "~/common/enums/kod-mobi.enum";

const crypto = require('crypto');

const KodMobiPlugin: Plugin = (context: Context, inject: Inject) => {
  inject('kodmobi', {
    init(): void {
      /*
      * @dev Base URL
      * */
      this.BASE_URL = context.store.getters['kod-mobi.store/getUrl'];

      /*
      * @dev API key
      * */
      this.API_KEY = context.store.getters['kod-mobi.store/getApiKey'];

      /*
      * @dev API key
      * */
      this.SECRET_KEY = context.store.getters['kod-mobi.store/getSecretKey'];

      this.CHALLENGE_TOKEN = context.store.getters['challenge.store/getToken'];
      this.ACTION = context.store.getters['challenge.store/getAction'];

      return this;
    },
    encryptCode(message: string, algo: string) : void {
      try {
        // const code: string | null = context.store.getters['kod-mobi.store/getCode'];
        // const algo: string = 'aes-256-cbc';

        if (!this.SECRET_KEY) {
          context.$toast.error(`Заполните Secret Key`, {
            duration: 2000
          });

          return;
        }
        const secretKey = crypto.createHash('sha256')
            .update(String(this.SECRET_KEY))
            .digest('base64')
            .substring(0, 32);

        const iv = crypto.randomBytes(16);

        const cipher = crypto.createCipheriv(algo, secretKey, iv);

        let encrypted = cipher.update(message, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        const prefix: string = algo.replaceAll('-', '_') + '_';
        const result: string = `${prefix}${iv.toString('hex')}${encrypted}`;


        console.log(result)

      } catch (e: any) {
        console.log('123', e)
      }
    },
    createSession(): Promise<KodMobiCreateResponseType> {
      return new Promise(async (resolve, reject): Promise<void> => {
        try {
          const phone: string = context.store.getters['kod-mobi.store/getPhone'];
          const send: boolean = context.store.getters['kod-mobi.store/getSending'];
          const code: string | null = context.store.getters['kod-mobi.store/getCode'];
          const lang: KodMobiLang | null = context.store.getters['kod-mobi.store/getLang'];
          const type: KodMobiChannelType = context.store.getters['kod-mobi.store/getChannelType'];

          /*
          * @dev prepare request body params
          * */
          const params: KodMobiCreateSessionRequest = {phone, send}

          if (code) params['code'] = code;
          if (lang) params['lang'] = lang;
          if (type) params['type'] = type;

          const result: KodMobiCreateResponseType = await context.$axios.$post<KodMobiCreateResponseType>(this.BASE_URL + '/message/create', params, {
            headers: {
              'x-api-key': this.API_KEY,
              'X-CF-TURNSTILE-TOKEN': this.CHALLENGE_TOKEN,
            },
            progress: false
          });

          /*
          * @dev show success toast
          * */
          context.$toast.success(`Успешно`, {
            duration: 2000
          })

          /*
          * @dev save session_id to store
          * */
          context.store.commit('kod-mobi.store/setSessionId', result.data.session_id);

          /*
          * @dev save response to store
          * */
          context.store.commit('kod-mobi.store/setCreateResponse', result);

          resolve(result)
        } catch (e: any) {
          /*
          * @dev show error message
          * */
          context.$toast.error(`${e?.response?.data?.error || 'Unexpected error'}`, {
            duration: 2000
          });

          reject(e);
        }
      });
    },
    sendCode(): Promise<KodMobiSendResponseType> {
      return new Promise(async (resolve, reject): Promise<void> => {
        try {
          const session_id: string = context.store.getters['kod-mobi.store/getSessionId'];
          const lang: KodMobiLang | null = context.store.getters['kod-mobi.store/getLang'];
          const type: KodMobiChannelType = context.store.getters['kod-mobi.store/getChannelType'];

          /*
          * @dev prepare request body params
          * */
          const params: KodMobiSendCodeRequest = {session_id}

          if (lang) params['lang'] = lang;
          if (type) params['type'] = type;

          /*
          * @dev execute the request
          * */
          const result: KodMobiSendResponseType = await context.$axios.$post<KodMobiSendResponseType>(this.BASE_URL+ '/message/send', params, {
            headers: {
              'x-api-key': this.API_KEY,
              'X-CF-TURNSTILE-TOKEN': this.CHALLENGE_TOKEN,
            },
            progress: false
          });

          /*
           * @dev show success toast
           * */
          context.$toast.success(`Успешно`, {
            duration: 2000
          })

          /*
          * @dev save response to store
          * */
          context.store.commit('kod-mobi.store/setSendResponse', result);

          resolve(result);
        } catch (e: any) {
          /*
          * @dev show error message
          * */
          context.$toast.error(`${e?.response?.data?.error || 'Unexpected error'}`, {
            duration: 2000
          });

          reject(e);
        }
      });
    },
    checkCode(): Promise<KodMobiCheckResponseType> {
      return new Promise(async (resolve, reject): Promise<void> => {
        try {
          const session_id: string = context.store.getters['kod-mobi.store/getSessionId'];
          const code: string = context.store.getters['kod-mobi.store/getCode'];
          const lang: KodMobiLang | null = context.store.getters['kod-mobi.store/getLang'];

          /*
          * @dev prepare request body params
          * */
          const params: KodMobiCheckCodeRequest = {session_id, code}

          if (lang) params['lang'] = lang;

          /*
          * @dev execute the request
          * */
          const result: KodMobiCheckResponseType = await context.$axios.$post<KodMobiCheckResponseType>(this.BASE_URL+ '/message/check', params, {
            headers: {
              'x-api-key': this.API_KEY,
              'X-CF-TURNSTILE-TOKEN': this.CHALLENGE_TOKEN,
            },
            progress: false
          });

          /*
          * @dev show success toast
          * */
          context.$toast.success(`Успешно`, {
            duration: 2000
          });

          /*
          * @dev save verify token to store
          * */
          context.store.commit('kod-mobi.store/setVerifyToken', result.data.verify_token);

          /*
          * @dev save response to store
          * */
          context.store.commit('kod-mobi.store/setCheckResponse', result);

          resolve(result);
        } catch (e: any) {
          /*
          * @dev show error message
          * */
          context.$toast.error(`${e?.response?.data?.error || 'Unexpected error'}`, {
            duration: 2000
          });

          reject(e);
        }
      });
    },
    verifyToken(): Promise<KodMobiVerifyResponseType> {
      return new Promise(async (resolve, reject): Promise<void> => {
        try {
          const verify_token: string = context.store.getters['kod-mobi.store/getVerifyToken'];
          const lang: KodMobiLang | null = context.store.getters['kod-mobi.store/getLang'];

          /*
          * @dev prepare request body params
          * */
          const params: KodMobiVerifyTokenRequest = {verify_token}

          if (lang) params['lang'] = lang;

          /*
          * @dev execute the request
          * */
          const result: KodMobiVerifyResponseType = await context.$axios.$post<KodMobiVerifyResponseType>(this.BASE_URL+ '/message/verify', params, {
            headers: {
              'x-api-key': this.SECRET_KEY,
              'X-CF-TURNSTILE-TOKEN': this.CHALLENGE_TOKEN,
            },
            progress: false
          });

          /*
          * @dev show success toast
          * */
          context.$toast.success(`Успешно`, {
            duration: 2000
          });

          /*
          * @dev save response to store
          * */
          context.store.commit('kod-mobi.store/setVerifyResponse', result);

          resolve(result);
        } catch (e: any) {
          /*
          * @dev show error message
          * */
          context.$toast.error(`${e?.response?.data?.error || 'Unexpected error'}`, {
            duration: 2000
          });

          reject(e);
        }
      })
    }
  })
}

export default KodMobiPlugin
