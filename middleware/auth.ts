import {Context} from '@nuxt/types'

export default function (context: Context): void {
  const isAuth: boolean = context.store.getters['auth.store/isAuth'];

  if (!isAuth) {
    return context.redirect('/examples/auth')
  }
}
