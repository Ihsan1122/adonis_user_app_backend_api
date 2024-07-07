import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {EntryService} from 'App/Services/EntryService'
import Application from '@ioc:Adonis/Core/Application'

export  class EntriesController {
  constructor(private entryService: EntryService) {}

  public async create({ request, auth, response }: HttpContextContract) {
    const user = auth.user!
    const name = request.input('name')

    const image = request.file('image', {
      size: '2mb',
      extnames: ['jpg', 'png', 'gif', 'jpeg']
    })

    if (!image) {
      return response.badRequest('Image file is required')
    }

    if (!image.isValid) {
      return response.badRequest(image.errors)
    }

    await image.move(Application.tmpPath('uploads'), {
      name: `${new Date().getTime()}.${image.extname}`,
      overwrite: true
    })

    const imageUrl = `uploads/${image.fileName}`
    const entry = await this.entryService.createEntry(user.id, name, imageUrl)
    
    return response.json(entry)
  }

  public async index({ auth }: HttpContextContract) {
    const user = auth.user!
    const entries = await this.entryService.getEntriesByUser(user.id, user)
    return entries
  }

  public async update({ request, params, response }: HttpContextContract) {
    const name = request.input('name')

    const image = request.file('image', {
      size: '2mb',
      extnames: ['jpg', 'png', 'gif', 'jpeg'], 
    })

    let imageUrl: string | undefined

    if (image) {
      if (!image.isValid) {
        return response.badRequest(image.errors)
      }

      await image.move(Application.tmpPath('uploads'), {
        name: `${new Date().getTime()}.${image.extname}`,
        overwrite: true
      })

      imageUrl = `uploads/${image.fileName}`
    }

    const entry = await this.entryService.updateEntry(params.id, { name, imageUrl })
    return response.json(entry)
  }

  public async delete({ params }: HttpContextContract) {
    const entry = await this.entryService.deleteEntry(params.id)
    return entry
  }
}
