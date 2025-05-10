import mongoose from 'mongoose';
import 'dotenv/config';

export const dbConnect = () =>{
    mongoose.connect(process.env.DATABASE_URI)
    .then(() => console.log("DB is Connected Successfully..."))
    .catch((error) => {
        console.log("Issue in DB Connection...");
        console.log(error.message);
        process.exit(1);
    })
};
