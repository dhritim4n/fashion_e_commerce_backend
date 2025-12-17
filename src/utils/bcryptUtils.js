import bcrypt from 'bcrypt';

const saltRounds = 10

const hashPassword = async (password) => {

    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = bcrypt.hash(password, salt)
        return hashedPassword
    } catch (error) {
        console.error(error)
    }


}

const comparePassword = async (password, hash) => {
    const isValid = await bcrypt.compare(password, hash)
    return isValid
}

export {
    hashPassword,
    comparePassword
}
