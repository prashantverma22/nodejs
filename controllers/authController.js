const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const SECRET_KEY = require('../config/secrets');

//user signup
async function signup(req, res) {
    try {
        let userData = req.body;
        let user = await userModel.create(userData);
        if (user) {
            return res.json({
                message: "User registration successful",
                data: userData
            })
        }
        else {
            res.json({
                message: "Error occured while sign up",
                data: userData
            })
        }
    }
    catch (err) {
        console.log(err);
        res.json({
            message: "Something went wrong"
        })
    }
}

//user login
async function login(req, res) {
    try {
        let data = req.body;
        if (data.email) {
            let user = await userModel.findOne({ email: data.email });
            if (user) {
                if (user.password == data.password) {
                    let uid = user['_id'];
                    let jwtToken = jwt.sign({ payload: uid }, SECRET_KEY);
                    res.cookie('login', jwtToken, { httpOnly: true })
                    res.json({
                        message: 'User login successfull',
                        userData: data
                    })
                }
                else {
                    res.json({
                        message: 'Wrong credentials'
                    })
                }
            }
            else {
                res.json({
                    message: 'User not found'
                })
            }
        }
        else {
            res.json({
                message: 'All fields are required'
            })
        }
    }
    catch (err) {
        console.log(err)
        return res.json({
            message: "Something went wrong"
        })
    }
}

//to check user's authorization before access
function isAuthorized(roles) {
    return function (req, res, next) {
        if (roles.includes(req.role)) {
            next();
        }
        else {
            return res.json({
                message: "Access not allowed"
            })
        }
    }
}

//to verify user access
async function protectedRoute(req, res, next) {
    try {
        if (req.cookies.login) {
            console.log(res.cookies);
            let token = req.cookies.login;
            let payload = jwt.verify(token, SECRET_KEY);
            if (payload) {
                const user = await userModel.findById(payload.payload);
                req.role = user.role;
                req.id = user.id;
                next();
            }
            else {
                return res.json({
                    message: "User not verified"
                })
            }
        }
        else {
            return res.json({
                message: "Please login"
            })
        }
    }
    catch (err) {
        console.log(err);
        return res.json({
            message: "Something went wrong"
        })
    }
}

//forget password
async function forgetPassword(req, res) {
    let { email } = req.body;
    try {
        const user = await userModel.findOne({ email: email })
        if (user) {
            // const resetToken = user.createResetToken();
            // let resetPasswordLink = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`
            //send email to the user through node mailer
        }
        else {
            res.json({
                message: "User not found"
            })
        }
    } catch (error) {
        console.log(error)
    }
}

//reset password
async function resetPassword(req, res) {
    const token = req.params.token;
    let { password, confirmPassword } = req.body;
    const user = await userModel.findOne({ resetToken: token })
    if (user) {

    }
    else {

    }
}

module.exports = {
    signup,
    login,
    isAuthorized,
    protectedRoute
}