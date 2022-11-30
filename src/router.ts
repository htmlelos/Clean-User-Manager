import { Router } from 'express'
import {
  createUserController,
  validateUserData,
} from './domain/user/user.controller'

const router = Router()

router.post('/register', validateUserData, createUserController)

export default router
