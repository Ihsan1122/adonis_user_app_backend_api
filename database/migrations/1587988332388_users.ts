import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('username', 255).notNullable().unique()
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).notNullable()
      table.string('role').defaultTo('user')
      table.boolean('can_edit_entries').defaultTo(true)
      table.boolean('can_delete_entries').defaultTo(true)
      table.boolean('can_view_all_entries').defaultTo(false)
      table.boolean('can_view_entries').defaultTo(true)

      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
