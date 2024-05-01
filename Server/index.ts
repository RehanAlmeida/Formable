import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors'
import {User} from "./models/user.model";
import {createHash} from "crypto";

dotenv.config();

const app = express();

app.use(cors({origin: 'http://localhost:4200', methods: ["GET", "POST", "PUT", "DELETE"],}))

app.use(express.json());

app.on('error', (err) => {
    console.log('error', err);
})

// @ts-ignore
mongoose.connect(process.env.MONGO_DB_URL)
    .then(r => {
        console.log('Connected with local MongoDB 👍')
        User.findOne({email: process.env.ADMIN_EMAIL}).then((r) => {
            if (!r) {
                const hashedPassword = createHash('sha256')
                    .update(process.env.ADMIN_PWD || 'admin')
                    .digest('hex');
                new User({email: process.env.ADMIN_EMAIL, password: hashedPassword, user_type: 0})
                    .save()
                    .then((r) => {
                        console.log(`Created default SUPER ADMIN ${process.env.ADMIN_EMAIL}`)
                    })
            }
        })
    })
    .catch((err) => console.log(err))

app.use('/api/user/', require('./routes/user.route'))
app.use('/api/quiz/', require('./routes/quiz.routes'))
app.use('/api/result/', require('./routes/result.route'))

app.listen(process.env.PORT, () => {
    console.log(`⚡ QuizMaster REST API Server Started at ${process.env.PORT}`)
})
