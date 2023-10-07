const express = require('express')
const router = express.Router()
const User = require('../models/user.model')
const bcrypt = require("bcrypt")
const saltRounds = 10

router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.get('/:id', getUser, (req, res) => {
    res.send(res.user.username)
})

router.post('/login', async (req, res) => {
    const email = req.body.email
    try {

        const user = await User.findOne({ email: email })
        console.log(user)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (bcrypt.compare(user.password, req.body.password)) {
            console.log("Hola")
            res.send(user)
        } else {
            console.log("funciona")
        }
    } catch (error) {
        res.status(401).json({ message: error.message })
    }

})
router.post('/', async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, saltRounds)
    const user = new User({
        email: req.body.email,
        password: hash
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await User.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.deleteOne()
        res.json({ message: "Deleted user" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})

async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.user = user;
    console.log(user)
    next();
}

module.exports = router