"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const user_model_1 = require("./models/user.model");
const crypto_1 = require("crypto");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: 'http://localhost:4200', methods: ["GET", "POST", "PUT", "DELETE"], }));
app.use(express_1.default.json());
app.on('error', (err) => {
    console.log('error', err);
});
// @ts-ignore
mongoose_1.default.connect(process.env.MONGO_DB_URL)
    .then(r => {
    console.log('Connected with local MongoDB 👍');
    user_model_1.User.findOne({ email: process.env.ADMIN_EMAIL }).then((r) => {
        if (!r) {
            const hashedPassword = (0, crypto_1.createHash)('sha256')
                .update(process.env.ADMIN_PWD || 'admin')
                .digest('hex');
            new user_model_1.User({ email: process.env.ADMIN_EMAIL, password: hashedPassword, user_type: 0 })
                .save()
                .then((r) => {
                console.log(`Created default SUPER ADMIN ${process.env.ADMIN_EMAIL}`);
            });
        }
    });
})
    .catch((err) => console.log(err));
app.use('/api/user/', require('./routes/user.route'));
app.use('/api/quiz/', require('./routes/quiz.routes'));
app.use('/api/result/', require('./routes/result.route'));
app.listen(process.env.PORT, () => {
    console.log(`⚡ QuizMaster REST API Server Started at ${process.env.PORT}`);
});
