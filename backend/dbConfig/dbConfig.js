import mongoose from 'mongoose'

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log(`db is connected at`, connect.connection.host, connect.connection.name)
    } catch (err) {
        console.log(`error connection db `, err.message)
    }
}

export default connectDb