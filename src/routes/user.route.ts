import { Router } from 'express'

import { addUser, getCapitalsJoined, joinVC } from '@/controllers/user.controller'

const userRouter = Router()

userRouter.post('/new', addUser)

userRouter.post('/joinVC', joinVC)

userRouter.get('/:userId/getCapitalsJoined', getCapitalsJoined)

export default userRouter
