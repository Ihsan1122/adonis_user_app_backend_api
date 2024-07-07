import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {UserManagementService} from 'App/Services/UserManagementService'
import { inject } from '@adonisjs/fold'

@inject()
export class AdminController {
  constructor(private userManagementService: UserManagementService) {}

  public async listUsers({ response }: HttpContextContract) {
    const users = await this.userManagementService.getUsers()
    return response.json(users)
  }

  public async updatePermissions({ request, params, response }: HttpContextContract) {
    const permissions = request.only(['canEditEntries', 'canDeleteEntries', 'canViewAllEntries', 'canViewEntries'])
    await this.userManagementService.updateUserPermissions(params.id, permissions)
    return response.json({ message: 'Permissions updated successfully' })
  }
}
