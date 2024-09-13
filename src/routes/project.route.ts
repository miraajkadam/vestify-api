import { Router } from 'express'

import { addNewProject, deleteProject, getAllProjects } from '@/controllers/project.controller'

const projectRouter = Router()

projectRouter.post('/new', addNewProject)

projectRouter.post('/delete', deleteProject)

projectRouter.get('/getAll', getAllProjects)

export default projectRouter
