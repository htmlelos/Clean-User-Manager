import express, { Application } from 'express'
import router from './router'
import { routeNotFound } from '../src/shared/middlewares/error.middleware'

const app: Application = express()

app.use(express.json())
app.use('/', router)
app.use(routeNotFound)

export default app
