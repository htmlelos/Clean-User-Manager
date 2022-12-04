import { Router } from 'express'
import { createUserController } from './domain/user/user.controller'

const router = Router()

router.post('/register', createUserController)

export default router
