import {AuthState} from "~/common/types/auth.type";
import {IAuthGetter, IAuthMutation} from "~/common/interfaces/auth.interface";

export const state = (): AuthState => ({
  isAuth: false,
  phone: null,
})

export const getters: IAuthGetter = {
  getPhone: (state: AuthState) => state.phone,
  isAuth: (state: AuthState) => state.isAuth
}

export const mutations: IAuthMutation = {
  setPhone: (state: AuthState, phone: string) => state.phone = phone,
  setIsAuth: (state: AuthState, isAuth: boolean) => state.isAuth = isAuth
}
