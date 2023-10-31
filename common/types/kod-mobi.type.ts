import {KodMobiChannel, KodMobiLang} from "~/common/enums/kod-mobi.enum";

export type KodMobiChannelType = {
  name: string;
  type: KodMobiChannel;
  is_active: boolean;
  timeout: number;
  description: string;
  image_url: string;
  link: string;
  sorting?: number;
}

export type KodMobiCreateResponseType = {
  success: boolean;
  data: {
    session_id: string;
    sent_to: KodMobiChannel;
    client_channels: KodMobiChannelType[];
  }
}

export type KodMobiSendResponseType = {
  success: boolean;
  data: {
    session_id: string;
    client_channel: KodMobiChannelType;
  }
}

export type KodMobiCheckResponseType = {
  success: boolean;
  data: {
    verify_token: string;
    is_test: boolean;
  }
}

export type KodMobiVerifyResponseType = {
  success: boolean;
  data: {
    phone: string;
  }
}

export type KodMobiState = {
  /*
  * @dev settings
  * */
  url: string;
  apiKey: string | null;
  secretKey: string | null;

  /*
  * @dev request body params
  * */
  phone: string | null;
  code: string | null;
  lang: KodMobiLang;
  channelType: KodMobiChannel | null;
  sending: boolean;
  sessionId: string | null;
  verifyToken: string | null;

  /*
  * @dev kod.mobi responses
  * */
  createResponse: KodMobiCreateResponseType | null;
  sendResponse: KodMobiSendResponseType | null;
  checkResponse: KodMobiCheckResponseType | null;
  verifyResponse: KodMobiVerifyResponseType | null;
}

export type KodMobiHeaders = {
  'x-api-key': string;
}

export type KodMobiCreateSessionRequest = {
  phone: string;
  send: boolean;
  code?: string;
  lang?: KodMobiLang;
  type?: KodMobiChannelType;
}

export type KodMobiSendCodeRequest = {
  session_id: string;
  lang?: KodMobiLang;
  type?: KodMobiChannelType;
}

export type KodMobiCheckCodeRequest = {
  session_id: string;
  code: string;
  lang?: KodMobiLang;
}

export type KodMobiVerifyTokenRequest = {
  verify_token: string;
  lang?: KodMobiLang;
}

export type KodMobiErrorResponse = {
  error: string;
  errors: string;
  status: number;
  success: boolean;
}
