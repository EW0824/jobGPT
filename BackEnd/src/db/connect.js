import mongoose from "mongoose"

let conn = null

export async function createMongooseConnection() {
    if(conn === null){
        console.log("Creating new mongoose connection")
        
        conn = mongoose.connect(process.env.MONGO_DB_CONNECTION_STR, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 15000
        }).then(() => mongoose)

        await conn;
    }

    console.log("Connected to MongoDB")
    return conn
}