import Entry from 'App/Models/Entry'
import { DateTime } from 'luxon';
import User from 'App/Models/User'

export class EntryService {
  public async createEntry(userId: number, name: string, imageUrl: string) {
    const entry = await Entry.create({ userId, name, imageUrl, createdAt: DateTime.now() })
    return entry
  }

  public async getEntriesByUser(userId: number, user: User) {
    if (user.canViewAllEntries) {
      return Entry.query().orderBy('created_at', 'desc')
    } else if(user.canViewEntries){
      return Entry.query().where('user_id', userId).orderBy('created_at', 'desc')
    }
  }

  public async updateEntry(id: number, data: { name: string, imageUrl?: string }) {
    const entry = await Entry.findOrFail(id)
    entry.merge(data)
    await entry.save()
    return entry
  }

  public async deleteEntry(id: number) {
    const entry = await Entry.findOrFail(id)
    await entry.delete()
    return { message: 'Entry deleted successfully' }
  }
}
