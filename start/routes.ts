import Route from '@ioc:Adonis/Core/Route'

// Auth Routes
Route.post('/register', 'AuthController.register')
Route.post('/login', 'AuthController.login')
Route.post('/logout', 'AuthController.logout')


// Entry routes
Route.group(() => {
  Route.post('/entries', 'EntriesController.create').middleware(['auth', 'permissions:canEditEntries'])
  Route.get('/entries', 'EntriesController.index').middleware(['auth', 'permissions:canViewEntries'])
  Route.put('/entries/:id', 'EntriesController.update').middleware(['auth', 'permissions:canEditEntries'])
  Route.delete('/entries/:id', 'EntriesController.delete').middleware(['auth', 'permissions:canDeleteEntries'])

}).prefix('/api')

// Admin routes
Route.group(() => {
  Route.get('/users', 'AdminController.listUsers').middleware(['auth','admin']).as('register')
  Route.put('/users/:id/permissions', 'AdminController.updatePermissions').middleware(['auth','admin'])
}).prefix('/api/admin')
