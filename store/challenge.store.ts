import {ChallengeState} from "~/common/types/challenge.type";
import {ChallengeAction} from "~/common/enums/challenge.enum";
import {IChallengeGetter, IChallengeMutation} from "~/common/interfaces/challenge.interface";

export const state = (): ChallengeState => ({
  token: null,
  action: ChallengeAction.CREATE,
})

export const getters: IChallengeGetter = {
  getToken: (state: ChallengeState) => state.token,
  getAction: (state: ChallengeState) => state.action
}

export const mutations: IChallengeMutation = {
  setToken: (state: ChallengeState, token: string) => state.token = token,
  setAction: (state: ChallengeState, action: ChallengeAction) => state.action = action
}
