import User from 'App/Models/User'

export default class AdminManagementService {
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

    await user.save()
  }
}
