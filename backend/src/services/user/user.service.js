class UserService {
    constructor(User) {
        this.User = User;
    }

    async register({ username, email, password }) {
        const user = new this.User({ username, email, passwordHash: password })
        await user.save()

        const token = await user.generateAuthToken()
        await user.save()

        return { user: user.toJSON(), token }
    }
}

export default new UserService()