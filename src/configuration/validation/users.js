export default {
    email: {
        maxLength: 255,
        isEmail(email) {
            return email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
        }
    },
    password: {
        minLength: 10,
        maxLength: 80,

        isValidPassword(password) {
            return password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/)
        }
    }
}