require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const bcrypt = require("bcrypt")
const saltRounds = 10


const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getOneUser = (req, res) => {
    res.send(res.user.username)
}

const loginUser = async (req, res) => {
    const email = req.body.email
    const user = await User.findOne({ email: email })
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            userData = { id: user._id, email: user.email }
            const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET)
            res.status(200).send(accessToken)
        } else {
            res.status(401).send("email or password incorrect")
        }
    } catch (error) {
        res.status(401).json({ message: error.message })
    }

}

const registerUser = async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }

    const hash = await bcrypt.hash(req.body.password, saltRounds)
    const user = new User({
        email: req.body.email,
        password: hash
    })
    try {
        const newUser = await user.save()
        userData = { id: user._id, email: user.email }
        const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET)
        res.status(200).json(accessToken)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const updateUser = async (req, res) => {
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
}

const deleteUser = async (req, res) => {
    try {
        await res.user.deleteOne()
        res.json({ message: "Deleted user" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}


module.exports = { getUsers, getOneUser, loginUser, registerUser, updateUser, deleteUser }