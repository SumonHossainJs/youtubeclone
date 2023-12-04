import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/user.route.js';
import videoRoute from './routes/video.route.js';
import authRoute from './routes/auth.route.js';
import commentRoute from './routes/commnet.route.js';
// import commentRoute from './routes/commnet.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';



const app = express();
dotenv.config();
const PORT = 5030;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));



//   middlewares 

app.use(express.json());
app.use(cookieParser());

// route handlders 

app.use(authRoute);
app.use("/user",userRoute);
app.use("/video",videoRoute );
app.use("/comment",commentRoute);


// Error handler


app.use((err, req, res, next)=>{
    const status = err.status || 500;
    const message = err.message || "Something went wrong";

    return res.status(status).json({
        success: false, 
        status, 
        message,
    })
})

const connect = () =>{
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.MONGO).then(()=>{
        console.log("Connected to db");
    }).catch((err)=>{
        throw err;
    })
}


app.listen(PORT, () =>{

    connect();
    console.log(`Server is up and Running on PORT :http://localhost:${PORT}`);
})