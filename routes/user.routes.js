const express = require('express')
const router = express.Router()
const User = require('../models/user.model')

//getAll
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
//GetOne
router.get('/:id', getUser, (req, res) => {
    res.send(res.user.username)
})
//CreateOne
router.post('/', async (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})
//updateOne
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
//DeleteOne
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
        // if (user === undefined) {
        //     return res.status(404).json({ message: "Cannot find user" })
        // } else {
        return res.status(500).json({ message: error.message })
        //}
    }
    res.user = user;
    console.log(user)
    next();
}

module.exports = router