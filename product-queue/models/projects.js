const db = require('../data/dbConfig.js')

const getAll = () => {
  return db('projects')
    .join('users', 'projects.user_id', 'users.id')
    .join('organizations', 'organizations.id', 'users.org_id')
    .select(
      'projects.id',
      'projects.name',
      'projects.status',
      'projects.created_at',
      'projects.updated_at',
      'projects.description',
      'users.id as user_id',
      'users.first_name',
      'users.last_name',
      'users.email',
      'organizations.name as company'
    )
}

const getAllByUserId = id => {
  return db('projects')
    .join('users', 'projects.user_id', 'users.id')
    .join('organizations', 'organizations.id', 'users.org_id')
    .where('users.id', id)
    .select(
      'projects.id as project_id',
      'projects.name',
      'projects.status',
      'projects.created_at',
      'projects.updated_at',
      'projects.description',
      'users.id as user_id',
      'users.first_name',
      'users.last_name',
      'users.email',
      'organizations.name as company'
    )
}

const getByProjectId = id => {
  return db('projects')
    .where({ id })
    .first()
}

const newProject = async project => {
  const [id] = await db('projects')
    .insert(project)
    .returning('id')
  return getByProjectId(id)
}

const removeProject = id => {
  return db('projects')
    .where({ id })
    .del()
}

const updateProject = async (id, project) => {
  await db('projects')
    .where({ id })
    .update(project)
    .update('updated_at', db.fn.now())
  return db('projects')
    .where({ id })
    .first()
}

module.exports = {
  getAll,
  getAllByUserId,
  getByProjectId,
  newProject,
  removeProject,
  updateProject
}
