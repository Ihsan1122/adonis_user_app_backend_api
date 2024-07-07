import { inject } from '@adonisjs/fold'
import User from 'App/Models/User'
import Entry from 'App/Models/Entry'
import { DateTime } from 'luxon';


@inject()
export  class UserManagementService {
  public async getUsers(): Promise<User[]> {
    return await User.all()
  }

  public async updateUserPermissions(userId: number, permissions: any): Promise<void> {
    const user = await User.findOrFail(userId)

    if (permissions.canEditEntries !== undefined) {
      user.canEditEntries = permissions.canEditEntries
    }

    if (permissions.canDeleteEntries !== undefined) {
      user.canDeleteEntries = permissions.canDeleteEntries
    }

    if (permissions.canViewAllEntries !== undefined) {
      user.canViewAllEntries = permissions.canViewAllEntries
    }

    if (permissions.canViewEntries !== undefined) {
      user.canViewEntries = permissions.canViewEntries
    }

    await user.save()
  }

  public async createEntry(userId: number, name: string, imageUrl: string) {
    const entry = new Entry()
    entry.userId = userId
    entry.name = name
    entry.imageUrl = imageUrl
    entry.createdAt = DateTime.now()
    await entry.save()
    return entry
  }

  public async getEntriesByUser(userId: number) {
    return await Entry.query().where('user_id', userId).orderBy('created_at', 'desc')
  }

  public async updateEntry(userId: number, entryId: number, data: { name: string, imageUrl: string }) {
    const entry = await Entry.query().where('id', entryId).andWhere('user_id', userId).firstOrFail()
    entry.merge(data)
    await entry.save()
    return entry
  }

  public async deleteEntry(userId: number, entryId: number) {
    const entry = await Entry.query().where('id', entryId).andWhere('user_id', userId).firstOrFail()
    await entry.delete()
    return { message: 'Entry deleted successfully' }
  }
}
