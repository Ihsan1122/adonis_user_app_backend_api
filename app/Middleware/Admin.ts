import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Admin {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    const user = auth.user

    if (user?.role !== 'admin') {
      return response.unauthorized('You are not authorized to access this resource')
    }

    await next()
  }
}
