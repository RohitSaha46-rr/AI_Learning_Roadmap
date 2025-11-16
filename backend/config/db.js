import mongoose from "mongoose";
export const mongodb=async()=>{
    try{
        const conn= await mongoose.connect(process.env.MONGO_DB);
        console.log(`Connected DB ${conn.connection.host}`)
    }
    catch(e){
        console.log(`Connection failed ${e.message}`);
        process.exit(1)
    }
}
