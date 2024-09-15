import { AuthService } from '@/services'
import jwt, { JwtPayload } from 'jsonwebtoken'
import passport from 'passport'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import { Strategy as LocalStrategy } from 'passport-local'

// Bearer strategy to authenticate endpoints with bearer
passport.use(
  new BearerStrategy((token, done) => {
    console.log('Token', token)
    try {
      const { user } = jwt.decode(token) as JwtPayload
      console.log('Bearer Strategy ', user)

      return done(null, user)
    } catch {
      done(null, false)
    }
  })
)

passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    const authService = new AuthService()
    const userId = await authService.getUserByEmailAndPasswordFromDb(email, password)

    if (!userId) return done(null, false, { message: 'invalid email or password' })

    return done(null, { id: userId })
  })
)

passport.serializeUser((user, done) => {
  console.log('Inside serialise cb. User id is stored to the session file store here')
  done(null, user)
})

passport.deserializeUser(async (user: { id: string }, done) => {
  const authService = new AuthService()
  const userInfo = await authService.getUserById(user.id)

  done(null, userInfo)
})

export default passport
