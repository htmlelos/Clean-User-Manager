import { Router } from 'express'
import { createUser, validateUserData } from './domain/user/user.controller'

const router = Router()

router.post('/register', validateUserData, createUser)

export default router
