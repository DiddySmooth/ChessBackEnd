const express = require('express')

const userRouter = express.Router()

const userController = require('../controllers/userController')

userRouter.post('/create', userController.create)
userRouter.post('/login', userController.login)
userRouter.get('/getinfo', userController.getInfo)
userRouter.get('/authcheck', userController.authCheck)
userRouter.put('/elo', userController.edit)


module.exports = userRouter