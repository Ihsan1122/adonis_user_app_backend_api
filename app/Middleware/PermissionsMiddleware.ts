import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PermissionsMiddleware {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>, properties: string[]) {
    const user = auth.user!

    for (const property of properties) {
      if (!user[property]) {
        return response.unauthorized({ message: `You do not have permission to ${property}` })
      }
    }

    await next()
  }
}

