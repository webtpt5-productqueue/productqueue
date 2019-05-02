exports.seed = function(knex) {
  return knex('comments').insert([
    {
      user_id: 1,
      project_id: 1,
      comment: 'Example comment'
    }
  ])
}
