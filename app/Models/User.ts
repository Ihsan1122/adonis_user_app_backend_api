import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public role: string

  @column({ columnName: 'can_edit_entries' })
 public canEditEntries: boolean

  @column({ columnName: 'can_delete_entries' })
  public canDeleteEntries: boolean

  @column({ columnName: 'can_view_all_entries' })
  public canViewAllEntries: boolean

  @column({ columnName: 'can_view_entries' })
  public canViewEntries: boolean

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public createdAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}


