import { NextFunction, Request, Response, Router } from "express"

const router = Router()

router.post('/register', (request: Request, response: Response, next: NextFunction) => {
  const {username, password, confirmPassword} = request.body

  if (!username) {
    response.status(400).send({message: 'The username is required'})
  }
  if (!password) {
    response.status(400).send({message: 'The password is required'})
  }
  if (!confirmPassword) {
    response.status(400).send({message: 'The password confirmation is confirmed'})
  }
  response.status(201).send({message: 'User Registered successfully'})
})

export default router