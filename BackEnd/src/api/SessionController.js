import express from 'express'
import User from '../models/userModel.js'
import pkg from "bcryptjs"

const { hashSync, compareSync } = pkg

const router = express.Router()

router.post('/signup', async (req, res, next) => {

    const {firstName, lastName, password, email, role} = req.body
    
    try {
        
        const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            password: password,
            email: email,
            role: role
        })

        const sessionToken = {user_id: newUser._id, userName: newUser.firstName + " " + newUser.lastName}
        await newUser.save()

        req.session.user = sessionToken

        res.status(200).json(sessionToken)

    } catch (error) {

    }
})

export default router