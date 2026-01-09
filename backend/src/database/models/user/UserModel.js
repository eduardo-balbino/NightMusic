import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const { Schema } = mongoose;

export const userSchema = new Schema({
    username: { type: String, required: true },
    email: {
        type: String, 
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid Email Address');
            }
        }
    },
    passwordHash: { 
        type: String, 
        required: true,
        minlength: 8
    },  
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
});

userSchema.pre('save', async function () {
    if (this.isModified('passwordHash')) {
        this.passwordHash = await bcrypt.hash(this.passwordHash, 8)
    }
})

userSchema.methods.generateAuthToken = async function () {
    // Gerando token JWT
    const user = this
    const token = jwt.sign ({_id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    return token
}

userSchema.methods.toJSON = function () {
    const userObject = this.toObject()

    delete userObject.passwordHash
    delete userObject.tokens
    delete userObject.__v

    return userObject
}

userSchema.statics.findByCredentials = async function (email, password) {
    const user = await this.findOne({ email })

    if (!user) {
        throw new Error('Invalid login credentials')
    }

    const isPasswordMatch = await bcrypt.compare(password, user.passwordHash)

    if (!isPasswordMatch) {
        throw new Error('Invalid login credentials')
    }

    return user
}


const UserModel = mongoose.model('User', userSchema) 
export default UserModel;