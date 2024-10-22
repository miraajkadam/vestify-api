import { validateLoginPayload } from '@/helpers/auth.helper'
import { AuthService } from '@/services'
import { compare } from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import passport from 'passport'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import { Strategy as LocalStrategy } from 'passport-local'

// Bearer strategy to authenticate endpoints with bearer
passport.use(
  new BearerStrategy((token, done) => {
    try {
      const { user } = jwt.decode(token) as JwtPayload

      return done(null, user)
    } catch {
      done(null, false)
    }
  })
)

passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    const isValidPayload = validateLoginPayload(email, password)

    if (!isValidPayload) return done(null, false, { message: 'Invalid payload' })

    const authService = new AuthService()

    const user = await authService.getEncPassIdByEmlFrmDb(email)

    if (!user) return done(null, false, { message: 'Invalid email' })

    const isPswrdMatch = await compare(password, user.password)

    if (!isPswrdMatch) return done(null, false, { message: 'Invalid password' })

    return done(null, { id: user.id })
  })
)

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser(async (user: { id: string }, done) => {
  const authService = new AuthService()
  const userInfo = await authService.getUserById(user.id)

  done(null, userInfo)
})

export default passport
