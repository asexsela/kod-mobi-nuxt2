import {ChallengeAction} from "~/common/enums/challenge.enum";

export type ChallengeState = {
  token: string | null,
  action: ChallengeAction
}
