import app from './app'
import mongoose from 'mongoose'

const databaseUrl = 'mongodb://localhost/usermanager'
mongoose.connect(databaseUrl)

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Servidor ejecutandose en http://localhost:${PORT}`)
})
