import express from 'express'

import { authRouter, projectRouter } from '@/routes'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRouter)
app.use('/api/project', projectRouter)

app.get('/health', (req, res) => {
  res.status(200).send('server is running')
})

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`server is listing on port ${PORT}`)
})
