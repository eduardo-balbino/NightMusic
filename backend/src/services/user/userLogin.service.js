class UserServiceLogin {
    constructor(User) {
        this.User = User;
    }

    async login({ email, password }) {
        const user = await User.findByCredentials(email, password)
        const token = await user.generateAuthToken()
        await user.save()

        return {
            user: user.toJSON(),
            token
        }
}
}

export default new UserServiceLogin()