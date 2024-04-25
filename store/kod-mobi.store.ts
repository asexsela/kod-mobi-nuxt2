import {
  KodMobiCheckResponseType,
  KodMobiCreateResponseType,
  KodMobiSendResponseType,
  KodMobiState, KodMobiVerifyResponseType
} from "~/common/types/kod-mobi.type";
import {IKodMobiGetter, IKodMobiMutation} from "~/common/interfaces/kod-mobi.interface";
import {KodMobiChannel, KodMobiLang} from "~/common/enums/kod-mobi.enum";

export const state = (): KodMobiState => ({
  /*
  * @dev settings
  * @default https://api.kod.mobi/v1
  * */
  url: 'https://api.kod.mobi/v1',
  apiKey: null,
  secretKey: null,
  turnstileSiteKey: null,

  /*
  * @dev request body params
  * */
  phone: null,
  code: null,
  lang: KodMobiLang.RU,
  channelType: null,
  sending: true,
  sessionId: null,
  verifyToken: null,

  /*
  * @dev kod.mobi responses
  * */
  createResponse: null,
  sendResponse: null,
  checkResponse: null,
  verifyResponse: null,
})

export const getters: IKodMobiGetter = {
  /**
  * @dev CloudFlare turnstile site key
  * */
  getTurnstileSiteKey: state => state.turnstileSiteKey,

  /**
  * @dev settings
  * */
  getUrl: state => state.url,
  getApiKey: state => state.apiKey,
  getSecretKey: state => state.secretKey,

  /**
  * @dev request body params
  * */
  getPhone: state => state.phone,
  getCode: state => state.code,
  getLang: state => state.lang,
  getChannelType: state => state.channelType,
  getSending: state => state.sending,
  getSessionId: state => state.sessionId,
  getVerifyToken: state => state.verifyToken,

  /**
  * @dev kod.mobi responses
  * */
  createResponse: state => state.createResponse,
  sendResponse: state => state.sendResponse,
  checkResponse: state => state.checkResponse,
  verifyResponse: state => state.verifyResponse,
}

export const mutations: IKodMobiMutation = {
  /**
   * @dev CloudFlare turnstile site key
   * */
  setTurnstileSiteKey: (state: KodMobiState, siteKey: string) => state.turnstileSiteKey = siteKey,

  /**
  * @dev settings
  * */
  setUrl: (state: KodMobiState, url: string) => state.url = url,
  setApiKey: (state: KodMobiState, apiKey: string) => state.apiKey = apiKey,
  setSecretKey: (state: KodMobiState, secretKey: string) => state.secretKey = secretKey,

  /**
  * @dev request body params
  * */
  setPhone: (state: KodMobiState, phone: string) => state.phone = phone,
  setCode: (state: KodMobiState, code: string) => state.code = code,
  setLang: (state: KodMobiState, lang: KodMobiLang) => state.lang = lang,
  setChannelType: (state: KodMobiState, type: KodMobiChannel) => state.channelType = type,
  setSending: (state: KodMobiState, sending: boolean) => state.sending = sending,
  setSessionId: (state: KodMobiState, sessionId: string) => state.sessionId = sessionId,
  setVerifyToken: (state: KodMobiState, verifyToken: string) => state.verifyToken = verifyToken,

  /**
  * @dev kod.mobi responses
  * */
  setCreateResponse: (state: KodMobiState, response: KodMobiCreateResponseType) => state.createResponse = response,
  setSendResponse: (state: KodMobiState, response: KodMobiSendResponseType) => state.sendResponse = response,
  setCheckResponse: (state: KodMobiState, response: KodMobiCheckResponseType) => state.checkResponse = response,
  setVerifyResponse: (state: KodMobiState, response: KodMobiVerifyResponseType) => state.verifyResponse = response,
}
