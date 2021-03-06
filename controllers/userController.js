const model = require('../models')
const jwt = require('jsonwebtoken')
const userController = {}

userController.create = async (req,res) => {
    console.log(req.body)
    try {
        let user = await model.users.create({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            picture: "https://i.imgur.com/UTFIOfp.jpg",
            elo: 500
            

            
        })
        const encryptedId = jwt.sign({userId: user.id}, process.env.JWT_SECRET)
        console.log(encryptedId, "-------------------------")
        res.json({
            message:"done",
            user: user,
            userId: encryptedId,
        })
    } catch (error) {
        console.log(error)
        res.json({
            error
        })
    }
}
userController.edit = async (req,res) => {
    console.log(req.body)
    try {
        let user = await model.users.findOne({
            where: {
               username: req.body.username,
            }
        })
        console.log(user.elo)
        let update = await user.update({
            elo: user.elo + req.body.elo
        })
        res.json({
            message:"done",
        })
    } catch (error) {
        console.log(error)
        res.json({
            error
        })
    }
}

userController.login = async (req,res) => {
    console.log(req.body)
    try {
        let user = await model.users.findOne({
            where: {
                email: req.body.email 
            }
        })
        const encryptedId = jwt.sign({userId: user.id}, process.env.JWT_SECRET)

        if(user.password === req.body.password) {
            res.json({
                user,
                encryptedId
        })
        } else {
            res.status(401)
            res.json({error: 'login failed'})
        }

    } catch (error) {
        res.status(400),
        res.json({ error: 'login failed'})  
    }
}

userController.getInfo = async (req, res) => {
    console.log(req.headers)
    try{
        
        const encryptedId = req.headers.authorization
        const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)
        console.log(decryptedId)
        const user = await model.users.findOne({
            where: {
                id: decryptedId.userId
            }
        })
       
        res.json({
            user: user
        })    
    }
    catch (error) {
        console.log(error)
        res.json({
            error
        })
    }
}

userController.getElo = async (req, res) => {
    console.log(req.headers)
    try{
        
        const users = await model.users.findAll()
       
        res.json({
            user: users
        })    
    }
    catch (error) {
        console.log(error)
        res.json({
            error
        })
    }
}


userController.authCheck = async (req,res) => {
    
    try {
        const encryptedId = req.headers.authorization
        const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)
        const user = await model.users.findOne({
        where: {
            id: decryptedId.userId
        }
    })
    res.json({user: user.id})
    } catch (error) {
        res.json({message: 'not verified'})
    }
}

module.exports = userController

