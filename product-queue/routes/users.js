const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const authenticate = require('../config/authenticate.js')

const Users = require('../models/users.js')

router.post('/register', async (req, res) => {
  if (
    !req.body.first_name ||
    !req.body.last_name ||
    !req.body.company ||
    !req.body.email ||
    !req.body.password
  ) {
    res.status(406).json({
      message:
        'First name, last name, company, email, and password are required fields'
    })
    return
  }
  try {
    const [org] = await Users.newOrg({ name: req.body.company })
    req.body.password = bcrypt.hashSync(req.body.password, 8)
    const newUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      org_id: org,
      email: req.body.email,
      password: req.body.password,
      role: req.body.user || 'user'
    }
    const user = await Users.newUser(newUser)
    const token = generateToken(user)
    res.status(201).json({
      id: user.id,
      token: token,
      first_name: user.first_name,
      last_name: user.last_name,
      company: req.body.company,
      email: user.email,
      role: user.role
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Server error creating new user' })
  }
})

router.post('/login', async (req, res) => {
  let { email, password } = req.body
  try {
    const user = await Users.getUser(email)
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user)
      res.status(200).json({
        token,
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        company: user.company,
        email: user.email,
        role: user.role
      })
    } else {
      res.status(401).json({ message: 'Invalid credentials' })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Server error while logging in' })
  }
})

router.put('/:id', authenticate, async (req, res) => {
  if (req.user_id.toString() === req.params.id || req.admin) {
    try {
      if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, 8)
      }
      const [org] = await Users.newOrg({ name: req.body.company })
      delete req.body.company
      const user = await Users.updateUser(req.params.id, {
        ...req.body,
        org_id: org
      })
      if (user) {
        delete user.password
        const company = await Users.getCompanyName(org)
        res.status(200).json({ ...user, company: company.name })
      } else {
        res.status(404).json({ message: 'User not found' })
      }
    } catch (err) {
      console.log(err)
      res
        .status(500)
        .json({ message: 'Server error updating user information' })
    }
  } else {
    return res.status(401).json({ message: 'Unauthorized' })
  }
})

router.get('/:id', authenticate, async (req, res) => {
  if (req.user_id.toString() === req.params.id || req.admin) {
    try {
      const user = await Users.getUserById(req.params.id)
      if (user) {
        delete user.password
        res.status(200).json(user)
      } else {
        res.status(404).json({ message: 'No user with that id found' })
      }
    } catch {
      console.log(err)
      res
        .status(500)
        .json({ message: 'Server error retrieving user information' })
    }
  } else {
    return res.status(401).json({ message: 'Unauthorized' })
  }
})

function generateToken(user) {
  const payload = {
    subject: user.id,
    email: user.email,
    role: user.role
  }

  const secret = process.env.JWT_SECRET || 'Secrets'

  const options = {
    expiresIn: '7d'
  }

  return jwt.sign(payload, secret, options)
}

module.exports = router
