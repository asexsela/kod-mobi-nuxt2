import {ChallengeState} from "~/common/types/challenge.type";
import {ChallengeAction} from "~/common/enums/challenge.enum";

export interface IChallengeGetter {
  getToken: (state: ChallengeState) => string | null;
  getAction: (state: ChallengeState) => ChallengeAction;
}

export interface IChallengeMutation {
  setToken: (state: ChallengeState, token: string) => void;
  setAction: (state: ChallengeState, action: ChallengeAction) => void;
}
