import request from 'supertest'
import app from '../src/app'

// jest.mock()

describe('POST /register', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })
  it('returns status code 201 if user is signed up', async () => {
    // Dado
    const user = {
      username: 'username@mail.com',
      password: 'Pass2022$',
      confirmPassword: 'Pass2022$',
    }
    // Cuando
    const response = await request(app).post('/register').send(user)
    // Entonces
    expect(response.statusCode).toBe(201)
  })

  it('returns status code 400 if username is missing', async () => {
    // Dado
    const user = {
      password: 'Pass2022$',
      confirmPassword: 'Pass2022$',
    }
    // Cuando
    const response = await request(app).post('/register').send(user)
    // Entonces
    expect(response.statusCode).toBe(400)
  })

  it('returns status code 400 if password is missing', async () => {
    // Dado
    const user = {
      username: 'username@mail.com',
      confirmPassword: 'Pass2022$',
    }
    // Cuando
    const response = await request(app).post('/register').send(user)
    // Entonces
    expect(response.statusCode).toBe(400)
  })

  it('return status code 400 if confirmPassword is missing', async () => {
    // Dado
    const user = {
      username: 'username@mail.com',
      password: 'Pass2022$',
    }
    // Cuando
    const response = await request(app).post('/register').send(user)
    // Entonces
    expect(response.statusCode).toBe(400)
  })

  it('return status code 400 if username is not a valid email address', async () => {
    // Dado
    const user = {
      username: 'username',
      password: 'Pass2022$',
      confirmPassword: 'Pass2022$',
    }
    // Cuando
    const response = await request(app).post('/register').send(user)
    // Entonces
    expect(response.statusCode).toBe(400)
  })

  it.skip('return status code 403 if username is already registered', async () => {
    // Dado
    const user = {
      username: 'username@mail.com',
      password: 'Pass2022$',
      confirmPassword: 'Pass2022$',
    }
    // Cuando
    const response = await request(app).post('/register').send(user)
    // Entonces
    expect(response.statusCode).toBe(403)
  })
})
