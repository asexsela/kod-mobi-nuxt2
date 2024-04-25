import {AuthState} from "~/common/types/auth.type";

export interface IAuthGetter {
  getPhone: (state: AuthState) => string | null;
  isAuth: (state: AuthState) => boolean;
}

export interface IAuthMutation {
  setPhone: (state: AuthState, phone: string) => void;
  setIsAuth: (state: AuthState, isAuth: boolean) => void;
}
