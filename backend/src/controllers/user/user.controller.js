import userService from '../../services/user/user.service.js';

export async function register(req, res) {
    try {
        const { username, email, password } = req.body
        const result = await userService.register({ username, email, password })
        return res.status(201).json(result)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}
