const mongoose = require('mongoose');
const validator = require('email-validator');
const bcrypt = require('bcrypt');

const db_link = "**************************************";

main().catch(err => console.log(err));

async function main() {
    console.log("db connected");
    await mongoose.connect(db_link);
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: function () {
            return validator.validate(this.email);
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    confirmPassword: {
        type: String,
        required: true,
        minlength: 8,
        validate: function () {
            return this.confirmPassword == this.password;
        }
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'restaurant owner', 'delivery boy'],
        default: 'user'
    },
    profileImage: {
        type: String,
        default: 'img/profile.png'
    }
})

userSchema.pre('save', function () {
    this.confirmPassword = undefined;
})

// userSchema.pre('save', async function(){
//     let salt = await bcrypt.genSalt();
//     let hashedValue = await bcrypt.hash(this.password, salt);
//     console.log("hash value:-- ", hashedValue);
//     this.password = hashedValue;
// })

//Pre & Post hooks
// userSchema.pre('save', function(){
//     console.log("before saving in db", this);
// })

// userSchema.post('save', function(doc){
//     console.log("after saving in db", doc);
// })

const userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;
