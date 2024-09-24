import { Router } from 'express'

import { addUser, getCapitalsJoined, investInProject, joinVC } from '@/controllers/user.controller'

const userRouter = Router()

userRouter.post('/new', addUser)

userRouter.post('/joinVC', joinVC)

userRouter.post('/invest', investInProject)

userRouter.get('/:userId/getCapitalsJoined', getCapitalsJoined)

export default userRouter
