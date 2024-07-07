import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public async register() {
    // Register your own bindings
    await this.setupDependancyInjectionBindings()
  }

  private async setupDependancyInjectionBindings() {
    const { AdminController } = await import('App/Controllers/Http/AdminController')
    const { UserManagementService } = await import('App/Services/UserManagementService')
    const { EntryService } = await import('App/Services/EntryService')
    const { EntriesController } = await import('App/Controllers/Http/EntriesController')


    this.app.container.singleton('App/Services/EntryService', () => new EntryService())

    this.app.container.singleton('App/Services/UserManagementService', () => new UserManagementService())

    this.app.container.singleton('App/Controllers/Http/AdminController', () => {
      const userManagementService = this.app.container.use('App/Services/UserManagementService')
      return new AdminController(userManagementService)
    })

    this.app.container.singleton('App/Controllers/Http/EntriesController', () => {
      const EntryService = this.app.container.use('App/Services/EntryService')
      return new EntriesController(EntryService)
    })
  }

  

  public async boot() {
    // IoC container is ready
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
