import express from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

import { authRouter, projectRouter } from '@/routes'

const app = express()

/**
 * @swagger
 * components:
 *   schemas:
 *     AddProjectRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *
 */
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API',
      version: '1.0.0',
      description: 'API documentation Vestify',
    },

    servers: [
      {
        url: `http://localhost:${process.env.PORT ?? 3000}`,
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/api/auth', authRouter)
app.use('/api/project', projectRouter)

app.get('/health', (req, res) => {
  res.status(200).send('server is running')
})

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {})
