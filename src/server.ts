import express from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { apiReference } from '@scalar/express-api-reference'

import { authRouter, projectRouter } from '@/routes'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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
