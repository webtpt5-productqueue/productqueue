const bcrypt = require('bcryptjs')

exports.seed = function(knex) {
  return knex('users').insert([
    {
      first_name: 'Brian',
      last_name: 'Doyle',
      org_id: 1,
      email: 'brian@lambdaschool.com',
      password: bcrypt.hashSync('Lambda1', 8),
      role: 'admin'
    },
    {
      first_name: 'Joshua',
      last_name: 'Howland',
      org_id: 1,
      email: 'jhowland@lambdaschool.com',
      password: bcrypt.hashSync('Lambda1', 8),
      role: 'admin'
    }
  ])
}
