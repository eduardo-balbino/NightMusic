import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const { Schema } = mongoose;

export const userSchema = new Schema({
    _id: { 
        type: Number, 
        required: true,
        unique: true 
    },
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
        minLength: 8
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function (next) {
    // Transformando a senha em Hashed antes de salvar o Usuário
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.passwordHash, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function () {
    // Gerando token JWT
    const user = this
    const token = jwt.sign ({_id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, passwordHash) => {
    // Procurando pelo usuário via email
    const user = await UserSchema.findOne({email})
    if (!user) {
        throw new Error({error: 'Invalid Login Credentials'})
    }
    const isPasswordMatch = await bcrypt.compare(passwordHash, user.passwordHash)
    if (!isPasswordMatch) {
        throw new Error({error: 'Invalid Login Credentials'})
    }
    return user
}

const User = mongoose.model('User', userSchema) 
module.exports = User