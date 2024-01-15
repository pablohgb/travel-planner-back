const Router = require("express");
const userRouter = Router();
const { getUsers, getOneUser, loginUser, registerUser, updateUser, deleteUser } = require("../controllers/user.controllers");
const { getUser, authenticateTokenParams } = require("../middleware/authMiddleware");

userRouter
    .get('/', getUsers)
    .get('/:token', authenticateTokenParams, getUser, getOneUser)
    .post('/login', loginUser)
    .post('/', registerUser)
    .patch('/update/:id', updateUser)
    .delete('/:id', getUser, deleteUser)

module.exports = userRouter;
