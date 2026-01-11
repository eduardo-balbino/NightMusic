import express from 'express';
import UserController from '../../controllers/user/user.controller.js';
import User from '../../database/models/user/UserModel.js';
import { register } from '../../controllers/user/user.controller.js';
import { login } from '../../controllers/user/userLogin.controller.js';

const router = express.Router()

// Endpoint de Registro
router.post('/', register)

// Endpoint de Login
router.post('/login', login)

export default router;