import {
  KodMobiCheckResponseType,
  KodMobiCreateResponseType,
  KodMobiSendResponseType,
  KodMobiState,
  KodMobiVerifyResponseType
} from "~/common/types/kod-mobi.type";
import {KodMobiChannel, KodMobiLang} from "~/common/enums/kod-mobi.enum";

export interface IKodMobiGetter {
  /**
   * @dev CloudFlare turnstile site key
   * */
  getTurnstileSiteKey: (state: KodMobiState) => string | null;

  /**
   * @dev settings
   * */
  getUrl: (state: KodMobiState) => string;
  getApiKey: (state: KodMobiState) => string | null;
  getSecretKey: (state: KodMobiState) => string | null;

  /**
   * @dev request body params
   * */
  getPhone: (state: KodMobiState) => string | null;
  getCode: (state: KodMobiState) => string | null;
  getLang: (state: KodMobiState) => KodMobiLang | null;
  getChannelType: (state: KodMobiState) => KodMobiChannel | null;
  getSending: (state: KodMobiState) => boolean;
  getSessionId: (state: KodMobiState) => string | null;
  getVerifyToken: (state: KodMobiState) => string | null;

  /**
   * @dev kod.mobi responses
   * */
  createResponse: (state: KodMobiState) => KodMobiCreateResponseType | null;
  sendResponse: (state: KodMobiState) => KodMobiSendResponseType | null;
  checkResponse: (state: KodMobiState) => KodMobiCheckResponseType | null;
  verifyResponse: (state: KodMobiState) => KodMobiVerifyResponseType | null;
}

export interface IKodMobiMutation {

  /**
   * @dev CloudFlare turnstile site key
   * */
  setTurnstileSiteKey: (state: KodMobiState, siteKey: string) => void;

  /**
   * @dev settings
   * */
  setUrl: (state: KodMobiState, url: string) => void;
  setApiKey: (state: KodMobiState, apiKey: string) => void;
  setSecretKey: (state: KodMobiState, secretKey: string) => void;

  /**
   * @dev request body params
   * */
  setPhone: (state: KodMobiState, phone: string) => void;
  setCode: (state: KodMobiState, code: string) => void;
  setLang: (state: KodMobiState, lang: KodMobiLang) => void;
  setChannelType: (state: KodMobiState, type: KodMobiChannel) => void;
  setSending: (state: KodMobiState, sending: boolean) => void;
  setSessionId: (state: KodMobiState, sessionId: string) => void;
  setVerifyToken: (state: KodMobiState, verifyToken: string) => void;

  /**
   * @dev kod.mobi responses
   * */
  setCreateResponse: (state: KodMobiState, response: KodMobiCreateResponseType) => KodMobiCreateResponseType | null;
  setSendResponse: (state: KodMobiState, response: KodMobiSendResponseType) => KodMobiSendResponseType | null;
  setCheckResponse: (state: KodMobiState, response: KodMobiCheckResponseType) => KodMobiCheckResponseType | null;
  setVerifyResponse: (state: KodMobiState, response: KodMobiVerifyResponseType) => KodMobiVerifyResponseType | null;
}

export interface IKodMobiPlugin {
  BASE_URL: string,
  API_KEY: string,
  SECRET_KEY: string,
  CHALLENGE_TOKEN: string | null,
  init: () => IKodMobiPlugin;
  encryptCode: (message: string, algo: string) => void;
  createSession: () => Promise<KodMobiCreateResponseType>;
  sendCode: () => Promise<KodMobiSendResponseType>;
  checkCode: () => Promise<KodMobiCheckResponseType>;
  verifyToken: () => Promise<KodMobiVerifyResponseType>;
}
