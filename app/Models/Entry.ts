import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Entry extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public name: string

  @column({ columnName: 'imageUrl' })
  public imageUrl: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
}
