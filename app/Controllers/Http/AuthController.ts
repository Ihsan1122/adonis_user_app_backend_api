import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    const { username, email, password } = request.only(['username', 'email', 'password'])
    const user = await User.create({ username, email, password })
    return response.json(user)
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const token = await auth.use('api').attempt(email, password)

      const user = auth.user!

      return response.json({
        token,
        user: {username: user.username,role: user.role,permissions:{canEditEntries: Boolean(user.canEditEntries),canDeleteEntries: Boolean(user.canDeleteEntries),canViewAllEntries: Boolean(user.canViewAllEntries),canViewEntries: Boolean(user.canViewEntries)}} 
      })
    } catch (error) {
      return response.status(401).json({ message: 'Invalid credentials' })
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('api').logout()
    return response.json({ message: 'Logout successful' })
  }
}
