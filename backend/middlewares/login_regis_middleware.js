
const login_regis_middleware = async (req, res , next) => {
    const authHeader = req.headers.authorization
    try {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.json({ msg: 'token missing' })
        }

        const token = authHeader.split(' ')[1]


        const decode = jwt.verify(token, process.env.JWT_KEY)
        if (!decode) {
            return res.json({ msg: 'incorrect token plz sign in again' })
        }
        req.user = decode
    } catch (err) {
        return res.json({ msg: "error in getting the token plz sign in again ", error: err.message })
    }
    next()
}

export default login_regis_middleware