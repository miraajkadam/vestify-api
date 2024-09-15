import express from 'express'
import session from 'express-session'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

import { authRouter, projectRouter } from '@/routes'
import passport from '@/utils/passport'
import { apiReference } from '@scalar/express-api-reference'

const app = express()

const JWT_SECRET = process.env.JWT_SECRET as string

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    secret: JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 360000, secure: false },
    rolling: true,
    // genid: req => {
    //   return uuid() // use UUID's for session id
    // },
  })
)

app.use((req, res, next) => {
  console.log('SessionID: ', req.sessionID)

  next()
})

app.use(passport.initialize())
app.use(passport.session())

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'JOBSFY API',
      version: '1.0.0',
      description: 'The APIs for jobsfy',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/swagger/*.ts'],
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(
  '/docs',
  apiReference({
    spec: swaggerSpec,
    theme: {
      favicon: 'https://example.com/favicon.png',
    },
  })
)

app.use('/api/auth', authRouter)
app.use('/api/project', projectRouter)

app.get('/health', (req, res) => {
  res.status(200).send('server is running')
})

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`server is listing on port ${PORT}`)
  console.log(`API Documentation available at http://localhost:${PORT}/docs`)
})
