const userModel = require('../models/userModel');

//to fetch specific user's data
async function getUser(req, res) {
    try {
        let id = req.params.id;
        // console.log(id);
        let user = await userModel.findById(id);
        if (user) {
            return res.json(user);
        }
        else {
            return res.json({
                message: "User not found"
            })
        }
    }
    catch (err) {
        console.log(err);
    }
}

//to fetch all user's data
async function getAllUsers(req, res) {
    try {
        let users = await userModel.find();
        if (users) {
            return res.json({
                message: "All users",
                data: users
            });
        }
        else {
            return res.json({
                message: 'Unable to access all users'
            })
        }
    }
    catch (err) {
        console.log(err);
    }
}

//to update user's data
async function updateUser(req, res) {
    try {
        let id = req.params.id;
        let user = await userModel.findById(id);
        let dataToBeUpdated = req.body;
        if (user) {
            const keys = [];
            for (let key in keys) {
                keys.push(key);
            }

            for (let i = 0; i < keys.length; i++) {
                user[keys[i]] = dataToBeUpdated[keys[i]];
            }
            const updatedData = await user.save();
            return res.json({
                message: "User's data updated successfully",
                data: updatedData
            })
        }
        else {
            return res.json({
                message: "User not found"
            })
        }
    }
    catch (err) {
        console.log(err);
    }
}

//to delete user's data
async function deleteUser(req, res) {
    try {
        let id = req.params.id;
        let user = await userModel.findByIdAndDelete(id);
        if (!user) {
            return res.json({
                message: "User not found",
            })
        }
        else {
            return res.json({
                message: "User's data deleted successfully",
            })
        }
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    getUser,
    getAllUsers,
    updateUser,
    deleteUser
}