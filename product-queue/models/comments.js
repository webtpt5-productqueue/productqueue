const db = require('../data/dbConfig.js')

const getCommentsByProject = id => {
  return db('comments').where({ project_id: id })
}

const removeComment = id => {
  return db('comments')
    .where({ id })
    .del()
}

const addComment = async comment => {
  const [id] = await db('comments')
    .returning('id')
    .insert(comment)
  return db('comments')
    .where({ id })
    .first()
}

module.exports = { getCommentsByProject, removeComment, addComment }
