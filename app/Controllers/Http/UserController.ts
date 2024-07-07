import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {UserManagementService} from '../../Services/UserManagementService'

export default class UserController {
  constructor(private userService: UserManagementService) {}

  public async index({ response }: HttpContextContract) {
    const users = await this.userService.getUsers()
    return response.json(users)
  }

  public async updatePermissions({ auth, request, response }: HttpContextContract) {
    const userId = auth.user!.id
    const permissions = request.only(['canEditOwnEntries', 'canDeleteOwnEntries']) // Adjust based on actual permissions
    await this.userService.updateUserPermissions(userId, permissions)
    return response.json({ message: 'User permissions updated successfully' })
  }
}
