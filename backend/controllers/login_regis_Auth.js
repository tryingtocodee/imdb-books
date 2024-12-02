import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import z from 'zod'
import User from '../model/db.js'

const userSchema = z.object({
    username: z.string().min(3, 'username should have minimum 3 character'),
    password: z.string().min(8, 'password should have atleast 8 characters'),
    email: z.string().email('invalid email format'),
    city: z.string().min(2, 'city should atleast have 2 characters'),
    date_of_birth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date of birth must be in YYYY-MM-DD format'),
})

const regisAuth = async (req, res) => {


    const { username, password, email, city, date_of_birth } = userSchema.parse(req.body)
    try {
        const userExist = await User.findOne({ email })

        if (userExist) {
            return res.json({ msg: 'user with this email already exists ' })
        }

        const token = jwt.sign({ username:userExist.username, email } , process.env.JWT_KEY , {expiresIn : "1h"})

        const hashedPassword = bcrypt.hash(password, 10)

        const newuser = new User.create({ username, password: hashedPassword, email, city, date_of_birth })
        await newuser.save()

        return res.json({ msg: 'user registerd successfully', newuser, token })

    } catch (err) {
        return res.json({ msg: `error in regisAuth`, error: err.message })
    }
}


const loginAuth = async (req, res) => {
    const { username, password, email, city, date_of_birth } = userSchema.parse(req.body)
    try {
        const userExist = await findOne({ email })

        if (!userExist) {
            return res.json({ msg: 'email doesnt exist ' })

        }

        const token = jwt.sign({ username } , process.env.JWT_KEY , {expiresIn : '1h'})

        const verifyPassword = bcrypt.compare(password, userExist.password)

        if (!verifyPassword) {
            return res.json({ msg: "password is incorrect" })
        }

        return res.json({ msg: "user logged in successfully", token })


    } catch (err) {
        return res.json({ mmsg: 'error during login auth', error: err.message })
    }
}

export { regisAuth, loginAuth }