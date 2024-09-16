import { Router } from 'express'

import { addNewVC } from '@/controllers/vc'

const vcRouter = Router()

vcRouter.post('/new', addNewVC)

export default vcRouter
