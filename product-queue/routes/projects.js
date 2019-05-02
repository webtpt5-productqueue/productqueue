
const router = require('express').Router()

const Projects = require('../models/projects.js')
const Users = require('../models/users.js')
const Comments = require('../models/comments.js')
const Links = require('../models/links.js')

router.get('/', async (req, res) => {
  if (req.user_id.toString() === req.params.id || req.admin) {
    try {
      const projects = await Projects.getAll()
      await projects.sort((a, b) => b.created_at - a.created_at)
      res.status(200).json(projects)
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: 'Server error retrieving projects' })
    }
  } else {
    return res.status(401).json({ message: 'Unauthorized' })
  }
})

router.get('/:id', async (req, res) => {
  if (req.user_id.toString() === req.params.id || req.admin) {
    try {
      const projects = await Projects.getAllByUserId(req.params.id)
      await projects.sort((a, b) => b.created_at - a.created_at)
      res.status(200).json(projects)
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: 'Server error retrieving projects' })
    }
  } else {
    return res.status(401).json({ message: 'Unauthorized' })
  }
})

router.get('/:id/:projectId', async (req, res) => {
  if (req.user_id.toString() === req.params.id || req.admin) {
    try {
      const project = await Projects.getByProjectId(req.params.projectId)
      const user = await Users.getUserById(req.params.id)
      const links = await Links.getLinksByProject(project.id).map(
        async link => {
          const linkUser = await Users.getUserById(link.user_id)
          delete link.user_id
          delete link.project_id
          delete linkUser.password
          return {
            ...link,
            user: linkUser
          }
        }
      )
      const comments = await Comments.getCommentsByProject(project.id).map(
        async comment => {
          const commentUser = await Users.getUserById(comment.user_id)
          delete comment.user_id
          delete comment.project_id
          delete commentUser.password
          return {
            ...comment,
            user: commentUser
          }
        }
      )

      delete user.password

      const returning = {
        ...project,
        user: user,
        links: links,
        comments: comments
      }
      res.status(200).json(returning)
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: 'Server error retrieving project' })
    }
  } else {
    return res.status(401).json({ message: 'Unauthorized' })
  }
})

router.post('/:id', async (req, res) => {
  if (!req.body.name || !req.body.description) {
    res
      .status(406)
      .json({ message: 'Project name and description are required' })
    return
  }
  try {
    const project = {
      user_id: req.params.id,
      name: req.body.name,
      description: req.body.description,
      attachment: req.body.attachment,
      status: 'Pending'
    }
    const newProject = await Projects.newProject(project)
    if (req.body.links) {
      req.body.links.forEach(async link => {
        const newLink = {
          user_id: req.params.id,
          project_id: newProject.id,
          link_type: link.link_type,
          link_href: link.link_href
        }
        await Links.addLink(newLink)
      })
    }
    res.status(201).json(newProject.id)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Server error creating new project' })
  }
})

router.delete('/:id/:projectId', async (req, res) => {
  if (req.user_id.toString() === req.params.id || req.admin) {
    try {
      const links = await Links.getLinksByProject(req.params.projectId)
      if (links.length) {
        links.forEach(async link => await Links.removeLink(link.id))
      }
      const comments = await Comments.getCommentsByProject(req.params.projectId)
      if (comments.length) {
        comments.forEach(
          async comment => await Comments.removeComment(comment.id)
        )
      }
      const count = await Projects.removeProject(req.params.projectId)
      if (count > 0) {
        res.status(200).json({ message: 'Project has been deleted' })
      } else {
        res.status(404).json({ message: 'Project not found' })
      }
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: 'Server error deleting the project' })
    }
  } else {
    return res.status(401).json({ message: 'Unauthorized' })
  }
})

router.put('/:id/:projectId', async (req, res) => {
  if (req.user_id.toString() === req.params.id || req.admin) {
    try {
      const newProject = { ...req.body }
      const project = await Projects.updateProject(
        req.params.projectId,
        newProject
      )
      res.status(200).json(project)
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: 'Server error updating the project' })
    }
  } else {
    return res.status(401).json({ message: 'Unauthorized' })
  }
})

router.post('/:projectId/comments', async (req, res) => {
  try {
    const newComment = {
      user_id: req.body.user_id,
      project_id: req.params.projectId,
      comment: req.body.comment
    }
    const comment = await Comments.addComment(newComment)
    res.status(201).json(comment)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Server error while posting new comment' })
  }
})

router.post('/:projectId/links', async (req, res) => {
  try {
    const newLink = {
      user_id: req.user_id,
      project_id: req.params.projectId,
      link_type: req.body.link_type,
      link_href: req.body.link_href
    }
    await Links.addLink(newLink)
    const links = await Links.getLinksByProject(req.params.projectId)
    res.status(201).json(links)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Server error while adding new link' })
  }
})

module.exports = router
