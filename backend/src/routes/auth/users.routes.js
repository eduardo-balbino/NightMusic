import express from 'express';
import User from '../../database/models/user/UserModel.js';

const router = express.Router()

// Endpoint de Registro
router.post('/', async (req, res) => {
    // Criando um Novo Usuário
    try {
        const { username, email, password } = req.body

        const user = new User({
            username,
            email,
            passwordHash: password
        })

        await user.save()

        const token = await user.generateAuthToken()
        await user.save()

         // 🔍 DEBUG
        console.log('RAW USER:', user)
        console.log('USER TO JSON:', user.toJSON())

        res.status(201).json({
            user: user.toJSON(),
            token
        })
    } catch(error) {
        console.error(error)
        res.status(400).send(error)
    }
})

// Endpoint de Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

export default router;