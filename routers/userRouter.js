const express = require('express');
const { signup, login, isAuthorized, protectedRoute } = require('../controllers/authController')
const { getAllUsers, getUser, updateUser, deleteUser } = require('../controllers/userController')

const userRouter = express.Router();

//user specific functions
userRouter
    .route('/:id')
    .patch(updateUser)
    .delete(deleteUser)

userRouter
    .route('/signup')
    .post(signup)

userRouter
    .route('/login')
    .post(login)

//forget password
userRouter
    .route('/forgetpassword')
// .post(forgetPassword)

//reset password
userRouter
    .route('./resetpassword/:token')
// .post(resetPassword)

//profile 
userRouter.use(protectedRoute)
userRouter
    .route('/profile')
    .get(getUser)


//admin specific functions
userRouter.use(isAuthorized(['admin']))
userRouter
    .route('/')
    .get(getAllUsers)

module.exports = userRouter;