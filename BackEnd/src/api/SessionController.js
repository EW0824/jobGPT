import express from 'express'
import User from '../models/userModel.js'
import session from 'express-session'

const router = express.Router()

function getCurrentFormattedDateTime() {
    const now = new Date();

    // Format date and time separately
    const formattedDate = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    const formattedTime = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false // Change to true if you prefer 12-hour format
    });

    // Combine date and time
    return `${formattedDate} ${formattedTime}`;
}

const sessionize_user = (user) => ({userId: user._id, username: user.firstName + " " + user.lastName, createdAt: getCurrentFormattedDateTime()})

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

        await newUser.save()

        const session_user = sessionize_user(newUser)
        req.session.user = session_user
        res.status(200).json(session_user)

    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

router.post("/login", async(req, res, next) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({ email })
    
        if(!user){
            throw Error("Incorrect email")
        }
        if(!user.comparePasswords(password)){
            throw Error("Incorrect password")
        }

        const session_user = sessionize_user(user)
        req.session.user = session_user
        res.setHeader('Allow-Control-Allow-Credentials', "true");
        res.status(200).json(session_user)

    } catch(error) {
        res.status(400).send({message: error.message})
    }
})

router.delete("/logout", async({session}, res, next) => {

    try {
        const user = {...session.user}

        console.log("user", user)

        if(user?.userId != undefined) {
            session.destroy((err) => {
                if(err){
                    throw Error("Unkown error happened during logout")
                }
                res.clearCookie(process.env.SESSION_NAME)
                res.status(200).json(user)
            })
        } else {
            throw Error("Unkown error happened during logout")
        }
    } catch(error){
        console.log(error)
        res.status(400).send({message: error.message})
    }
})

router.get("/get_session", async({session}, res, next) => {
    try {
        const userId = session.user.userId
        res.status(200).json({userId: userId})
    } catch(err){
        res.status(200).json({ userId: null })
    }
})

export default router