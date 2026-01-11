import userServiceLogin from '../../services/user/userLogin.service.js';

export async function login(req, res) {
    try {
        const { email, password } = req.body
        const result = await userServiceLogin.login({ email, password })
        return res.status(201).json(result)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}
