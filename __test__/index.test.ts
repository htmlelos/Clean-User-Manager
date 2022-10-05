import request from 'supertest'
import app from '../src/app'


describe('POST /register', () => {
  it('returns status code 201 if user is signed up', async () => {
    const user = {
      username: 'username@mail.com',
      password: 'Pass2022$',
      confirmPassword: "Pass2022$",      
    }

    const response = await request(app).post('/register').send(user)

    expect(response.statusCode).toBe(201)
  })

  it('returns status code 400 if username is missing',async () => {
    const user = {
      password: 'Pass2022$',
      confirmPassword: 'Pass2022$'
    }

    const response = await request(app).post('/register').send(user)

    expect(response.statusCode).toBe(400)
  })

  it('returns status code 400 if password is missing', async () => {
    const user = {
      username: 'username@mail.com',
      confirmPassword: 'Pass2022$'
    }

    const response = await request(app).post('/register').send(user)

    expect(response.statusCode).toBe(400)
  })

  it('return status code 400 if confirmPassword is missing', async () => {
    const user = {
      username: 'username@mail.com',
      password: 'Pass2022$'
    }

    const response = await request(app).post('/register').send(user)

    expect(response.statusCode).toBe(400)
  })
})