const db = require('../data/dbConfig.js')

const newOrg = async org => {
  const [company] = await db('organizations').where(org)
  if (company) {
    return [company.id]
  } else {
    return db('organizations')
      .returning('id')
      .insert(org)
  }
}

const newUser = async user => {
  const [id] = await db('users')
    .returning('id')
    .insert(user)
  return db('users')
    .where({ id })
    .first()
}

const getUser = email => {
  return db('users')
    .where({ email })
    .join('organizations', 'organizations.id', 'users.org_id')
    .select(
      'users.id',
      'organizations.name as company',
      'users.first_name',
      'users.last_name',
      'users.email',
      'users.role',
      'users.password'
    )
    .first()
}

const getUserById = id => {
  return db('users')
    .where('users.id', id)
    .join('organizations', 'organizations.id', 'users.org_id')
    .select(
      'users.id',
      'organizations.name as company',
      'users.first_name',
      'users.last_name',
      'users.email',
      'users.role',
      'users.password'
    )
    .first()
}

const updateUser = async (id, user) => {
  await db('users')
    .where({ id })
    .update(user)
    .update('updated_at', db.fn.now())
  return db('users')
    .where({ id })
    .first()
}

const getCompanyName = id => {
  return db('organizations')
    .where({ id })
    .first()
}

module.exports = {
  newOrg,
  newUser,
  getUser,
  getUserById,
  updateUser,
  getCompanyName
}
