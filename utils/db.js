import mongoose from "mongoose";
let isConnected = false;

export const connectToMongoDB = async () => {
    mongoose.set('strictQuery', true);
    if(isConnected){
        console.log("Database is already Connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MongoURI,{
            dbName: "getprompts",
            useNewUrlParser: true,
        })

        isConnected = true;

        console.log("Connected to Database Successfully");
    } catch (error) {
        console.log(error);
    }
}